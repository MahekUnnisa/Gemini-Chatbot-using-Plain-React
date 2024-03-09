import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/models/gemini-pro:generateContent`
const API_KEY = process.env.REACT_APP_API_KEY

const getFormattedJsonInput = async (query, chats) => {
    const contents = chats.map(chat => {
        return [
            {
                role: 'user',
                parts: [{ text: chat.query }]
            },
            {
                role: 'model',
                parts: [{ text: chat.response }]
            }
        ];
    }).flat();

    await contents.push({
        role: 'user',
        parts: [{ text: query }]
    });

    const data = JSON.stringify({ contents });
    return data
}

export const getResponse = async (query, chats) => {
    try {
        var data = await getFormattedJsonInput(query, chats);
        var headers = {
            'x-goog-api-key': API_KEY,
            'Content-Type': 'application/json',
        }
        var response = await axios.post(API_URL, data, {
            headers: headers
        })

        return response.data.candidates[0].content.parts[0].text
    }
    catch (error) {
        console.error(error)
    }
}