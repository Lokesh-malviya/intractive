import React from "react";
import TryAgainLogo from "../../../assets/img/try-again.gif";
const GameOverlay = ({ onRestart, board }) => {
  if (board.hasWon()) {
    const multifetchings = async () => {
      const savedUserResponse =  fetch(
          `https://interactive-ax75.onrender.com/users/${userId}/points`,
          {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json" },
            body: JSON.stringify({id:userId,roundS: 7}),
          }
        );    
    }
    multifetchings();
    return <div className="tile2048"></div>;
  } else if (board.hasLost()) {
    return (
      <div className="gameOver" onClick={onRestart}>
        <img
          src={TryAgainLogo}
          alt="Inténtalo de nuevo!!"
          style={{
            width: "100%",
            height: "100%",
            cursor: "pointer",
          }}
        />
      </div>
    );
  }

  return null;
};

export default GameOverlay;