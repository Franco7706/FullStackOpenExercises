const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const text = message.text
  const error = message.error
  const colorNotification = error === true ? 'red' : 'green'
  const messageStyle = {
    color: colorNotification,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div style={messageStyle}>
      <p>
        {text}
      </p>
    </div>
  )
}

export default Notification