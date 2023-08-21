import { SortBy, type User } from "../../types";

// las tablas se basan en estas etiquetas <table> <thead> y <tbody>
// tr → row
// td → cell

interface Props {
  users: User[] | undefined;
  isColored: boolean;
  handleDelete: (email:string) => void;
  handleChangeSort: (sort: SortBy) => void
}

const UserTable = ({ users, isColored, handleDelete, handleChangeSort}: Props) => {
  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Foto</th>
          <th className="clickeable" onClick={()=>handleChangeSort(SortBy.NAME)}>Nombre</th>
          <th className="clickeable" onClick={()=>handleChangeSort(SortBy.LAST)}>Apellido</th>
          <th className="clickeable" onClick={()=>handleChangeSort(SortBy.COUNTRY)}>Pais</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users ? (
          users.map((user, i) => (
            <tr
              key={user.email}
              style={{
                background: isColored
                  ? i % 2 === 0
                    ? "#333"
                    : "#555"
                  : "none",
              }}
            >
              <td>
                <img src={user.picture.medium} alt="" />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => handleDelete(user.email)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
