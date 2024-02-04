const fs = require('fs');


function readFileContent(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (!err) {
                console.log(`File Content:\n${data}`);
            }else{
               if (err.code === 'ENOENT') {
                    console.error("Error reading file: ENOENT: no such file or directory...");
                } else {
                    console.error(`Error reading file:${err.message}`);
                }
            } 
    });
}


//Test cases
readFileContent('test-files/file1.txt');
readFileContent('test-files/empty-file.txt');
readFileContent('test-files/nonexistent-file.txt');

