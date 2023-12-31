import React, { useState } from "react";
import Container from "./Container";
import Card from "./Card";
import { Link } from "react-router-dom";

const SentimentTool = () => {

    const [text, setText] = useState('');

    const changeText = (x) => {
        if (x.target.value.length <= 500) {
            setText(x.target.value);
        }
    }

    const analyzeText = async () => {
        const endpoint = process.env.REACT_APP_API_ENDPOINT;
        const payload = {
            text: text
        };

        try {
           const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
           });
        } catch (error) {
            console.error("Error sending text for analysis")
        }
    }

    return (
        <>
            <p className="text-xl font-semibold px-1 mb-3">
                Enter a sentence you would like to analyze.
            </p>
            <div className="flex flex-col justify-around items-center text-xl space-y-4">
                <textarea placeholder="Enter some text to analyze (max: 500 char)" value={text} rows={4} onChange={changeText} maxLength={500} className="block p-2 w-1/2 text-white text-base bg-gray-600 placeholder-gray-300 focus:border-blue-600" />
                <Link to={"/"} className="md:w-1/3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Analyze
                </Link>
            </div>
        </>
    );
};


const Sentiment = () => {
    return (
        <Container>
            <Card className="h-2/3 w-3/5 -mt-56 pt-10 shadow-gray-700 text-5xl from-orange-200 to-red-200">
                <SentimentTool />
            </Card>
        </Container>
    )
}

export default Sentiment;