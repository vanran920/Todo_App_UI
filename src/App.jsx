import React, { useEffect, useState } from 'react'

const App = () => {

const [task, setTask] = useState("")
const [tasks, setTasks] = useState([]) 
const [editIndex, setEditIndex] = useState(null)
const [editText, setEditText] = useState("") 
const [filterTask, setFilterTask] = useState('all') 


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

const handleEdit = (index) => {
       
     setEditIndex(index)
     setEditText(tasks[index].text)
}

const handleSave = (index) => {

      const newTask = tasks.map((t, i) => {
         return  (index == i) ? { ...t,  text: editText  } : t
      }) 

      setTasks(newTask)
      setEditIndex(null)
} 

const filterTasks =  tasks.filter( (item) => {
                    if(filterTask === 'completed')
                    {
                        return  item.completed === true
                    }
                     
                    if(filterTask === 'pending')
                    {
                        return item.completed === false
                    }
                    else
                    {
                        return true;  
                    }
              })    

return (
    
    <div className='flex justify-center items-center min-h-screen flex-col bg-gray-400'>
      <div className='bg-white p-6 rounded-2xl shadow-lg w-87.5'>
        <h1 className='text-xl font-bold mb-4 text-center'>Todo App</h1>
        <ul className='flex items-center justify-between mb-5' >
           <button onClick={() => setFilterTask('all')} className='font-bold hover:cursor-pointer '>All Task</button>
           <button className='font-bold hover:cursor-pointer' onClick={() => setFilterTask('completed')}>Completed Task</button>
           <button className='font-bold hover:cursor-pointer' onClick={() => setFilterTask('pending')}>Pending Task</button>
        </ul>

      <form onSubmit={handleForm} className='flex flex-col gap-8 mb-4' >
          <input className='flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400' type='text' placeholder='Enter A Task' value={task} onChange={(e) => setTask(e.target.value)} required  />
          <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'>Add</button>
      </form>
      <ul className='space-y-2'>
        {
            filterTasks.map((item, index) => {
                return  (index == editIndex) ? 
                  <div key={index} className='flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg shadow-sm'>
                     <input onChange={(e) => setEditText(e.target.value)} value={editText} className='flex-1 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 ' type='text' />
                     <button onClick={() => handleSave(index)} className='bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition ml-2'>Save</button>
                  </div>
                 : 
                
                <li key={index} className='flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg shadow-sm' >
                    <input type='checkbox' checked={item.completed} onChange={() => handleCompleted(index)} className='mr-2 h-4 w-4' />
                    <span className={`flex-1 ${ item.completed ? "text-gray-400 line-through" : "text-gray-800" }`}> 
                            {item.text}
                    </span>
                    <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">Delete</button>
                    <button onClick={() => handleEdit(index)} className='bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition ml-5'>Edit</button>
                </li>
            })
        }
      </ul>
      </div>
    </div>
  
  )
}

export default App
