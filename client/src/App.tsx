// @ts-nocheck

import { useState } from "react";
import { createUser, uploadFile } from "./api/userInstance";

const App = () => {
  const [file, setFile] = useState<any>(null);
  const handleSendFile = () => {
    let formData = new FormData();
    if (file) {
      let counter = 1;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [_key, value] of Object.entries(file)) {
        formData.append(`avatar${counter}`, value, value.name);
        counter += 1;
      }
    }
    uploadFile(formData);
  };
  return (
    <div>
      <div>App</div>
      <button onClick={createUser}>create user</button>
      <input
        type="file"
        multiple
        onChange={e => {
          if (e.target.files) {
            console.log(e.target.files);
            setFile(e.target.files);
          }
        }}
      />
      <button onClick={handleSendFile}>Send file</button>
      <div>{JSON.stringify(file)}</div>
    </div>
  );
};

export default App;
