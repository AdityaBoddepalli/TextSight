import React, { useState } from "react";
import Container from "./Container";
import Card from "./Card";

const SentimentTool = () => {

    const [text, setText] = useState('');
    const [apiResponse, setApiResponse] = useState(null);
    const [polarity, setPolarity] = useState('');
    const [subjectivity, setSubjectivity] = useState('');

    const changeText = (x) => {
        if (x.target.value.length <= 500) {
            setText(x.target.value);
        }
    }

    const analyzeText = async () => {
        const endpoint = process.env.REACT_APP_SENTIMENT_ENDPOINT;
        console.log(endpoint);
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

            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
                setApiResponse({ error: "Sorry, something went wrong while translating" });
                return;
            }
            const data = await response.json();
            setApiResponse(data);
            setPolarity(data.message.polarity);
            setSubjectivity(data.message.subjectivity);
        } catch (error) {
            console.error("Error sending text for analysis");
            console.log(error)
            console.log(`here is the endpoing; ${endpoint}`);
        }
    }

    return (
        <>
            <p className="text-xl font-semibold px-2 mt-3 mb-4">
                This tool analyzes your sentence for 2 metrics, Polarity and Subjectivity. Polarity ranges from -1.0 (extremely negative) to 1.0 (extremely positive) with 0.0 being neutral. Subjectivity ranges from 0.0 (completely objective or factual) to 1.0 (highly subjective)
            </p>
            <div className="flex flex-col justify-around items-center text-xl space-y-7">
                <div className="grid grid-cols-4 gap-4 items-center w-full">
                    <label htmlFor="text" className="font-bold text-right">Sentence:</label>
                    <textarea id="text" placeholder="Enter a sentence to analyze (max: 500 char)" value={text} rows={4} onChange={changeText} maxLength={500} className="col-span-3 p-2 text-white text-base mr-10 bg-gray-600 placeholder-gray-300 focus:border-blue-600" />
                </div>

                <button onClick={analyzeText} className="md:w-1/3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Analyze
                </button>

                {apiResponse && <div className="grid grid-cols-4 gap-4 items-center w-full">
                    <label className="font-bold text-right">Polarity</label>
                    <textarea
                        className="col-span-3 mr-10 mt-5 block p-2 text-white text-base bg-gray-600"
                        value={polarity}
                        rows={1}
                        readOnly
                    />
                </div>}
                {apiResponse && <div className="grid grid-cols-4 gap-4 items-center w-full">
                    <label className="font-bold text-right">subjectivity</label>
                    <textarea
                        className="col-span-3 mr-10 mt-5 block p-2 text-white text-base bg-gray-600"
                        value={subjectivity}
                        rows={1}
                        readOnly
                    />
                </div>}

            </div>
        </>
    );
};


const Sentiment = () => {
    return (
        <Container>
            <Card className="h-4/5 w-3/5 -mt-56 pt-10 shadow-gray-700 text-5xl from-orange-200 to-red-200">
                <SentimentTool />
            </Card>
        </Container>
    )
}

export default Sentiment;