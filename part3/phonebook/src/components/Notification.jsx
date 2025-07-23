const Notification = ({message:{text:text,error:error}}) => {
    if(text===null)
        return null

    const colorNotification=error===true ? 'red':'green'
    const messageStyle={
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