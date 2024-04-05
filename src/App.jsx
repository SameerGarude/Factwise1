import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import userData from "./celebrities.json";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(userData);
  }, []);

  return (
    <center>
      <div className="App">
        <UserList users={users} setUsers={setUsers} />
      </div>
    </center>
  );
};

export default App;
