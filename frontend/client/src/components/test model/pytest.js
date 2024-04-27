const { spawn } = require('child_process');

const pythonExecutable = 'C:\\Users\\Ambuj\\AppData\\Local\\Programs\\Python\\Python311\\python.exe';
const childPython = spawn(pythonExecutable, ['-u', 'rtds.py']);

childPython.stdout.on('data', (data) => {
    console.log(data.toString());
});

childPython.stderr.on('data', (error) => {
    console.error(`stderr: ${error}`);
});

childPython.on('close', (code) => {
    console.log(`child process exited with code: ${code}`);
});