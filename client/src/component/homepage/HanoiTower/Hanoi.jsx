import React, { useState } from "react";
import "./hanoi.css";

const Hanoi = ({userId,token}) => {
  const [moveCount, setMoveCount] = useState(0);
  const [dragId, setDragId] = useState();
  const [tiles, setTiles] = useState([
    {
      id: "Tile-1",
      column: 1,
      row: 1,
      width: 2
    },
    {
      id: "Tile-2",
      column: 1,
      row: 2,
      width: 4
    },
    {
      id: "Tile-3",
      column: 1,
      row: 3,
      width: 6
    },
    /* {
      id: "Tile-4",
      column: 1,
      row: 4,
      width: 8
    },
    {
      id: "Tile-5",
      column: 1,
      row: 5,
      width: 10
    },
    {
      id: "Tile-6",
      column: 1,
      row: 6,
      width: 12
    } */
  ]);

  const handleDrag = (ev) => {
    const dragTile = tiles.find((tile) => tile.id === ev.currentTarget.id);
    const topTile = tiles
      .filter((tile) => tile.column === dragTile.column)
      .sort((a, b) => a.width - b.width)[0];

    if (topTile && ev.currentTarget.id === topTile.id) {
      setDragId(ev.currentTarget.id);
    } else {
      ev.preventDefault();
    }
  };

  const handleDrop = (ev) => {
    const dragTile = tiles.find((tile) => tile.id === dragId);
    const dropColumn = ev.currentTarget.id;

    const dropColumnTopTile = tiles
      .filter((tile) => tile.column.toString() === dropColumn.toString())
      .sort((a, b) => a.width - b.width)[0];

    let newTileState = tiles;

    if (!dropColumnTopTile || dragTile.width < dropColumnTopTile.width) {
      newTileState = tiles.map((tile) => {
        if (tile.id === dragTile.id) {
          tile.column = parseInt(dropColumn, 10);
          setMoveCount(moveCount + 1);
        }

        return tile;
      });
    }

    setTiles(newTileState);
  };

  const column1Tiles = tiles.filter((tile) => tile.column === 1);
  const column2Tiles = tiles.filter((tile) => tile.column === 2);
  const column3Tiles = tiles.filter((tile) => tile.column === 3);

  const winCondition = tiles.every((tile) => tile.column === 3);

  const multifetching = async () => {
    const savedUserResponse =  fetch(
        `https://interactive-ax75.onrender.com/users/${userId}/points`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json" },
          body: JSON.stringify({id:userId,roundS: 3}),
        }
      );
     
      console.log("ssss")
}


  if(winCondition){
    multifetching()
  }

  return (
    <>
      <div className="round3__section container">
        <span className="round3__heading">
          <span className="round3__head">Round 3️⃣ Tower of Hanoi</span>
            <div className="round2__description">
            
The treasure hunt continues with the Tower of Hanoi game, which you encounter after discovering the location of a planet rich in valuable resources with the help of a group of friendly aliens. The game involves moving a tower of disks from one peg to another, with the stipulation that a larger disk cannot be placed on top of a smaller disk. With each successful move, you feel a sense of accomplishment and move closer to your ultimate goal. As you make your way through the various levels of the game, you encounter new challenges that test your problem-solving skills and strategic thinking. But with determination and perseverance, you continue to climb the tower and inch closer to the ultimate treasure of the universe.
          </div>
        </span>
        <div className="App">
      
          <div className="content">
            <div
              className="column-container"
              id={1}
              onDragOver={(ev) => ev.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="center-bar" />
              {column1Tiles
                .sort((a, b) => a.width - b.width)
                .map((tile, index) => {
                  const tileCount = column1Tiles.length;
                  const tileStyles = {
                    width: `${tile.width}em`
                  };
                  tileStyles.marginTop =
                    index === 0 ? `calc(65vh - ${tileCount * 40 + 20}px)` : "0";
                  return (
                    <div
                      {...tile}
                      className="tilem"
                      draggable
                      key={`column-1-${tile.id}`}
                      onDragOver={(ev) => ev.preventDefault()}
                      onDragStart={handleDrag}
                      style={tileStyles}
                    />
                  );
                })}
            </div>
            <div
              className="column-container"
              id={2}
              onDragOver={(ev) => ev.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="center-bar" />
              {column2Tiles
                .sort((a, b) => a.width - b.width)
                .map((tile, index) => {
                  const tileCount = column2Tiles.length;
                  const tileStyles = {
                    width: `${tile.width}em`
                  };
                  tileStyles.marginTop =
                    index === 0 ? `calc(65vh - ${tileCount * 40 + 20}px)` : "0";
                  return (
                    <div
                      {...tile}
                      className="tilem"
                      draggable
                      key={`column-2-${tile.id}`}
                      onDragOver={(ev) => ev.preventDefault()}
                      onDragStart={handleDrag}
                      style={tileStyles}
                    />
                  );
                })}
            </div>
            <div
              className="column-container"
              id={3}
              onDragOver={(ev) => ev.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="center-bar" />
              {column3Tiles
                .sort((a, b) => a.width - b.width)
                .map((tile, index) => {
                  const tileCount = column3Tiles.length;
                  const tileStyles = {
                    width: `${tile.width}em`
                  };
                  tileStyles.marginTop =
                    index === 0 ? `calc(65vh - ${tileCount * 40 + 20}px)` : "0";
                  return (
                    <div
                      {...tile}
                      className="tilem"
                      draggable
                      key={`column-3-${tile.id}`}
                      onDragOver={(ev) => ev.preventDefault()}
                      onDragStart={handleDrag}
                      style={tileStyles}
                    />
                  );
                })}
            </div>
          </div>

          Move count: {moveCount}
        </div>
      </div>
    </>
  );
};

export default Hanoi;
