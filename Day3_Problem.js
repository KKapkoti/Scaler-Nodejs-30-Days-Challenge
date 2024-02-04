const { exec } = require('child_process');

function executeCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }

        console.log(`Command Output:\n${stdout}`);
    });
}


//Test case
executeCommand('echo File1.txt && echo File2.txt');






