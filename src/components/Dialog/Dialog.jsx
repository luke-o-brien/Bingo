import classes from "./Dialog.module.css";
import { useState } from "react";
import Close from "../../assets/xmark.svg";

export const Dialog = ({
  bingoArray,
  setBingoArray,
  activeSquare,
  setShowDialog,
  setIsButtonVisible,
  count, 
  setCount
}) => {
  const [person, setPerson] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bingoArray.some(item => item.person !== '' && item.person === person)) {
      console.log('hit')
      setDisplayError(true);
      setErrorMessage('Cannot have the same person for 2 squares')
    }
    else if  (person) {
      const updatedArray = bingoArray.map((square) =>
        activeSquare.title === square.title
          ? { ...square, checked: !square.checked, person: person }
          : square
      );
      setBingoArray(updatedArray);
      setShowDialog(false);
      setCount(count -1)
      setIsButtonVisible(
        updatedArray.every((item) => item.checked === true) ? true : false
      );
    } else {
      setDisplayError(true);
      setErrorMessage('please enter a name')
    }
  };

  return (
    <>
      <div className={classes.DialogOverlay}>
        <div className={classes.NameDialog}>
          <div className={classes.DialogContent}>
            <div
              onClick={() => setShowDialog(false)}
              className={classes.TitleBar}
            >
              <p className={classes.TitleText}>Who is it?</p>
              <button className={classes.CloseButton}>
                <img src={Close} />
              </button>
            </div>
            <form
              className={classes.FormContent}
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className={classes.Field}>
                <label>Name</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setPerson(e.target.value);
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
              <button className={classes.SubmitButton}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
