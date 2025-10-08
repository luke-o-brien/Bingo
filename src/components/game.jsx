import { useState, useEffect } from "react";
import classes from "./game.module.css";
import clsx from "clsx";
import { Dialog } from "./Dialog/Dialog";
import { RevertDialog } from "./RevertDialog/RevertDialog";
import { bingoSquares } from "../Data/BingoData";
import { SubmitDialog } from "./SubmitDialog/SubmitDialog";

export const Game = () => {
  const [bingoArray, setBingoArray] = useState(bingoSquares);
  const [showDialog, setShowDialog] = useState(false);
  const [showRevertDialog, setShowRevertDialog] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [activeSquare, setActiveSquare] = useState({});
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [count, setCount] = useState(16);
  const [startTime, setStartTime] = useState();

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleClick = (square) => {
    setActiveSquare(square);
    if (square.checked) {
      setShowRevertDialog(true);
    } else {
      setShowDialog(true);
    }
  };

  return (
    <>
      <div className={classes.TitleContainer}>
        <h1 className={classes.CompanyTitle}>GA</h1>
      </div>
      <h3 className={classes.GameTitle}>Snap!</h3>
      <div className={classes.GameContainer}>
        <p className={classes.Tagline}>Find someone who...</p>
        <div className={classes.GameGrid}>
          {bingoArray.map((square, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(square)}
              className={clsx(
                classes.GameTile,
                square.checked && classes.GameTileChecked
              )}
            >
              <p className={classes.TileText}>{square.title}</p>
              <img className={classes.icon} src={square.icon} />
            </div>
          ))}
        </div>
        {count < 16 && count >= 1 && (
          <p className={classes.Count}> {count} squares left</p>
        )}
        {isButtonVisible && (
          <button
            className={classes.BingoButton}
            onClick={() => setShowSubmitDialog(true)}
          >
            I've got Bingo!
          </button>
        )}
      </div>
      {showDialog && (
        <Dialog
          bingoArray={bingoArray}
          setBingoArray={setBingoArray}
          activeSquare={activeSquare}
          setIsButtonVisible={setIsButtonVisible}
          setShowDialog={setShowDialog}
          count={count}
          setCount={setCount}
        />
      )}
      {showRevertDialog && (
        <RevertDialog
          bingoArray={bingoArray}
          setBingoArray={setBingoArray}
          activeSquare={activeSquare}
          setIsButtonVisible={setIsButtonVisible}
          setShowRevertDialog={setShowRevertDialog}
          count={count}
          setCount={setCount}
        />
      )}
      {showSubmitDialog && (
        <SubmitDialog
          setShowSubmitDialog={setShowSubmitDialog}
          bingoArray={bingoArray}
          startTime={startTime}
        />
      )}
    </>
  );
};
