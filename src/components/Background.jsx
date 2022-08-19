import React from 'react';

const Background = ( { children } ) =>
{
    return (

        <div className="bg-white dark:bg-black transition-all min-h-screen">
        {children}
        </div>
    )
}

export default Background;
