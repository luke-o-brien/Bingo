import classes from "./RevertDialog.module.css";

export const RevertDialog = ({
  bingoArray,
  activeSquare,
  setBingoArray,
  setShowRevertDialog,
  setIsButtonVisible,
  count, 
  setCount
}) => {
  const revertSquare = (e) => {
    e.preventDefault();
    const updatedArray = bingoArray.map((square) =>
      activeSquare.title === square.title
        ? { ...square, checked: !square.checked, person: "" }
        : square
    );
    setBingoArray(updatedArray);
    setShowRevertDialog(false);
    setCount(count + 1)
    setIsButtonVisible(
      updatedArray.every((item) => item.checked === true) ? true : false
    );
  };

  return (
    <>
      <div className={classes.DialogOverlay}>
        <div className={classes.NameDialog}>
          <div className={classes.DialogContent}>
            <div className={classes.TitleTextContainer}>
            
              <p>Would you like to revert and remove</p>
              <p className={classes.TitleText}>{activeSquare.person}</p>
              
              
            </div>
            <div className={classes.ButtonContainer}>
              <button className={classes.SubmitButton} onClick={revertSquare}>
                Revert Square
              </button>

              <button
                className={classes.CancelButton}
                onClick={() => setShowRevertDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
