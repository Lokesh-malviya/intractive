import React from 'react'
import Data from "../start/data.jsx";
import './start.css'
const Starts = () => {
  return (
    <section className="home section" id="home">
            <div className="home__container container grid">
                <div className="home__content grid">
                    <div className="home__img"></div>
                    <Data/>
                </div>
            </div>
        </section>
  )
}

export default Starts
