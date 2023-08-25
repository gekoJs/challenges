import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { type apiData } from "../types";

const API_KEY = "f6867269";
const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${API_KEY}&S=`;

export default function useFetchMovies({ inputValue }: { inputValue: string }) {
  const [dataMovies, setDataMovies] = useState<apiData>();
  const prevInputVal = useRef(inputValue);


  const getMovies = useCallback(
    (inputValue: string) => {
      if (prevInputVal.current === inputValue) return;

      prevInputVal.current = inputValue;

      fetch(API_ENDPOINT + inputValue)
        .then((resp) => resp.json())
        .then((resp: apiData) => setDataMovies(resp))
        .catch((err) => console.log(err));
    },
    [inputValue]
  );

  const mappedMovies = useMemo(() => {
    console.log("hoola");
    return dataMovies?.Search?.map((movie) => ({
      poster: movie.Poster,
      title: movie.Title,
      year: movie.Year,
      imdbID: movie.imdbID,
      type: movie.Type,
    }));
  }, [dataMovies]);

  return { movies: mappedMovies, getMovies };
}
