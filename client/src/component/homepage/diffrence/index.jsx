import React, { useState } from 'react'
import good from '../../../assets/good1.jpg'
import bad from '../../../assets/bad1.jpg'
import './index.css'
const Diffrence = ({userId,token}) => {
    const [ans,setAns] = useState(false);
    const [no,setNo] = useState(false);
    const multifetchings = async () => {
        const savedUserResponse =  fetch(
            `https://interactive-ax75.onrender.com/users/${userId}/points`,
            {
              method: "PATCH",
              headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json" },
              body: JSON.stringify({id:userId,roundS: 5}),
            }
          );
         
         
    }
    
    
      if(ans){
        multifetchings()
      }

  return (
    <div className="round4__section container">
            
        <div className="round5__ques">
            <div className="round5__images">
                <img src={good} alt="" className="left__img" />
                <img src={bad} alt="" className="right__img" />
            </div>
            <div className="ans__button">
                <button onClick={()=>{
                        setNo(true)
                        setAns(false)
                    }} className={!no?"button ssl__ans1 button--flex":"button ssl__ans3 button--flex"} style={{marginRight:10}}>
                                yes 
                </button>
                
                <div onClick={()=>{
                        setAns(true)
                        setNo(false)
                    }}
                     className={!ans?"button ssl__ans2 button--flex":"button ssl__ans4 button--flex"}>
                                No 
                </div>
            </div>  
        </div>
        <span className="round5__heading">
          <span className="round3__head">Round 5️⃣ Multiverse Detective   </span>
            <div className="round2__description">
            
                
            After successfully completing the Tower of Hanoi game, you come across a new challenge in the form of a "Difference between Images" game. As you look at the two seemingly identical pictures, you can't help but wonder - do they really look the same?
          </div>
        </span>
        </div>
  )
}

export default Diffrence
