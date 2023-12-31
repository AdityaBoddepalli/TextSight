import React from "react";
import Container from "./Container";
import Card from "./Card";
import { Link } from "react-router-dom";

const Info = () => {
    return (
        <>
            <p className="text-3xl 2xl:text-4xl font-semibold px-1 mb-8">
                TextSight is a serverless NLP tool that can translate and analyze sentiment.
            </p>
            <div className="flex flex-col justify-around items-center text-2xl 2xl:text-4xl space-y-4">
                <Link to={"/translate"} className="md:w-1/3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Translate
                </Link>
                <Link to={"/sentiment"} className="md:w-1/3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Analyze Sentiment
                </Link>
            </div>
        </>
    );
};


const Home = () => {
    return (
        <Container>
            <Card className="h-2/3 w-3/5 -mt-56 pt-32 shadow-gray-700 text-5xl from-blue-200 to-cyan-200">
                <Info />
            </Card>
        </Container>
    )
}

export default Home;