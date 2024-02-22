const fs = require('fs');

function writeToFile(filePath, content) {
    fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error("Error writing to file: ENOENT: no such file or directory...");
            }
        } else {
            console.log(`Data written to ${filePath}`);
        }
    });
}


//Test cases
writeToFile('test-files/output.txt', '#Day2-of-30-days-of-node.js-challenges');
writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');





