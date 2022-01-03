const Button = ({ callback, text }) => {
  return <button onClick={() => callback()}>{text}</button>
}

export default Button
