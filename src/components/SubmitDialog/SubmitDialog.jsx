import { useState } from "react";
import classes from "./SubmitDialog.module.css";
import axios from "axios";
import { useNavigate } from "react-router";

export const SubmitDialog = () => {
  const [displayError, setDisplayError] = useState(false);
  const [player, setPlayer] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    await axios.post("https://bingo-backend-5f720c131b18.herokuapp.com/", {
        player: player,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
      navigate('/results')
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
