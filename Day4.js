const path = require('path');


function resolvePath(relativePath) {
    console.log(path.resolve(relativePath));
}


//Test cases
resolvePath('../project/folder/file.txt');
resolvePath('nonexistent-folder/file.txt');
