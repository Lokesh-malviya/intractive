import React from 'react'
import './singlecard.css';
import back from "../../../assets/img/cover.jpg";
export default function Singlecard({card,handleChoice,flipped,disabled}) {

    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }
     }

  return (
    
      <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card_front" />
                <img className="back" src={back} onClick={handleClick} alt="card back" />
            </div>
        </div>
  )
}
