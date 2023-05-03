import React,{useEffect,useState} from 'react'
import '../homepage.css';

import planet1 from "../../../assets/img/planet1.jpg";
import planet2 from "../../../assets/img/planet2.jpg";
import planet3 from "../../../assets/img/planet3.jpg";
import planet4 from "../../../assets/img/planet4.jpg";
import planet5 from "../../../assets/img/planet5.jpg";
import planet6 from "../../../assets/img/planet6.jpg";
import Singlecard from './singlecard';

const cardImages=[
    {"src":planet1,matched:false},
    {"src":planet2,matched:false},
    {"src":planet3,matched:false},
    {"src":planet4,matched:false},
    {"src":planet5,matched:false},
    {"src":planet6,matched:false},
]
const Magic = ({userId,token}) => {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState (0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [count,setCount] = useState(0);
// shuffle cards
        const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
        .sort (() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }))
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards (shuffledCards)
        setTurns(0)
        }
    const handleChoice = (card) => {
        choiceOne?setChoiceTwo(card):setChoiceOne(card)
    }

    // compare 2 selected cards
    useEffect (() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)
        if (choiceOne.src === choiceTwo.src) {
            setCards (prevCards => {
                return prevCards.map(card => {
                if (card.src === choiceOne.src) {
                    setCount(count+1)
                    return {...card, matched: true}
                } else {
                    return card
                }
                })
                })
            resetTurn()
        } else {
            
            setTimeout(() => resetTurn(), 1000)
        }
        }
        }, [choiceOne, choiceTwo])

    const multifetchd = async () => {
        const savedUserResponse =  fetch(
            `https://interactive-ax75.onrender.com/users/${userId}/points`,
            {
              method: "PATCH",
              headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json" },
              body: JSON.stringify({id:userId,roundS: 2}),
            }
          );
          
          console.log("ssss")
    }
        
    if(count == 6){
        multifetchd()
        setCount(7)
    }
    // reset choices & increase turn
    const resetTurn = () => {
        setChoiceOne (null)
        setChoiceTwo (null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }
    
    useEffect(()=>{
        shuffleCards()
    },[])
  return (
    <div className="match__section container">
        <span className="round2__heading">
            <span className="round2__head">Round 2️⃣ Magic Match</span>
            <div className="round2__description">
            In the second round of the treasure hunt, you find yourself on a planet where a group of aliens are playing Magic Match, a game where you need to find matching pairs of cards with unique stories. As you play the game, you uncover a story about an astronaut who explored the galaxy and visited different planets, including one with an alien living on it. You eventually discover the location of a planet that is rich in valuable resources, and with the help of the aliens, you embark on a new journey. The game not only tests your memory and observation skills but also helps you uncover the secrets of the universe.
            </div>
        </span>
        <div className="match__start">
    
            <div className="card-grid">
                {cards.map(card => (
                    <Singlecard key={card.id} handleChoice={handleChoice} card={card}
                    flipped={card === choiceOne || card === choiceTwo || card.matched}
                    disabled={disabled}
                    />
                ))}
                </div>
        </div>
        
    </div>
  )
}

export default Magic
