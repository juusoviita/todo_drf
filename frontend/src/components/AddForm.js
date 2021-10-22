import { useState } from 'react'
import Button from "./Button"

const AddForm = ({ onAdd, editing, taskToEdit }) => {
  
  const [title, setTitle] = useState('')
  const [due_date, setDuedate] = useState('')
  const [reminder, setReminder] = useState(false)

  const [editTitle, setEditTitle] = useState(taskToEdit.title)
  const [editDueDate, setEditDueDate] = useState(taskToEdit.due_date)
  const [editReminder, setEditReminder] = useState(taskToEdit.reminder)

  const onClick = (e) => {
    e.preventDefault()

    if ( editing === true ) {
      if (!taskToEdit.title) {
        alert('Please add task name')
        return
      }
    } else {
      if (!title) {
        alert('Please add task name')
        return
      }
    }

    if (editing) {
      const id = taskToEdit.id
      onAdd({ id, editTitle, editDueDate, editReminder })
    } else {
      onAdd({ title, due_date, reminder })
    }

    setTitle('')
    setDuedate('')
    setReminder(false)
  
    setEditReminder('')
    setDuedate('')
    setReminder('')
  }

  return (
    <form>
      <div id="form-wrapper">
        <div className="flex-wrapper">
          <div style={{flex: 2, textAlign: 'left'}}>
            <label>Task:</label>
          </div>
          <div style={{flex: 5}}>
            { editing ? 
              <input className="form-control" type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} /> : 
              <input className="form-control" type="text" placeholder="Add task" value={title} onChange={(e) => setTitle(e.target.value)} /> }
          </div>
        </div>
        <div className="flex-wrapper">
          <div style={{flex: 2, textAlign: 'left'}}>
            <label>Date & Time:</label>
          </div>
          <div style={{flex: 5}}>
            { editing ? 
            <input className="form-control" type="text" value={editDueDate} onChange={(e) => setEditDueDate(e.target.value)} /> :
            <input className="form-control" type="text" placeholder="Add Date & Time" value={due_date} onChange={(e) => setDuedate(e.target.value)} />
            }
          </div>
        </div>
        <div className="flex-wrapper">
          <div style={{flex: 2, textAlign: 'left'}}>
            <label>Set Reminder:</label>
          </div>
          <div style={{flex: 5, borderColor: 'gray', textAlign:'left'}}>
            { editing ? 
            <input className="form-control-check" type="checkbox" checked={editReminder} value={reminder} onChange={(e) => setEditReminder(e.target.value)} /> :
            <input className="form-control-check" type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            }
          </div>
        </div>
        <div style={{flex: 1}}>
          <Button text='Save Task' onClick={onClick} />
        </div>
      </div>
    </form>
  )
}

export default AddForm
