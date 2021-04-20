const fs = require('fs');
const medFiles = require('../models/medFiles')
const addFile = async (req, res) => {
    try {
        console.log(req.body);
        const { addedBy, folderName, description, files } = req.body;
        console.log("addedBy" + addedBy);
        console.log("folderName" + folderName);
        console.log("descroiption" + description);
        console.log(files);
        // console.log(content);
        // let image ;
        // if(content){
        //     image = fs.readFileSync(content);
        // }
        const test = new medFiles({
            addedBy,
            folderName,
            description,
            files
        });
        console.log(test);
        const savedFile = await test.save();
        console.log(savedFile);
        res.status(201).json({ message: "new file added" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

// used to get all the folders/files for a specific user
const getFiles = async (req, res) => {
    try {
        const folders = await medFiles.find({ addedBy: req.params.addedby });
        res.json(folders);
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

module.exports = { addFile, getFiles };