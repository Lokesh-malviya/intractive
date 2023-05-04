import React,{useEffect, useState} from 'react'
import { Space, Table, Tag ,ConfigProvider} from 'antd';
import {useSelector } from "react-redux";
import './leader.css'
import DemoLine from './Demoline'
import DemoLines from './Demolines';



const Leader = ({disables}) => {
    const userId = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [data,setData] = useState(null);
    const [use,setUse] = useState(null);
    const [usecol,setUsecol] = useState(null);
    const columns = [
        {
            title: 'Rank',
            dataIndex: 'key',
            key: 'key',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <div className={disables?"dis":"mis"} onClick={disables?console.log("true"):console.log("false")}>{text}</div>,
        },
       
        {
          title: 'Points',
          dataIndex: 'points',
          key: 'address',
        },
        {
            title: 'Timespent (min)',
          dataIndex: 'timespent',
          key: 'address',
          render: (text) => <div>{text.toFixed(2)}</div>,
        }
      ];
      
    useEffect(() => {
        const calcpoint = async () => {
            const respons = await fetch(`https://interactive-ax75.onrender.com/users/${userId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            
            const userm = await respons.json();
            setUse(userm)
            const response = await fetch(`https://interactive-ax75.onrender.com/lead`,{
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
              }
              );
            const userResp = await response.json();
            setUsecol(userResp);
            console.log("mydata :",response)
            const mydata = [];
            for (let values in userResp) {
                mydata.push(
                    {
                        name:userResp[values]['email'],
                        points:userResp[values]['points'],
                        timespent:userResp[values]['timespent']
                    },
                )
                
              }
            mydata.sort((a, b)=> {
                if (a.points === b.points){
                  return a.timespent > b.timespent ? -1 : 1
                } else {
                  return a.points < b.points ? -1 : 1
                }
              }).reverse();

            for (let valued in mydata){
                mydata[valued].key = valued
            }

            console.log(mydata)
              setData(mydata)
            
            
    }
    calcpoint()
    // make sure to catch any error
    .catch(console.error);

    },[]);
   

  return (
    <div className="leaderboard__setciom container">
        <h1 className="home__title sd">
        LEADERBOARD 🔥
        </h1><br/>
        <ConfigProvider
    theme={{
        components: {
          Table: {
            colorBgContainer:'#02020E',
            colorBorderSecondary:"#5235A6",
            colorIcon:'#fff',
            fontSize:20,
            colorText:'#fff',
            colorTextHeading:'#fff',
          }
        },
      }}
  >
        
        <Table columns={columns} dataSource={data} style={{color:'#fff'}}
      /></ConfigProvider>
      <h1 className="home__title sd">
        {disables?"PERSONAL ANALYSIS 📈":"UNIVERSAL ANALYSIS 📈" }
        </h1><br/>
        {console.log(use)}
      {use!=null && disables?<DemoLine user = {use}/>:usecol!=null?<><DemoLines user={usecol}/></>:<>Error</>}
    </div>
  )
}

export default Leader
