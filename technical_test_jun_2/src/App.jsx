import React, { useEffect, useState } from "react";

const RANDOM_FACT_ENDPOINT = "https://catfact.ninja/fact";

const App = () => {
  const [fact, setFact] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(RANDOM_FACT_ENDPOINT)
      .then((resp) => {
        if (!resp.ok) throw new Error("Something Happend");
        return resp.json();
      })
      .then((resp) => setFact(resp.fact))
      //el catch solo entra si hay un error en la peticion ejemplo baja de internet
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (fact.length <= 0) return;

    const imgSentence = fact.split(" ").splice(0,3).join(" ");

    fetch(`https://cataas.com/cat/says/${imgSentence}?json=true`)
      .then((resp) => resp.json())
      .then((resp) => setImage(`https://cataas.com${resp.url}`));
  }, [fact]);

  return (
    <div>
      <h1>App de gatitos</h1>
      <p>{fact}</p>
      <img src={image} alt="" />
    </div>
  );
};

export default App;
