import Query from './Query'
import Loader from './Loader'
import Response from './Response'
import { getResponse } from '../utils/api'
import React, { useEffect, useState } from 'react'

const Chat = () => {
    const [query, setQuery] = useState("")
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSendQuery = async () => {
        setLoading(true);
        try {
            const newQuery = query;
            const newMessage = { id: Date.now(), query: newQuery, response: '' };
            const response = await getResponse(query, chats);
            newMessage.response = response;
            setQuery("");
            setChats([...chats, newMessage]);
            const updatedChats = [...chats];
            updatedChats.push(newMessage);
            setChats(updatedChats);

            localStorage.setItem('chats', JSON.stringify(updatedChats));

            setQuery("");
        } finally {
            setLoading(false);
        }
    }

    const handleKeydown = async (e) => {
        if (e.key === "Enter") {
            handleSendQuery();
        }
    }
    useEffect(() => {
        const allChats = localStorage.getItem('chats')
        if (allChats) {
            setChats(JSON.parse(allChats))
        }
    }, [])

    return (
        <div className="chat_container">
            {chats.length !== 0 ? (
                chats.map((chat) => (
                    <li key={chat.id} className="chat_item">
                        <Query query={chat.query} />
                        <Response response={chat.response} />
                    </li>
                ))
            ) : (
                <p className="no__chats_header">__Gemini__</p>
            )}
            <div className="input_container">
                <input
                    type="text"
                    placeholder="Message Gemini"
                    onChange={handleInputChange}
                    onKeyDown={handleKeydown}
                    value={query}
                />
                <button onClick={handleSendQuery}>
                    {loading ? (
                        <Loader />
                    ) : (
                        'Send'
                    )}
                </button>
            </div>
        </div>
    );
}

export default Chat