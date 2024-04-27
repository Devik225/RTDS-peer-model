const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { spawn } = require('child_process');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// absolute path to the Python executable
const pythonExecutable = 'C:\\Users\\Ambuj\\AppData\\Local\\Programs\\Python\\Python311\\python.exe';

wss.on('connection', (ws) => {
    console.log('Client connected');

    const childPython = spawn(pythonExecutable, ['-u', 'rtds.py']);

    childPython.stdout.on('data', (data) => {
        ws.send(data.toString());
    });

    childPython.stderr.on('data', (error) => {
        console.error(`stderr: ${error}`);
    });

    childPython.on('close', (code) => {
        console.log(`child process exited with code: ${code}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        childPython.kill();
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
