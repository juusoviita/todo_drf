import Task from "./Task"
import { useDrop } from 'react-dnd'
import { ItemTypes } from "./Items"

const TaskList = ({ tasks, onDelete, onToggle, onChange, onEdit }) => {
  
  const[{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: monitor => ({
        isOver: !!monitor.isOver(),
    })
  })

  return (
      <div ref={drop}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onChange={onChange} onEdit={onEdit} />
        ))}
      </div>
    )}

TaskList.defaultProps = {
  tasks: 'No tasks yet',
}

export default TaskList