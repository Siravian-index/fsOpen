const Button = ({ callback, text, setState }) => {
  return <button onClick={() => callback(setState)}>{text}</button>
}

export default Button
