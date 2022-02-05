import React from 'react'

import { connect } from 'react-redux'
// refactored
// import { useSelector } from 'react-redux'

// NOTE
// went back in time to use connect instead of the modern way just to learn it.
const Notification = (props) => {
  // refactored
  // const message = useSelector(({ message }) => message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return props.message && <div style={style}>{props.message}</div>
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
