import React from 'react'

const Query = (props) => {
    const { query } = props
    return (
        <div className="query_container">
            <p>{query}</p>
        </div>
    )
}

export default Query