import { useDrag } from 'react-dnd'
import { FaTimes } from 'react-icons/fa'
import { ItemTypes } from './Items'
import Button from "./Button"
 
const Task = ({task, onDelete, onToggle, onChange, onEdit}) => {

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    })
  })

  return (
    <div ref={drag} className={`task-wrapper flex-wrapper ${task.reminder && 'task-reminder' } ${task.completed && 'task-completed' }`} onDoubleClick={() => onToggle(task.id)}>
      <div className={`${task.completed && 'strike-through'}`} style={{flex: 7, textAlign: 'left'}}>{ task.title }</div>
      <div style={{flex: 3, textAlign: 'center'}}>{ task.due_date }</div>
      <div style={{flex: 1}} className="task-checkbox">
        <input type="checkbox" onChange={() => onChange(task.id)} checked={task.completed} style={{cursor: 'pointer'}}></input>
      </div>
      <div style={{flex: 1}}>
        { task.completed === false ? <Button text='Edit' onClick={() => onEdit(task)} /> : '' }
      </div>
      <div style={{flex: 1}}><FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)}/></div>
    </div>
  )
} 

export default Task
