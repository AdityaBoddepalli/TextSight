import React, { useState } from "react";
import Container from "./Container";
import Card from "./Card";

const TranslateTool = () => {

    const [from, setFrom] = useState('');
    const [lang, setLang] = useState('');
    const [text, setText] = useState('');
    const [apiResponse, setApiResponse] = useState(null);
    const [output, setOutput] = useState('')

    const changeLang = (x) => {
        if (x.target.value.length <= 20) {
            setLang(x.target.value);
        }
    }
    const changeFrom = (x) => {
        if (x.target.value.length <= 20) {
            setFrom(x.target.value);
        }
    }
    const changeText = (x) => {
        if (x.target.value.length <= 500) {
            setText(x.target.value);
        }
    }

    const translateText = async () => {
        const endpoint = process.env.REACT_APP_TRANSLATE_ENDPOINT;
        const payload = {
            from: from,
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
                setApiResponse({ error: "Sorry, something went wrong while translating" });
                return;
            }
            const data = await response.json();
            setApiResponse(data);
            setOutput(data.message);
            console.log(data.message);
        } catch (error) {
            console.error("Error sending text for translation")
        }
    }


    return (
        <>
            <p className="text-xl font-semibold px-2 mt-3 mb-4">
                Choose a source language, a target language and enter text for translation. Leave the Source Language empty to auto detect.
            </p>
            <div className="flex flex-col justify-around items-center text-xl space-y-7">
                <div className="grid grid-cols-4 gap-4 items-center w-full">
                    <label htmlFor="from" className="font-bold text-right">Source Language:</label>
                    <textarea id="from" placeholder="Enter the language to translate from (max: 20 char)" value={from} rows={1} onChange={changeFrom} maxLength={20} className="col-span-3 p-2 text-white text-base mr-10 bg-gray-600 placeholder-gray-300 focus:border-blue-600" />
                </div>
                <div className="grid grid-cols-4 gap-4 items-center w-full">
                    <label htmlFor="lang" className="font-bold text-right">Target Language:</label>
                    <textarea id="lang" placeholder="Enter the language to translate into (max: 20 char)" value={lang} rows={1} onChange={changeLang} maxLength={20} className="col-span-3 p-2 text-white text-base mr-10 bg-gray-600 placeholder-gray-300 focus:border-blue-600" />
                </div>
                <div className="grid grid-cols-4 gap-4 items-center w-full">
                    <label htmlFor="text" className="font-bold text-right">Text:</label>
                    <textarea id="text" placeholder="Enter some text to translate (max: 500 char)" value={text} rows={4} onChange={changeText} maxLength={500} className="col-span-3 p-2 text-white text-base mr-10 bg-gray-600 placeholder-gray-300 focus:border-blue-600" />
                </div>
                <button onClick={translateText} className="md:w-1/3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Translate
                </button>
                
                {apiResponse && <div className="grid grid-cols-4 gap-4 items-center w-full">
                    <label className="font-bold text-right">Translated Text:</label>
                    <textarea
                        className="col-span-3 mr-10 mt-5 block p-2 text-white text-base bg-gray-600"
                        value={output}
                        rows={3}
                        readOnly
                    />
                </div>}
            </div>
        </>
    );
};


const Translate = () => {
    return (
        <Container>
            <Card className="h-4/5 w-3/5 -mt-56 pt-10 shadow-gray-700 text-5xl from-lime-200 to-emerald-200">
                <TranslateTool />
            </Card>
        </Container>
    )
}

export default Translate;