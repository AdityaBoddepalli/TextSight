import React from "react";
import { Link } from "react-router-dom";


const Nav = () => {
    return (
        <div className="flex justify-center items-center w-full h-40">
        <Link to={'/'}>
            <h1 className="text-5xl capitalize hover:scale-125 duration-150 font-medium text-gray-800">TextSight</h1>

        </Link>
        </div>
    )
}


const Container = ({ children }) => {
    return (
        <div className="h-screen w-screen overflow-hidden bg-gradient-to-r from-slate-300 to-slate-500">
            <Nav />
            <div className="flex justify-center items-center w-screen h-screen overflow-auto">
                {children}
            </div>
        </div>
    )

}
export default Container;