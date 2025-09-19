import { useState, useEffect } from "react";
import classes from "./SubmitDialog.module.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { formatTime } from "../../logic/commonFunctions";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export const SubmitDialog = ({ startTime }) => {
  const [displayError, setDisplayError] = useState(false);
  const [player, setPlayer] = useState("");
  const [duration, setDuration] = useState()
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    const endTime = Date.now();
    const durationMs = endTime - startTime;
    const durationSeconds = Math.floor(durationMs / 1000);
    setDuration(durationSeconds)
  }, []);

  const { width, height } = useWindowSize();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (player === "") {
      setDisplayError(true)
      setErrorMessage('Please enter a name to submit time')
    } else {
      localStorage.setItem("user", player);
      await axios
        .post(`${import.meta.env.VITE_BACKEND_API_URL}`, {
          player: player,
          duration: duration,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.error(err);
          setDisplayError(true);
          setErrorMessage(`${err.message}`)
        });
      navigate("/results");
    }
  };

  return (
    <>
      <div className={classes.DialogOverlay}>
        <div className={classes.NameDialog}>
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={2000}
          />
          <div className={classes.DialogContent}>
            <h3 className={classes.ConfirmTitle}>
              Congratulations you got Bingo!
            </h3>
            <p className={classes.Trophy}>🏆</p>
            <p className={classes.TimeTaken}>in</p>
            <p className={classes.DurationText}>{formatTime(duration)}</p>
            <form
              className={classes.FormContent}
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className={classes.Field}>
                <label>Enter Name to submit time</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setPlayer(e.target.value);
                    e.target.value !== "" &&
                      displayError &&
                      setDisplayError(false);
                  }}
                  className={classes.TextInput}
                />
                {displayError && (
                  <span className={classes.errorText}>{errorMessage}</span>
                )}
              </div>
              <button className={classes.SubmitButton}>Submit and view results</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
