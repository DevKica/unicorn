import { useEffect, useState } from "react";
import {
  getUserConversations,
  getUserData,
  getUsersToMatchHandler,
  loginUser,
  logOut,
  rewindLastLike,
} from "./api/mainInstance";
import { Routes, Route } from "react-router-dom";
import ConversationsPage from "./ConversationsPage";
import { updateConversationsStore, updateUserStore } from "./redux/actions";

const App = () => {
  const [user, setUser] = useState<any | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  const logOutHandler = async () => {
    await logOut();
    window.location.reload();
  };

  const getConversations = async () => {
    const res = await getUserConversations();
    updateConversationsStore(res.data);
  };

  const loginUserHandler = async (id: number) => {
    const res = await loginUser(id);
    if (res.status !== 200) return alert("Something went wrong, try to seed users to database");
    window.location.reload();
  };

  useEffect(() => {
    (async () => {
      const res = await getUserData();

      if (res.status === 200) {
        // get conversations
        await getConversations();

        //flag
        const usersToMatch = await getUsersToMatchHandler();
        console.log(usersToMatch.data);

        const lastLike = await rewindLastLike("user7");
        console.log(lastLike);

        // set user
        setUser(res.data);

        // set userId in store
        updateUserStore(res.data.id);
      }
      setLoaded(true);
    })();
  }, []);

  return (
    <div>
      <div>Unicorn</div>

      {loaded ? (
        <>
          {user ? (
            <>
              <div>
                You are logged in as {user.name} {user.surname}
                <button style={{ marginLeft: "10px" }} onClick={logOutHandler}>
                  log out
                </button>
              </div>
              <nav>
                <Routes>
                  <Route path="/" element={<ConversationsPage />} />
                </Routes>
              </nav>
            </>
          ) : (
            <>
              <div>
                <button onClick={() => loginUserHandler(0)}>Login to account 1</button>
              </div>
              <div>
                <button onClick={() => loginUserHandler(1)}>Login to account 2</button>
              </div>
              <div>
                <button onClick={() => loginUserHandler(2)}>Login to account 3</button>
              </div>
            </>
          )}
        </>
      ) : null}
    </div>
  );
};

export default App;
