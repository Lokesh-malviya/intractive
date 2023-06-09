import React, { useState, useEffect, useContext } from 'react';
import WordleContext from './WordleContext';

export default function Board({userId,token}) {

  const { state, setState } = useContext(WordleContext);
  const { wordList, isGameOver, tempUserSOlution, grid, rowIndex, isSubmitted, solution } = state;
  const [drawGrid, setDrawGrid] = useState(grid);
  const [message, setMessage] = useState('');
console.log("userId",userId)
  useEffect(() => {
    const isWordInList = wordList.includes(tempUserSOlution);

    if (!isWordInList && isSubmitted) {
      setMessage(tempUserSOlution.length !== solution.length ? 'Not enough letters' : 'word is not in list')
    }

    if (isSubmitted && isWordInList) {
      const temp = drawGrid.slice(0);

      temp[rowIndex - 1] = grid[rowIndex - 1].map((col: string, index: number) => {
        let className = 'gray';
        const letterIndex = solution.indexOf(col);

        if (letterIndex === index || solution[index] === col) className = 'green';
        if (letterIndex !== index && letterIndex > -1 && solution[index] !== col) {
          className = 'yellow';
        }

        return className + ' flip'
      });

      setDrawGrid(temp);
      setMessage('');
    }

    const multifetching = async () => {
      const savedUserResponse =  fetch(
          `https://interactive-ax75.onrender.com/users/${userId}/points`,
          {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json" },
            body: JSON.stringify({id:userId,roundS: 6}),
          }
        );
       
       
    }

    if (isGameOver) {
      setMessage('Game is over: ' + solution);
      multifetching();
      return;
    }
  }, [isSubmitted, isGameOver]);

  return <div className='center'>
    <ul>{drawGrid.map((row, i: number) => <li className='d-flex' key={i}>
      {row.map((col: any, index: number) => {
        const letter = grid[i][index];
        return <span className={'cell ' + col} key={index + '-cell'}>{isNaN(letter) ? letter : ''}</span>
      })}
    </li>)}</ul>

    {message && <pre>{message}</pre>}

    <div>{JSON.stringify(state.score)}</div>
  </div>
}