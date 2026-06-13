// Problem Description – Sum File Sizes
//
// You are given an array of file paths. Your task is to implement a function
// that returns the total size of all these files in bytes.
//
// Requirements:
// 1. Use fs.promises.stat() to get file information.
// 2. Return the sum of `size` property of all files.
// 3. Handle cases where a file might not exist (optional: you can let it throw or return 0).
// 4. Tasks should ideally be performed in parallel for efficiency.

const fs = require("fs").promises;

async function sumFileSizes(filePaths) {
    try{
        const promises=filePaths.map(file=>fs.stat(file));
        const data=await Promise.all(promises);
        let sum=0;
        for(size in data){
            sum+=size;
        }
        return sum;
    }catch(err){
        return err;
    }
}

module.exports = sumFileSizes;
