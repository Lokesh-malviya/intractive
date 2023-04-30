import React, { useState, useEffect } from 'react';
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import {  startTime } from "../../state/index";
import { Button, Space } from 'antd';

const Navbar = (props) => {
    const dispatch = useDispatch();
    const times = useSelector((state) => state.times);
    const [time, setTime] = useState(0);
    useEffect(() => {
        let interval = null;
        if (props.startTimer) {
          interval = setInterval(() => {
            setTime(time => time + 1);
            dispatch(
                startTime(
                  {
                    times:time, 
                  })
              );
            
            
          }, 1000);
        } else if (!props.startTimer && time !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [props.startTimer, time]);
    
  return (
    <header className="header">
        <nav className="nav container">
            <div className="nav__logo">Spaceaverse 🚀</div>
            <div className="nav__menu">
                <ul className="nav__list grid">
                    <li className="nav__item">
                        <div to="#" className="nav__link">
                            Time Elapsed : {times}
                            
                        </div>
                    </li>
                    <li className="nav__item">
                        <div to="#" className="nav__link">
                            Points
                        </div>
                    </li>
                    
                </ul>
            </div>
        </nav>
    </header>
  )
}

export default Navbar
