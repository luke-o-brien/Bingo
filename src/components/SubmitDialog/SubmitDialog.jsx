import { useState, useEffect } from "react";
import classes from "./SubmitDialog.module.css";
import axios from "axios";
import { useNavigate } from "react-router";

export const SubmitDialog = ({ startTime }) => {
  const [displayError, setDisplayError] = useState(false);
  const [player, setPlayer] = useState("");
  const [endTime, setEndTime] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setEndTime(Date.now());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const durationMs = endTime - startTime;
    const durationSeconds = Math.floor(durationMs / 1000);
    console.log(`User has spent ${durationSeconds} seconds.`);
    localStorage.setItem("user", player);
    await axios
      .post(`${import.meta.env.VITE_BACKEND_API_URL}`, {
        player: player,
        duration: durationSeconds,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
    navigate("/results");
  };

  return (
    <>
      <div className={classes.DialogOverlay}>
        <div className={classes.NameDialog}>
          <div className={classes.DialogContent}>
            <div>Congratulation you got Bingo!</div>
            <form
              className={classes.FormContent}
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className={classes.Field}>
                <label>Enter name to submit time</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setPlayer(e.target.value);
                    e.target.value !== "" &&
                      displayError &&
                      setDisplayError(false);
                  }}
                  className={classes.TextInput}
                  style={{ border: displayError && "1px solid #ad0000" }}
                />
                {displayError && (
                  <span className={classes.errorText}>{ErrorMessage}</span>
                )}
              </div>
              <button className={classes.SubmitButton}>Submit score</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
