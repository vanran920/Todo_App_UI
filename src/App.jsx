import React, { useState } from 'react'

const App = () => {

const [task, setTask] = useState("")
const [tasks, setTasks] = useState([])

const handleForm = (e) => {

      e.preventDefault()
      if( task.trim() !== '' )
      {
          setTasks([...tasks, { text: task, completed: false }] )
          setTask("")
      }
} 


const handleCompleted = (index) => {
    const newCompletedTask = tasks.map( (t, i) => {
      return   index === i ? {...t, completed: !t.completed} : t
    })

    setTasks(newCompletedTask)
}


const handleDelete = (index) => {
    const deleteTasks = tasks.filter( (_, i) => 
         i !== index ) 

    setTasks(deleteTasks)
}


  return (
    
    <div className='flex justify-center items-center min-h-screen flex-col bg-gray-400'>
      <div className='bg-white p-6 rounded-2xl shadow-lg w-87.5'>
        <h1 className='text-xl font-bold mb-4 text-center'>Todo App</h1>
      <form onSubmit={handleForm} className='flex flex-col gap-8 mb-4' >
          <input className='flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400' type='text' placeholder='Enter A Task' value={task} onChange={(e) => setTask(e.target.value)} required  />
          <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'>Add</button>
      </form>
      <ul className='space-y-3'>
        {
            tasks.map((item, index) => {
                return  <li key={index} className='flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg shadow-sm' >
                    <input type='checkbox' checked={item.completed} onChange={() => handleCompleted(index)} className='mr-2 h-4 w-4' />
                    <span className={`flex-1 ${ item.completed ? "text-gray-400 line-through" : "text-gray-800" }`}> 
                            {item.text}
                    </span>
                    <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition" >Delete</button>
                </li>
            })
        }
      </ul>
      </div>
    </div>
  
  )
}

export default App
