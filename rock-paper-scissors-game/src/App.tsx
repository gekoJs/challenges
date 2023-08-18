import paper from "./assets/images/paper.png";
import scissors from "./assets/images/scissors.png";
import rock from "./assets/images/rock.png";
import styles from "./App.module.css";
import { useState } from "react";

//-----------------------------------------------------

const hands = [
  { image: rock, title: "Rock", index: 0 },
  { image: paper, title: "Paper", index: 1 },
  { image: scissors, title: "Scissor", index: 2 },
];
const whoWins: { [key: string]: string } = {
  RR: "Draw",
  RP: "Cpu",
  RS: "User",
  PP: "Draw",
  PR: "User",
  PS: "Cpu",
  SS: "Draw",
  SR: "Cpu",
  SP: "User",
};

const App = () => {
  const [playerChose, setPlayerChose] = useState(0);
  const [cpuChose, setCpuChose] = useState(0);
  const [loading, setLoading] = useState(false);
  const [wins, setWins] = useState({ User: 0, Cpu: 0, Draw: 0 });
  const [winner, setWinner] = useState("¡Let's Play!");

  const handleClick = (hand: number) => {
    if (loading) return;
    setLoading(true);
    setPlayerChose(0);
    setCpuChose(0);
    const cpuChoseRandom = Math.floor(Math.random() * 3);
    const playerChoise = hands[hand].title[0];
    const cpuChoise = hands[cpuChoseRandom].title[0];
    const winnerr = whoWins[playerChoise + cpuChoise];

    setTimeout(() => {
      setCpuChose(cpuChoseRandom);
      setPlayerChose(hand);
      setWinner(`${winnerr}`);
      setWins((prev) => {
        return {
          ...prev,
          [winnerr]: prev[winnerr as keyof typeof wins] + 1,
        };
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <section className={styles.container}>
      <div className={styles.gameWrapper}>
        <div className={styles.screenGame}>
          <span>
            <p className={`${styles.screenGameText}`}>you {wins.User}</p>
            <img
              src={hands[playerChose].image}
              alt="player"
              className={`${styles.p1} ${styles.player} ${styles.hand} ${
                loading && styles.p1Active
              }`}
            />
          </span>
          <span>
            <p className={`${styles.screenGameText} ${styles.screenGameText2}`}>
              {wins.Cpu} cpu
            </p>
            <img
              src={hands[cpuChose].image}
              alt="cpu"
              className={`${styles.cpu} ${styles.player} ${styles.hand} ${
                loading && styles.cpuActive
              }`}
            />
          </span>
        </div>

        <p className={styles.statusText}>
          {loading
            ? "Wait..."
            : winner === "Draw"
            ? `¡Draw!`
            : `!${winner} wins¡`}
        </p>

        <div className={styles.choices}>
          {hands.map((hand) => (
            <span
              key={hand.index}
              className={`${styles.choice}`}
              onClick={() => handleClick(hand.index)}
            >
              <img src={hand.image} alt="hand" className={styles.hand} />
              <p className={styles.choiceText}>{hand.title}</p>
            </span>
          ))}
        </div>
        <p className={`${styles.choose} ${loading && styles.chooseLoading}`}>
          Choose
        </p>
      </div>
    </section>
  );
};

export default App;
