import React from 'react';
import Nav from "./Nav";

const Layout = ({children}) => {
    return (
        <div className="dark:bg-gray-700">
            <Nav/>
            <div className={"container mx-auto"}>
                {children}
            </div>
        </div>
    );
};

export default Layout;