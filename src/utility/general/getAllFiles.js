import fs from 'fs';
import path from 'path';

export default {
    getAllFiles: (dirPath, arrayOfFiles) => {
        const files = fs.readdirSync(dirPath)

        arrayOfFiles = arrayOfFiles || [];

        files.forEach(function (file) {
            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                arrayOfFiles = exports.default.getAllFiles(dirPath + '/' + file, arrayOfFiles)
            } else {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        })

        return arrayOfFiles
    }
}