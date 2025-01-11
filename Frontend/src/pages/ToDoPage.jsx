import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { FaBarsProgress } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import Heatmap from "./Heatmap";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../../Context/AuthContext";

const ToDoPage = () => {
  const navigate = useNavigate()
  const [Todos, setTodo] = useState([]);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [newTask, setNewTask] = useState("");

  const [DateValues, setDateValues] = useState()

  useEffect(()=>{
    axios.get("http://localhost:3000/todo/gettrack", { withCredentials: true })
    .then((response)=>{setDateValues(response.data)
    })
  },[])


  useEffect(() => {
    axios
      .get("http://localhost:3000/todo/gettodo", { withCredentials: true })
      .then((response) => {
        const fetchedTodos = response?.data?.ToDos;
        if (JSON.stringify(fetchedTodos) !== JSON.stringify(Todos)) {
          setTodo(fetchedTodos);
        }
      })
      .catch((error)=>console.log(error))
  }, [Todos]);

  const handleAddTask = () => {
    if (newTask.trim() === "") return; 

    setIsAddClicked(false);
    
    axios.post("http://localhost:3000/todo/createtodo", { Task: newTask }, {withCredentials:true})
    // const newToDo = [...Todos]
    setTodo((prev)=>([...prev,{_id:Date.now(), newTask}]))
    setNewTask("");
  };


    const getFormattedDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); 
      const day = String(today.getDate()).padStart(2, '0');
  
      return `${year}-${month}-${day}`; 
    };
  




  const HandleComplete = (Todo) =>{
    axios.post("http://localhost:3000/todo/deletetodo", Todo,{withCredentials:true})
    .then((response)=>setTodo(response.data))

    axios.post("http://localhost:3000/todo/addtrack",{Date:getFormattedDate(), Todo},{withCredentials:true})
    
  }

  const {AuthUser, setAuthUser} = useContext(AuthDataContext)
  const HandleLogout = () =>{
      axios.get("http://localhost:3000/user/logout", {withCredentials:true})
      .then((response)=>{
        localStorage.removeItem("ToDoUser")
        setAuthUser(localStorage.getItem("ToDoUser"))
        navigate("/signup")
      })


  }

  const [isHeatmapClicked, setHeatmapClick] = useState(false)
  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 flex flex-col items-center">
      <div>
      <h1 className="text-4xl font-bold text-white text-center mb-6 ">
          My tasks
        </h1>
       
        <IoMdLogOut className="text-white text-2xl absolute top-10 right-8"
        onClick={HandleLogout}
        />
        
      </div>
      <div className="w-full max-w-4xl h-[75%] bg-gray-800 shadow-lg rounded-lg p-8 overflow-y-auto">
        <div className="space-y-4">
          {Todos?.map((Todo) => (
            <div
              key={Todo._id}
              className="p-4 bg-gray-700 text-white rounded-lg shadow-md flex justify-between items-center"
            >
              <h2 className="text-lg font-semibold">{Todo.Task}</h2>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              onClick={()=>HandleComplete(Todo)}
              >
                Completed
              </button>
            </div>
          ))}
        </div>
      </div>
     
      {
        isHeatmapClicked && 
        <Heatmap startDate={"2024-10-4"} endDate={"2025-2-5"} dataValues={DateValues}/>
      }
      {/* Add Task Modal */}
      {isAddClicked && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Add New Task
            </h2>
            <input
              className="w-full bg-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setIsAddClicked(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={handleAddTask}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Add Button */}
      <div
        className="h-14 w-14 bg-blue-600 rounded-full flex items-center justify-center fixed right-4 bottom-6 shadow-lg cursor-pointer hover:bg-blue-700 transition"
        onClick={() => setIsAddClicked(true)}
      >
        <IoIosAdd className="text-white text-4xl" />
      </div>


      <div
        className="h-14 w-14 bg-blue-600 rounded-full flex items-center justify-center fixed right-4 bottom-24 shadow-lg cursor-pointer hover:bg-blue-700 transition"
        onClick={()=>setHeatmapClick(!isHeatmapClicked)}
      >
        <FaBarsProgress className="text-white text-lg"/>
      </div>
      
    </div>
  );
};

export default ToDoPage;
