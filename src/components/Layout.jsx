import React from 'react';
import Nav from "./Nav";
import Toggle from "./ThemeToggle";

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