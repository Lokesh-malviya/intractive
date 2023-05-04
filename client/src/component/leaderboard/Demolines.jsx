import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Liquid,Line } from '@ant-design/plots';

const DemoLines = ({user}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    let fdata = []
    console.log("admin",user)
    for (let m in user.slice(0,3)){
            let unique = user[m].listRound.filter((item, i, ar) => ar.indexOf(item) === i);
            let poi = []
            unique.includes(1)?poi.push(150):poi.push(0);
                unique.includes(2)?poi.push(100):poi.push(0);
                unique.includes(3)?poi.push(150):poi.push(0);
                unique.includes(4)?poi.push(150):poi.push(0);
                unique.includes(5)?poi.push(50):poi.push(0);
                unique.includes(6)?poi.push(200):poi.push(0);
                unique.includes(7)?poi.push(200):poi.push(0);
            console.log("poi",poi)
            let min = 0;
            let sec = 0;
            let tos = [];
            for (let valuesk in user[m].timesu.slice(0,7)) {
                console.log(user[m].timesu)
              const [hourStr1,minuteStr1, secondStr1] = user[m].timesu[parseInt(valuesk,10)+1].split(":");
              const [hourStr2,minuteStr2, secondStr2] = user[m].timesu[parseInt(valuesk,10)].split(":");
              console.log((parseInt(valuesk,10)+1),minuteStr1,secondStr1,minuteStr2,secondStr2)
              min += ((Math.abs(parseInt(hourStr1,10))*60)+parseInt(minuteStr1,10)+(Math.abs(parseInt(secondStr1,10))/60))-((Math.abs(parseInt(hourStr2,10))*60)+parseInt(minuteStr2,10)+(Math.abs(parseInt(secondStr2,10))/60))
              tos.push(min)
                
            }
            for (let k in user[m].timesu.slice(0,7)){
            let name = `round_${parseInt(k)+1}`
            let prt = `Top_${m}`
            fdata.push(
                {
                    prt:prt,
                    name:name,
                    points:poi[k],
                    time:tos[k]
                    }
                ) 
            } 

        } 

      console.log(fdata)
      setData(fdata)
  };


 
 


  const config = {
    percent: 0.35,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
  };

  const configm = {
    data,
    xField: 'name',
    yField: 'time',
    seriesField: 'prt',
    
    legend: {
      position: 'top',
    },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };
 

  return (<>
    <div className="graph__section container">
    {console.log(user)}
    <div className="left__class">
        <div className="down">
        Liquid Plot : Application Growth
       </div>
       <div className="up">
       <Liquid {...config} />
       </div>
    </div>
    <div className="right__class">
            <div className="down">
                Graph : Top 3 Winner (Rounds vs Time Spent vs Score)
            </div>
            <div className="up">
            <Line {...configm} />
            </div>   
    </div>
    </div>
    {/* <div className="graph__section container">
    <div className="left__class">
        <div className="down">
        Pie : Rounds vs Time spent
       </div>
       <div className="up">
       <Pie {...configm} />
       </div>
    </div>
    <div className="right__class">
            <div className="down">
                Graph : Rounds vs Time Spent/round vs Points
            </div>
            <div className="up">
            <DualAxes {...configf} />
            </div>   
    </div>
    </div> */}

    </>);
};

export default DemoLines;

