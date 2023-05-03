import React, { Component } from 'react';
import levelFactory from '../../lib/levels-factory';
import Game from './Game';
import './homepage.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class App extends Component {
  
  constructor(props) {
    super(props);
    const level = props.level ? props.level : levelFactory(4 ** 2);
    const originalLevel = Object.assign({}, level);
    const userId = props._id;
    const token = props._token;
    this.state = {
      original: originalLevel,
      level,
      userId,
      token
    };
  }

  onResetClick = () => {
    this.setState({
      level: {
        tileSet: this.state.original.tileSet,
      },
    });
  };

  onNewClick = () => {
    const newLevel = levelFactory(4 ** 2);
    const newOriginalLevel = Object.assign({}, newLevel);
    this.setState({
      level: newLevel,
      original: newOriginalLevel,
    });
  };

  

  
  render() {
    const { className } = this.props;
    return (
      <section className={className}>
        <div className="set__puzzle">
        <span className="round1">
          <span className="round1_head">
            Round 1️⃣ Galactic Slider
          </span>
          <br/>
          As you land on the planet Mars, you come across a strange puzzle game that has been left behind by a group of astronauts. The game consists of 15 numbered tiles that have been shuffled, and you must arrange them in ascending order to unlock the next clue. As you start to solve the puzzle, you notice that the numbers are not in the correct sequence, and it will require a bit of skill and strategy to get them in the right order.<br/>
        </span>
        <Game
          gridSize={4}
          tileSize={90}
          /*this.state.level.tileSet*/
          _id={this.state.userId}
          token={this.state.token}
          numbers={this.state.level.tileSet}
          onResetClick={this.onResetClick}
          onNewClick={this.onNewClick}
          original={this.state.original.tileSet}
        />
        {console.log(this.state.level.tileSet)}
        </div>
      </section>
    );
  }
}

App.propTypes = {
  level: PropTypes.shape({
    tileSet: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
};

 export default styled(App)`
  display: flex;
  flex-direction: column;
  min-height: 60vh;
  margin-top:2rem;
  overflow:hidden;
`;
