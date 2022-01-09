import '../index.css'
const Message = ({ messageInfo }) => {
  const style = messageInfo.style === 'red' ? 'error' : 'success'
  console.log(style)
  return (
    <>
      {messageInfo.show && (
        <div className={`${style}`}>
          <p>{messageInfo.msg}</p>
        </div>
      )}
    </>
  )
}

export default Message
