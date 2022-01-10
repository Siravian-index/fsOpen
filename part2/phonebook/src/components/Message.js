import '../index.css'
const Message = ({ messageInfo }) => {
  const style = messageInfo.style === 'red' ? 'error' : 'success'
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
