import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/models/gemini-pro:generateContent`
const API_KEY = process.env.REACT_APP_API_KEY

export const getFormattedJsonInput = (query) => {
    var data = JSON.stringify({
        "contents": [
            {
                "role": "user",
                "parts": [
                    {
                        "text": query
                    }
                ]
            }
        ]
    });

    return data
}

export const getResponse = async (query) => {
    try {
        var data = await getFormattedJsonInput(query);
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