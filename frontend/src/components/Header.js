import Button from "./Button"

const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header>
      <h1>{title}</h1>
      <Button text={showAdd ? 'Hide Form' :  'Add Task'} onClick={onAdd} />
    </header>
  )
}

Header.defaultProps = {
  title: 'Todo Tracker',
}

export default Header
