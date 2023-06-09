import React, { Component } from 'react';
import { getTileCoords, distanceBetween, invert } from '../../lib/utils';
import Grid from './Grid';
import {
  GAME_IDLE,
  GAME_OVER,
  GAME_STARTED,
  GAME_PAUSED,
} from '../../lib/game-status';
import Dialog from 'material-ui/Dialog';
import Button from '@mui/material/Button';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import styled from 'styled-components';
class Game extends Component {
  constructor(props) {
    super(props);

    const { numbers, tileSize, gridSize, moves, seconds } = props;
    const tiles = this.generateTiles(numbers, gridSize, tileSize);
    const userId = props._id;
    const token = props.token
    this.state = {
      tiles,
      gameState: GAME_IDLE,
      moves,
      seconds,
      dialogOpen: false,
      snackbarOpen: false,
      snackbarText: '',
      userId,
      token
    };
    console.log(this.state.userId)
    document.addEventListener('keydown', this.keyDownListener);
  }
  

  componentWillReceiveProps(nextProps) {
    const { tileSize, gridSize } = this.props;
    const newTiles = this.generateTiles(nextProps.numbers, gridSize, tileSize);

    this.setState({
      gameState: GAME_IDLE,
      tiles: newTiles,
      moves: 0,
      seconds: 0,
    });

    clearInterval(this.timerId);
  }

  // End game by pressing CTRL + ALT + F
  keyDownListener = key => {
    if (key.ctrlKey && key.altKey && key.code === 'KeyF') {
      const { original, gridSize, tileSize } = this.props;
      const solvedTiles = this.generateTiles(original, gridSize, tileSize).map((
        tile,
        index,
      ) => {
        tile.number = index + 1;
        return Object.assign({}, tile);
      });

      clearInterval(this.timerId);

      this.setState({
        gameState: GAME_OVER,
        tiles: solvedTiles,
        dialogOpen: true,
      });
    }
  };

  handleDialogClose = async () => {
    this.setState({
      dialogOpen: false,
    });
    console.log(this.state.token)
    const savedUserResponse =  fetch(
      `https://interactive-ax75.onrender.com/users/${this.state.userId}/points`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${this.state.token}`,"Content-Type": "application/json" },
        body: JSON.stringify({id:this.state.userId,roundS: 1}),
      }
    );
    const savedUser =  await savedUserResponse.json();
    
  };

 

  generateTiles(numbers, gridSize, tileSize) {
    const tiles = [];

    numbers.forEach((number, index) => {
      tiles[index] = {
        ...getTileCoords(index, gridSize, tileSize),
        width: this.props.tileSize,
        height: this.props.tileSize,
        number,
      };
    });

    return tiles;
  }

  isGameOver(tiles) {
    const correctedTiles = tiles.filter(tile => {
      return tile.tileId + 1 === tile.number;
    });

    if (correctedTiles.length === (this.props.gridSize) ** 2) {
      clearInterval(this.timerId);
      return true;
    } else {
      return false;
    }
  }



  onTileClick = tile => {
    if (
      this.state.gameState === GAME_OVER || this.state.gameState === GAME_PAUSED
    ) {
      return;
    }

    // Set Timer in case of first click
   

    const { gridSize } = this.props;

    // Find empty tile
    const emptyTile = this.state.tiles.find(t => t.number === gridSize ** 2);
    const emptyTileIndex = this.state.tiles.indexOf(emptyTile);

    // Find index of tile
    const tileIndex = this.state.tiles.findIndex(t => t.number === tile.number);

    // Is this tale neighbouring the zero tile? If so, switch them.
    const d = distanceBetween(tile, emptyTile);
    if (d.neighbours) {
      let t = Array.from(this.state.tiles).map(t => ({ ...t }));

      invert(t, emptyTileIndex, tileIndex, [
        'top',
        'left',
        'row',
        'column',
        'tileId',
      ]);

      const checkGameOver = this.isGameOver(t);

      this.setState({
        gameState: checkGameOver ? GAME_OVER : GAME_STARTED,
        tiles: t,
        moves: this.state.moves + 1,
        dialogOpen: checkGameOver ? true : false,
      });
    }
  };

  render() {
    const {
      className,
      gridSize,
      tileSize,
      onResetClick,
      onNewClick,
    } = this.props;

    const actions = [
      <Button label="Close" onTouchTap={this.handleDialogClose} />,
    ];

    return (
      <div className={className}>
        <Grid
          gridSize={gridSize}
          tileSize={tileSize}
          tiles={this.state.tiles}
          onTileClick={this.onTileClick}
        />
        <Dialog
          title="Congrats!"
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}
        >
          You've solved the puzzle in{' '}
          {this.state.moves}
          {' '}moves in{' '}
          {this.state.seconds}
          {' '}seconds!
        </Dialog>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarText}
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}

Game.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  original: PropTypes.arrayOf(PropTypes.number),
  tileSize: PropTypes.number,
  gridSize: PropTypes.number,
  moves: PropTypes.number,
  seconds: PropTypes.number,
};

Game.defaultProps = {
  tileSize: 90,
  gridSize: 4,
  moves: 0,
  seconds: 0,
};

export default styled(Game)`
  flex: 1;
`;