import trackModel from "../model/track.model.js";

export const HandleTrack = async (req,res) =>{
    try {
        console.log(req.body)
        const {Date, Todo} = req.body;
        
        let CompletedDate = await trackModel.findOne({Date})

        if(!CompletedDate){
            CompletedDate = await trackModel.create({User:req.user._id, Date, TasksDone:Todo, Count:1})
            return res.status(200).json(CompletedDate)
        }

        CompletedDate.Count += 1;
        CompletedDate.TasksDone.push(Todo)
        await CompletedDate.save()
        return res.status(200).json(CompletedDate)

    } catch (error) {
        console.log("Error in the Handle Track controller", error)
        res.status(500).json({error})
    }
}

export const GetTrack = async (req,res) =>{
    try {
        const Tracks  = await trackModel.find();

        res.status(200).json(Tracks)
    } catch (error) {
        console.log("Error in the Get Track controller", error)
        res.status(500).json({error})
    }
}