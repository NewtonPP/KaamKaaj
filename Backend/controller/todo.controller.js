import todoModel from "../model/todo.model.js"
import UserModel from "../model/user.model.js"

export const CreateToDo = async (req,res) =>{
    const {Task, CompletedDate} = req.body
    try {
        const user = req.user
        console.log(user)
        const NewToDo = await todoModel.create({Task, CompletedDate})
        user.ToDos.push(NewToDo._id)
        await user.save();

        return res.status(200).json(user)

    } catch (error) {
        console.log("Error in CreateTodo controller", error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const DeleteToDo = async (req, res) =>{
    try {
        const {_id} = req.body
   
        req.user.ToDos = req.user.ToDos.filter((todo)=>(
            String(todo._id) !==_id
        ))

        await todoModel.deleteOne({_id})
      
        await req.user.save()
        return res.status(200).json(req.user.ToDos)
        
    } catch (error) {
        console.log("Error in DeleteToDo controller", error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const GetToDo = async (req,res) =>{
    try {
        const user = req.user
        return res.status(200).json(user)
    } catch (error) {
        console.log("Error in CreateToDo controller", error)
        res.status(500).json({error:"Internal Server Error"})
    }
}