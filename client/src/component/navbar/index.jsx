import React, { useState, useEffect } from 'react';
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import {  startTime } from "../../state/index";
import { Button, Space } from 'antd';

const Navbar = () => {
    
    
  return (
    <header className="header">
        <nav className="nav container">
            <div className="nav__logo">Spaceaverse 🚀</div>
            <div className="nav__menu">
                <ul className="nav__list grid">
                    <li className="nav__item">
                        <div to="#" className="nav__link">
                            Good Luck 😀
                            
                        </div>
                    </li>
                    <li className="nav__item">
                        <div to="#" className="nav__link">
                            Hints ⚡
                        </div>
                    </li>
                    
                </ul>
            </div>
        </nav>
    </header>
  )
}

export default Navbar
