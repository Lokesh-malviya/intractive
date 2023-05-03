import React, { useState } from "react";
import Tile from "./Tile";
import Cell from "./Cell";
import { Board } from "../helper";
import useEvent from "../hooks/useEvent";
import GameOverlay from "./GameOverlay";
import Arrows from '../../../assets/arrows.svg'
const BoardView = () => {
  const [board, setBoard] = useState(new Board());

  const handleKeyDown = (event) => {
    if (board.hasWon()) {
      return;
    }

    if (event.keyCode >= 37 && event.keyCode <= 40) {
      let direction = event.keyCode - 37;
      let boardClone = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );
      let newBoard = boardClone.move(direction);
      setBoard(newBoard);
    }
  };

  useEvent("keydown", handleKeyDown);

  const cells = board.cells.map((row, rowIndex) => {
    return (
      <div key={rowIndex}>
        {row.map((col, colIndex) => {
          return <Cell key={rowIndex * board.size + colIndex} />;
        })}
      </div>
    );
  });

  const tiles = board.tiles
    .filter((tile) => tile.value !== 0)
    .map((tile, index) => {
      return <Tile tile={tile} key={index} />;
    });

  const resetGame = () => {
    setBoard(new Board());
  };

  return (
    <div className="round4__section container">
            <span className="round6__heading">
                    <span className="round3__head">Round 7️⃣ Andromeda 2048</span>
                      <div className="round2__description">
                      After mastering the Wordle game and deciphering the secrets of the strange symbols and letters on the mysterious planet, you come across a new challenge - the 2048 game. The game involves sliding numbered tiles on a grid, trying to combine them to create a tile with the number 2048.
                    </div>
                    <img src={Arrows} alt="" className="left__imgs" />

              </span>
            
              <div>
                <div className="board">
                  {cells}
                  {tiles}
                  <GameOverlay onRestart={resetGame} board={board} />
                </div>
              </div>
    </div>
  );
};

export default BoardView;
