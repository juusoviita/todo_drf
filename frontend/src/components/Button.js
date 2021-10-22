import PropTypes from 'prop-types'

const Button = ({ text, onClick }) => {

  return (
    <button onClick={onClick} className="btn btn-warning" name="Add">{text}</button>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
