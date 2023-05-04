import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Area,Line,Pie,DualAxes } from '@ant-design/plots';

const DemoLine = ({user}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    let fdata = []
    console.log(user)
   let unique = user.listRound.filter((item, i, ar) => ar.indexOf(item) === i);
    let poi = []
      unique.includes(1)?poi.push(150):poi.push(0);
        unique.includes(2)?poi.push(100):poi.push(0);
        unique.includes(3)?poi.push(150):poi.push(0);
        unique.includes(4)?poi.push(150):poi.push(0);
        unique.includes(5)?poi.push(50):poi.push(0);
        unique.includes(6)?poi.push(200):poi.push(0);
        unique.includes(7)?poi.push(200):poi.push(0);
      console.log(poi)
      let min = 0;
      let sec = 0;
      let tos = [];
      for (let valuesk in user.timesu.slice(0,7)) {
        
        const [hourStr1,minuteStr1, secondStr1] =  user.timesu[parseInt(valuesk,10)+1].split(":");
        const [hourStr2,minuteStr2, secondStr2] =  user.timesu[parseInt(valuesk,10)].split(":");
        console.log((parseInt(valuesk,10)+1),minuteStr1,secondStr1,minuteStr2,secondStr2)
        min += ((Math.abs(parseInt(hourStr1,10))*60)+parseInt(minuteStr1,10)+(Math.abs(parseInt(secondStr1,10))/60))-((Math.abs(parseInt(hourStr2,10))*60)+parseInt(minuteStr2,10)+(Math.abs(parseInt(secondStr2,10))/60))
        tos.push(min)
        
      }
    for (let m in user.timesu.slice(0,7)){
      let name = `round_${parseInt(m)+1}`
      fdata.push(
          {
              name:name,
              points:poi[m],
              time:tos[m]
              }
          ) 
      } 

      console.log(fdata)
      setData(fdata)
  };
  const config = {
    data,
    xField: 'name',
    yField: 'points',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#fff',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };
  const configs = {
    data,
    xField: 'name',
    yField: 'time',
    xAxis: {
      range: [0, 1],
    },
  };
  const configm = {
    appendPadding: 10,
    data,
    angleField: 'time',
    colorField: 'name',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  const configf = {
    data: [data, data],
    xField: 'name',
    yField: ['time', 'points'],
    geometryOptions: [
      {
        geometry: 'line',
        smooth: false,
        color: '#5B8FF9',
        
        lineStyle: {
          lineWidth: 3,
          lineDash: [5, 5],
        },
      },
      {
        geometry: 'line',
        smooth: true,
        color: '#5AD8A6',
        lineStyle: {
          lineWidth: 4,
          opacity: 0.5,
        },
        
        point: {
          shape: 'circle',
          size: 4,
          style: {
            opacity: 0.5,
            stroke: '#5AD8A6',
            fill: '#fff',
          },
        },
      },
    ],
  };
 

  return (<>
    <div className="graph__section container">
    
    <div className="left__class">
        <div className="down">
        Graph : Rounds vs Point gained
       </div>
       <div className="up">
       <Line {...config} />
       </div>
    </div>
    <div className="right__class">
            <div className="down">
                Graph : Rounds vs Time Spent (second)
            </div>
            <div className="up">
                <Area {...configs}/>
            </div>   
    </div>
    </div>
    <div className="graph__section container">
    <div className="left__class">
        <div className="down">
        Pie : Rounds vs Time spent (second)
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
    </div>

    </>);
};

export default DemoLine;

