import React from "react";


const Nav = () => {
    return (
        <div className="flex justify-center items-center w-full h-40">
            <h1 className="text-5xl font-medium text-gray-800">TextSight</h1>
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