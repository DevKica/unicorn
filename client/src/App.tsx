import { createUser } from "./api/userInstance";

const App = () => {
  return (
    <div>
      <div>App</div>
      <button onClick={createUser}>create user</button>
    </div>
  );
};

export default App;
