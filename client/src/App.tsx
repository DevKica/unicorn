import { useEffect, useState } from "react";
import { getUserData, loginUser, logOut } from "./api/userInstance";
import { Routes, Route, Link } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

const App = () => {
  const [loginId, setLoginId] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);

  const logOutHandler = async () => {
    await logOut();
    window.location.reload();
  };

  const loginUserHandler = async (e: any) => {
    e.preventDefault();
    const res = await loginUser(loginId);
    if (res.status !== 200) return alert("Something went wrong, try to seed users to database");
    window.location.reload();
  };

  const setLoginIdHandler = (id: number) => {
    setLoginId(id);
  };

  useEffect(() => {
    (async () => {
      const res = await getUserData();
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
      } else {
        localStorage.removeItem("user");
      }
      setLoaded(true);
    })();

    return () => {};
  }, []);

  return (
    <CookiesProvider>
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
                  <Link to="/home">Home</Link>
                  <Link to="/conversations">Conversations</Link>
                </nav>
                <Routes>
                  <Route path="/home" element={<div>Home page</div>} />
                  <Route path="/conversations" element={<div>Conversations</div>} />
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
    </CookiesProvider>
  );
};

export default App;
