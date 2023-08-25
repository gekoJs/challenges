import { useState, useCallback, useEffect } from "react";
import styles from "./App.module.css";
import useFetchMovies from "./hooks/useFetchMovies";

//----------------------------------------------------------

const API_KEY = "f6867269";
const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${API_KEY}&S=`;

//----------------------------------------------------------

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [debounceValue, setDebounceValue] = useState("");

  const { getMovies, movies } = useFetchMovies({ inputValue });

  useEffect(() => {
    const a = setTimeout(() => {
      setDebounceValue(inputValue);
    }, 500);
    return () => clearTimeout(a);
  }, [inputValue]);

  useEffect(() => {
    getMovies(debounceValue);
  }, [debounceValue]);
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    getMovies(inputValue);
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newVal = e.target.value;
    setInputValue(newVal);
  }

  //in this way we make an uncontrolled form without using any hook of react
  // function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   const inputs = Object.fromEntries(
  //     new window.FormData(event.target as HTMLFormElement)
  //   );
  //   console.log(inputs);
  // }

  return (
    <div>
      <header className={styles.header}>
        <h1>Movies searcher</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="input_1"
            value={inputValue}
            placeholder="The burial of the big-head anaconda"
            onChange={handleChange}
          />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main style={{ width: "100%" }}>
        {movies ? (
          <ul className={styles.dataContainer}>
            {movies?.map((movie) => (
              <li key={movie.imdbID} className={styles.movie}>
                <img
                  src={movie.poster}
                  alt={"Poster of the movie:" + movie.title}
                />
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No movies found</p>
        )}
      </main>
    </div>
  );
};

export default App;
