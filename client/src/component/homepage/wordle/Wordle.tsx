import React from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";
import './board.css';
import { WordleStore } from "./WordleStore";

export function Wordle({ wordList, solution, nbRows, nbCols,userId,token }) {
  const onNewGame = () => {
    window.location.reload()
  }

  return( 
  <div className="round4__section container">
            <span className="round6__heading">
                    <span className="round3__head">Round 6️⃣ Wordle</span>
                      <div className="round2__description">
                      
                          
                      After successfully completing the Multiverse Detective game, you stumble upon a mysterious planet filled with strange symbols and letters. As you explore the planet, you encounter an alien who introduces you to the Wordle game. The goal of the game is to guess a five-letter word in as few attempts as possible. After each guess, the game provides feedback on which letters are correct and in the right position and which letters are correct but in the wrong position.
                    </div>
                    <span className="fir"><div className="green__col f">A</div>{" "}the letter is in the correct position.</span>
                    <span className="fir"><div className="yellow__col f">A</div>{" "}the letter is in the word but not in the correct position</span>
                    <span className="fir"><div className="grey__col f">A</div>{" "}the letter is not in the word.</span>

              </span>
            
            <div className="round6__subsection">
            <WordleStore wordList={wordList} solution={solution} nbRows={nbRows} nbCols={nbCols}>

              <Board  userId={userId} token={token}/>

              <div className="center">
              <Keyboard />
              </div>
              </WordleStore>
            </div>
    </div>
  )
}