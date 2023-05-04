import User from "../models/User.js";

/*Read */
export const getUser = async (req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({message:err.message});
    }
}

export const setPoints = async (req,res)=>{
    try {
        const {id,roundS} = req.body;
        const user = await User.findById(id);
        console.log(user.listRound)
        if(!user.listRound.includes(roundS)){
            user.listRound.push(roundS)
        }
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({message:err.message});
    }
}

export const setPointn = async (req,res)=>{
    try {
        const {id,point,timespent} = req.body;
        const user = await User.findById(id);
        user.points = point;
        user.timespent = timespent;
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({message:err.message});
    }
}

export const setRounds = async (req,res)=>{
    try {
        const today = new Date(),
        time = today.getHours() + ':' +today.getMinutes() + ':' + today.getSeconds();
        const {id,round,timesp} = req.body;
        const user = await User.findById(id);
        if(round == 1){
            if(user.timesu.length>0){
                user.timesu.length = 0
            }
            user.timesu = [timesp]
        }
        else{
            user.timesu.push(timesp);
            user.roundsu = round;
            if(user.timesu.length>round){
                user.timesu.pop()
            }
            
        }
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({message:err.message});
    }
}

