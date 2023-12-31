import React, { useState } from "react";
import Container from "./Container";
import Card from "./Card";
import { Link } from "react-router-dom";

const TranslateTool = () => {

    const [lang, setLang] = useState('');
    const [text, setText] = useState('');
    const [apiResponse, setApiResponse] = useState(null);

    const changeLang = (x) => {
        if (x.target.value.length <= 20) {
            setLang(x.target.value);
        }
    }
    const changeText = (x) => {
        if (x.target.value.length <= 500) {
            setText(x.target.value);
        }
    }

    const translateText = async () => {
        const endpoint = process.env.REACT_APP_API_ENDPOINT;
        const payload = {
            lang: lang,
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
                setApiResponse({error: "Sorry, something went wrong while translating"});
                return;
            }
            const data = await response.json();
            setApiResponse(data);
        } catch (error) {
            console.error("Error sending text for translation")
        }
    }


    return (
        <>
            <p className="text-xl font-semibold px-1 mb-3">
                Choose a language to translate into and enter your text. The language you are translating from will be detected automatically.
            </p>
            <div className="flex flex-col justify-around items-center text-xl space-y-4">
                <textarea placeholder="Enter the language to translate into (max: 20 char)" value={lang} rows={1} onChange={changeLang} maxLength={20} className="block p-2 w-1/2 text-white text-base bg-gray-600 placeholder-gray-300 focus:border-blue-600" />
                <textarea placeholder="Enter some text to translate (max: 500 char)" value={text} rows={4} onChange={changeText} maxLength={500} className="block p-2 w-1/2 text-white text-base bg-gray-600 placeholder-gray-300 focus:border-blue-600" />
                <Link to={"/"} className="md:w-1/3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Translate
                </Link>
                <p>
                    {apiResponse}
                </p>
            </div>
        </>
    );
};


const Translate = () => {
    return (
        <Container>
            <Card className="h-2/3 w-3/5 -mt-56 pt-10 shadow-gray-700 text-5xl from-lime-200 to-emerald-200">
                <TranslateTool />
            </Card>
        </Container>
    )
}

export default Translate;