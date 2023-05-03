import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
/* import Confetti from "react-confetti" */
import "./App.css"

export default function Tenzies({userId,token}) {
    const [start, setStart] = React.useState(false)

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [best, setBest] = React.useState(JSON.parse(localStorage.getItem('best')) || 0)
    const [bestTime, setBestTime] = React.useState(JSON.parse(localStorage.getItem('time')) || 0)

    const [startTime, setStartTime] = React.useState(null)
    const [now, setNow] = React.useState(null)
    
    const intervalRef = React.useRef(null)

    function handleStart() {
        setStartTime(Date.now())
        setNow(Date.now())

        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            setNow(Date.now())
        }, 10)
    }

    function handleStop() {
        clearInterval(intervalRef.current)
        if (secondsPassed < bestTime || bestTime == 0){
            localStorage.setItem('time', secondsPassed)
            setBestTime(secondsPassed)
        }
    }
    
    let secondsPassed = 0;
    if (startTime != null && now != null) {
        secondsPassed = (now - startTime) / 1000;
    }


    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            handleStop()
            if ((rolls < best) || best === 0) {
                localStorage.setItem('best', rolls)
                setBest(rolls)
            } 
        }
    }, [dice])


    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    
    function rollDice() {
        if (start){
            if(!tenzies) {
                setDice(oldDice => oldDice.map(die => {
                    return die.isHeld ? 
                        die :
                        generateNewDie()
                }))
                setRolls(rolls+1)
            } else {
                handleStart() 
                setRolls(0)                                                                                                                                                                                                                                       
                setTenzies(false)                                                                                                                                                                                   
                setDice(allNewDice())
            }
        }else {
            setRolls(1)
            setStart(true)
            handleStart()
        }
        
    }
    
    function holdDice(id) {
        if (start) {
            setDice(oldDice => oldDice.map(die => {
                return die.id === id ? 
                    {...die, isHeld: !die.isHeld} :                                                                                                                                                                                                                                                                                             
                    die
            }))
        }
    }
    
    const diceElements = dice.map(die => (
        <Die 
            {...die}
            started={start}
            holdDice={() => holdDice(die.id)}
        />
    ))

  
    const multifetching = async () => {
        const savedUserResponse =  fetch(
            `https://interactive-ax75.onrender.com/users/${userId}/points`,
            {
              method: "PATCH",
              headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json" },
              body: JSON.stringify({id:userId,roundS: 4}),
            }
          );
         
         
    }
    
    
      if(tenzies){
        multifetching()
      }

    return (
        <div className="round4__section container">
            
        <div>
            
            <main>
                {/* {tenzies && <Confetti />} */}
                
                
                <div className="dice-container">
                    {diceElements}
                </div>
                <button
                    className="roll-dice" 
                    onClick={rollDice}
                >
                    {!start ? "Start"  : "Roll"}
                </button>
               
            </main>
        </div>
        <span className="round3__heading">
          <span className="round3__head">Round 4️⃣ Cosmic Roll</span>
            <div className="round2__description">
            
                
            You move on to the next stage of the treasure hunt, which is the Tenzies game, after successfully completing the Tower of Hanoi with the help of your alien friends. The Tenzies game is a thrilling and fast-paced game that requires you to roll dice until they all show the same number. The game allows you to click on each die to freeze it at its current value between rolls, making it a game of both luck and strategy.
          </div>
        </span>
        </div>
    )
}