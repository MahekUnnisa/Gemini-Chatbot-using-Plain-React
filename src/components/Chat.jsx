import React, { useState } from 'react'
import { getResponse } from '../utils/api'
import Response from './Response'
import Loader from './Loader'

const Chat = () => {
    const [query, setQuery] = useState("")
    const [response, setResponse] = useState("")
    const [chat, setChat] = useState([])
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSendQuery = async () => {
        setLoading(true);
        const response = await getResponse(query);
        setResponse(response);
        setQuery("");
        setLoading(false);
    }


    const handleKeydown = async (e) => {
        if (e.key === "Enter") {
            handleSendQuery();
        }
    }

    return (
        <div className="chat_container">
            <div className="chat_queries">

            </div>
            {loading == true ? (
                <div className="loader_container">
                    <Loader />
                </div>
            ) : (
                response ? (
                    <Response response={response} />
                ) : (
                    <><p>Something went wrong?</p></>
                )
            )
            }
            <div className="input_container">
                <input type="text"
                    placeholder='Message Gemini'
                    onChange={handleInputChange}
                    onKeyDown={handleKeydown}
                    value={query} />
                <button onClick={handleSendQuery}>Send</button>
            </div>
        </div>
    )
}

export default Chat