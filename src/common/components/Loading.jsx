import React from 'react';

const Loading = () => {
    return (
        <div className="absolute top-0 left-0 w-screen h-screen">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
            <div className="push-pop relative top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;
