import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { SortBy, type User } from "./types";
import { UserTable } from "./components";

function App() {
  const [users, setUsers] = useState<User[]>();
  const [isColored, setIsColored] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [countryInputVal, setCountryInputVal] = useState<string | null>(null);

  const originalUsers = useRef<User[]>([]);
  // useRef lo usamos para → guardar un valor
  //que queremos que se comparta entre renderizados
  //pero que al cambiar, NO VUELVE A RENDERIZAR el componente
  //el useRef no solo sirve para guardar elementos del dom por eso es que aqui
  //no usamos la etiqueta ref

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.results);
        originalUsers.current = res.results;
      })
      .catch((err) => console.log(err));
  }, []);

  //useMemo nos ayuda a renderizar o ejecutar un codigo cuando ciertas dependencias cambien
  const filteredBySearch = useMemo(() => {
    console.log("calculate filteredBySearch");
    return typeof countryInputVal === "string" && countryInputVal.length > 0
      ? users?.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(countryInputVal.toLowerCase());
        })
      : users;
  }, [users, countryInputVal]);

  const sortedUsers = useMemo(() => {
    console.log("calculate sortedUsers");

    if (sorting === SortBy.NONE) return filteredBySearch;

    if (sorting === SortBy.COUNTRY)
      return (
        filteredBySearch &&
        // return a.location.country > b.location.country ? 1 : -1
        [...filteredBySearch]?.sort((a, b) => {
        // localeCompare compares watching the languege, accent country etc, return ascendent order
          return a.location.country.localeCompare(b.location.country);
        })
      );

      if(sorting === SortBy.NAME) return (
        filteredBySearch &&
        [...filteredBySearch]?.sort((a, b) => {
          return a.location.country.localeCompare(b.name.first);
        })
      );
      if(sorting === SortBy.LAST) return (
        filteredBySearch &&
        [...filteredBySearch]?.sort((a, b) => {
          return a.location.country.localeCompare(b.name.last);
        })
      );

  }, [filteredBySearch, sorting]);

  const toggleColors = () => {
    setIsColored((prev) => !prev);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  //------------------------------------------

  const handleResetState = () => {
    setUsers(originalUsers.current);
  };

  const handleDelete = (userEmail: string) => {
    const filteredUsers = users?.filter((user) => user.email !== userEmail);
    setUsers(filteredUsers);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };
  return (
    <div>
      <p>prueba tecnica</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
          margin: "20px 0",
        }}
      >
        <button onClick={toggleColors}>Colorear</button>
        <button onClick={toggleSortByCountry}>Ordenar por pais</button>
        <button onClick={handleResetState}>Reset users</button>
        <input
          type="text"
          placeholder="Filtra por pais"
          onChange={(e) => setCountryInputVal(e.target.value)}
        />
      </div>
      <UserTable
        users={sortedUsers}
        isColored={isColored}
        handleDelete={handleDelete}
        handleChangeSort={handleChangeSort}
      />
    </div>
  );
}

export default App;
