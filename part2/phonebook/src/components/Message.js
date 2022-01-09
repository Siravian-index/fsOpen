const Message = ({ messageInfo }) => {
  return (
    <>
      {messageInfo.show && (
        <div>
          <p>{messageInfo.msg}</p>
        </div>
      )}
    </>
  )
}

export default Message
