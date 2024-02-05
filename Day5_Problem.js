const path = require('path');

function checkFileExtension(filePath, expectedExtension) {
    // Implementation
    const actualExtension = path.extname(filePath);
    if (actualExtension === expectedExtension) {
        console.log("File has the expected extension: .txt");
    } else {
        console.log(`File does not have the expected extension. Expected: ${expectedExtension}, Actual: ${actualExtension}`);
    }
}


//Testcase 
checkFileExtension('test-files/file1.txt', '.txt');
checkFileExtension('test-files/image.png', '.jpg');
