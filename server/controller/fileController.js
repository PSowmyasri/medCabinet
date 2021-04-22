const fs = require('fs');
const medFiles = require('../models/medFiles')
const addFolder = async (req, res) => {
    try {
        console.log(req.files);
        console.log(req.fields);
        console.log(req.body);
        const { addedBy, folderName, description , files} = req.body;
        const test = new medFiles({
            addedBy,
            folderName,
            description,
            files
        });
        // const { addedBy, folderName, description , fileName, fileType,content} = req.body;
        // const test = new medFiles({
        //     addedBy,
        //     folderName,
        //     description,
        //     files :[{
        //         name : fileName,
        //         fileType,
        //         // content : fs.readFileSync(content)
        //         content : content
        //     }]
        // });
        console.log(test);
        const savedFile = await test.save();
        console.log(savedFile);
        res.json(test._id);
        // res.status(201).json({ message: "new file added" });
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
        console.log(folders);
        res.json(folders);
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

const addFile = async (req, res) => {
   try{
       console.log(req.params);
        const file = await medFiles.findOneAndUpdate({_id : req.params.id},
            {$push : {files : req.body.files}},
            {upsert : true },
            );
        console.log(file);
        res.status(201).json({message : "File added successfully"});
   }
   catch(err){
       console.log(err);
       res.status(500).send();
   }
}


module.exports = { addFile, getFiles, addFolder };