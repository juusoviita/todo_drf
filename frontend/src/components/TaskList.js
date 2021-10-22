import Task from "./Task"

const TaskList = ({ tasks, onDelete, onToggle, onChange, onEdit }) => {

  return (
      <div>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onChange={onChange} onEdit={onEdit} />
        ))}
      </div>
    )}

TaskList.defaultProps = {
  tasks: 'No tasks yet',
}

export default TaskList