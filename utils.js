const fs = require("fs");
//create folder synchronously
const createFolder = folderName =>{
    //check if folder exists
    if(!fs.existsSync(folderName)){
        //create folder
        fs.mkdirSync(folderName);
    }
};
//json content
const jsonContent='[{ "trainee":"jason routes","track":"react/laravel","provider":"google manpower"}]';
//create file
const createFile = (file)=>{
    //check if file exist
    if(!fs.existsSync(file)){
        fs.writeFileSync(file, jsonContent);
    }
};

module.exports={
    createFolder, createFile
};