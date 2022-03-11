import { useEffect, useState } from "react";
import { getUserConversations, getUserData, loginUser, logOut } from "./api/mainInstance";
import { Routes, Route, Link } from "react-router-dom";
import ConversationsPage from "./ConversationsPage";

const App = () => {
  const [loginId, setLoginId] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const [conversations, setConversations] = useState<any>([]);

  const logOutHandler = async () => {
    await logOut();
    window.location.reload();
  };

  const loginUserHandler = async (e: any) => {
    e.preventDefault();
    const res = await loginUser(loginId);
    console.log(res.data);
    if (res.status !== 200) return alert("Something went wrong, try to seed users to database");
    window.location.reload();
  };

  const setLoginIdHandler = (id: number) => {
    setLoginId(id);
  };

  const getConversations = async () => {
    const res = await getUserConversations();
    setConversations(res.data);
  };

  useEffect(() => {
    (async () => {
      const res = await getUserData();
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        await getConversations();
      } else {
        localStorage.removeItem("user");
      }
      setLoaded(true);
    })();

    return () => {};
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
                {/* <Link to="/home">Home</Link> */}
                {/* <Link to="/">Conversations</Link> */}
              </nav>
              <Routes>
                {/* <Route path="/" element={<div>Home page</div>} /> */}
                <Route path="/" element={<ConversationsPage conversations={conversations} userId={user.id} />} />
              </Routes>
            </>
          ) : (
            <div>
              <form onSubmit={loginUserHandler}>
                <div>
                  <button onClick={() => setLoginIdHandler(0)}>Login to account 1</button>
                </div>
                <div>
                  <button onClick={() => setLoginIdHandler(1)}>Login to account 2</button>
                </div>
              </form>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default App;
