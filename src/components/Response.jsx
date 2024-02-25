import React from 'react'

const Response = (props) => {
    const { response } = props
    return (
        <div className="response_container">
            <p>{response}</p>
        </div>
    )
}

export default Response