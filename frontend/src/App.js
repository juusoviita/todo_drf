import './App.css';
import { useState, useEffect } from 'react'
import Header from './components/Header'
import TaskList from './components/TaskList'
import AddForm from './components/AddForm'
import { Switch, FormGroup, FormControlLabel } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [editing, setEdit] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState({})
  const [showComp, setShowComp] = useState(true)

  //Fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:8000/api/task-list/')
      const data = await res.json()

      setTasks(data)
    }

    fetchTasks()
  }, [])


  //Fetch a single task
  const fetchTask = async (id) => {
    var url = `http://localhost:8000/api/task-detail/${id}`
    const res = await fetch(url)
    const data = await res.json()

    return data
  } 


  // All the functions to Add or Delete tasks will be added to this file 
  // Add a New Task or Edit an existing Task
  const addTask = async (task) => {

    if (editing === false) {
      const id = ''
      const newTask = {id, ...task}

      var url = 'http://localhost:8000/api/task-create/'

      // Made async so that the new task is rendered with an id from the start
      const res = await fetch(url, {
        method: 'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(newTask)
      })

      const data = await res.json()

      setTasks([...tasks, data])
    } else {

      const id = task.id
      var url = `http://localhost:8000/api/task-update/${id}/`

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type':'application/json'
        },
        body: JSON.stringify({
          id: task.id,
          title: task.editTitle,
          due_date: task.editDueDate,
          reminder: task.editReminder,
        })
      })

      const data = await res.json()

      setTasks(tasks.map((task) => task.id === id ? {...task, title: data.title, due_date: data.due_date, reminder: data.reminder } : task ))

      setEdit(false)
      setTaskToEdit({})
    }
    setShowAddTask(false)
  }
  
  // Delete Task
  const deleteTask = (id) => {

    var url = `http://localhost:8000/api/task-delete/${id}`

    fetch(url, {
      method: 'DELETE',
      headers:{
        'Content-type':'application/json'
      },
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    var url = `http://localhost:8000/api/task-update/${id}/`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  // Toggle Show Completed
  const toggleShowComp = async () => {
    setShowComp(!showComp)
    if (showComp) {
      setTasks(tasks.filter((task) => !task.completed && task ))
    } else {
      const res = await fetch('http://localhost:8000/api/task-list/')
      const data = await res.json()
      setTasks(data)
    }
  }


  // Start Editing Task
  const startEdit = (task) => {
    setTaskToEdit({...task})
    setEdit(true)
    setShowAddTask(true)
  }

  // Complete Task
  const completeTask = async (id) => {
    
    const taskToComplete = await fetchTask(id)
    const compTask = { ...taskToComplete, completed: !taskToComplete.completed }

    var url = `http://localhost:8000/api/task-update/${id}/`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(compTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? {...task, completed: data.completed} : task))
  }

  // Show/hide the AddForm and clear editing and taskToEdit, if needed
  const showAddForm = () => {
    if (showAddTask === true) {
      setShowAddTask(false)
      if (editing === true) {
        setEdit(false)
        setTaskToEdit({})
      }
    } else {
      setShowAddTask(true)
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="container">
          <div id="task-container">
            <Header onAdd={showAddForm} showAdd={showAddTask} />
            { showAddTask && <AddForm onAdd={addTask} editing={editing} taskToEdit={taskToEdit} />}
            <FormGroup id="form-group">
              <FormControlLabel control={<Switch checked={showComp} onChange={toggleShowComp} color="warning" />} label="Show completed" />
            </FormGroup>
          </div>
          {tasks.length > 0 ? <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} onChange={completeTask} onEdit={startEdit} /> : 'No tasks yet'}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
