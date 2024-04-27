import React, { useState } from 'react';

const MyComponent = () => {
    const [data, setData] = useState('');
    const [connected, setConnected] = useState(false);
    let socket;

    const connectWebSocket = () => {
        socket = new WebSocket('ws://localhost:5000'); // Adjust the URL accordingly

        socket.onopen = () => {
            console.log('WebSocket connected');
            setConnected(true);
        };

        socket.onmessage = (event) => {
            setData(prevData => prevData + event.data); // Append new data to previous data
        };

        socket.onclose = () => {
            console.log('WebSocket closed');
            setConnected(false);
        };
    };

    const disconnectWebSocket = () => {
        if (socket) {
            socket.close();
            setConnected(false);
        }
    };

    return (
        <div>
            <h1>Data fetched from Python script:</h1>
            <button onClick={connected ? disconnectWebSocket : connectWebSocket}>
                {connected ? 'Disconnect' : 'Connect'}
            </button>
            <pre>{data}</pre>
        </div>
    );
};

export default MyComponent;
