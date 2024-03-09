import React from 'react'
import ReactMarkdown from 'react-markdown'

const MarkdownToHTML = (props) => {
    const { response } = props
    return (
        <ReactMarkdown>{response}</ReactMarkdown>
    )
}

export default MarkdownToHTML