import { useEffect, useState } from "react";
import "./App.css";
import { type User } from "./types";

function App() {
  const [users, setUsers] = useState<User[]>();
  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then((res) => res.json())
      .then((res) => setUsers(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <p>prueba tecnica</p>
      {JSON.stringify(users)}
    </div>
  );
}

export default App;

