import { useEffect, useState } from "react";
import axios from "axios";
import { formatResultsTime } from "../logic/commonFunctions";
import classes from "./Results.module.css";

export const Results = () => {
  const [Results, setResults] = useState([]);
  const [error, setError] = useState(false);
  const activePlayer = localStorage.getItem("user");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API_URL}`)
      .then((response) => {
        setResults(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  return (
    <>
      <div>
        <div className={classes.TitleContainer}>
          <h1 className={classes.CompanyTitle}>Streets Heaver</h1>
        </div>
        <h3 className={classes.GameTitle}>Bingo!</h3>
        <h1 className={classes.ResultTitle}> Results</h1>
        <ol className={classes.ResultsList}>
          {Results.map((result, idx) => (
            <li
              key={result._id}
              className={classes.ResultRow}
              style={{
                color: activePlayer === result.player && "#FFFFFF",
                backgroundColor:
                  activePlayer === result.player
                    ? "#FF3737"
                    : idx % 2 === 0
                    ? "#fafafa"
                    : "#ffffff",
              }}
            >
              <div className={classes.RowLeft}>
                <div className={classes.Position}>
                  {idx === 0 ? (
                    <p className={classes.PositionEmoji}>🥇</p>
                  ) : idx === 1 ? (
                    <p className={classes.PositionEmoji}>🥈</p>
                  ) : idx === 2 ? (
                    <div className={classes.PositionEmoji}>🥉</div>
                  ) : (
                    <p>{idx + 1}</p>
                  )}
                </div>
                <p>
                  {result.player} {idx === 0 && ""}
                </p>
              </div>
              <p className={classes.DurationText}>
                {formatResultsTime(result.duration)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};
