const db = require("../models");
const uploadFile = require("../middlewares/upload");
const fs = require("fs");

const Student_data = db.students_data;

const baseUrl = 'http://localhost:8080/api/excel/getInfo/';

const readXlsxFile = require('read-excel-file/node');

const upload = async(req, res)=>{
    try{

        // await uploadFile(req, res);

        if(req.file == undefined){
            return res.status(400).send('Please upload excel');
        }
    
        let path = __basedir + '/resources/static/assets/uploads/'+req.file.filename;

        readXlsxFile(path).then((rows)=>{
            rows.shift();
            let StudentData = [];
            rows.forEach((row) => {
                let student = {
                    // sno: row[0],
                    roll_number: row[0],
                    name: row[1],
                    father_name: row[2],
                    image: row[3],
                    finger_print: row[4],
                    date_stamp: row[5],
                    // saved: row[6],
                    fileName: baseUrl + req.file.filename
                };
                StudentData.push(student);
                console.log(student);
            });

            Student_data.bulkCreate(StudentData).then(
                ()=>{
                    res.status(200).send({
                        message: 'Excel Uploaded Successfully!  '+ req.file.originalname
                    });
                }
            ).catch(
                (error)=>{
                    res.status(500).send({
                        message: 'Failed to upload excel!  ' + req.file.originalname,
                        error: error.message
                    });
                } 
            );

        })
   
    }
    
    catch(error){
        
        res.status(500).send({
        message: 'Failed to upload excel!' + req.file.originalname
        });
    }
};

const getStudentsData = (req, res)=>{
    Student_data.findAll().then(
        (data)=>{
            res.send(data);
        }
    )
    .catch(
        (error)=>{
            res.status(500).send({
                message: error.message || 'Some Occured while uploading StudentData[]'
            })
        }
    )
}

const getUrl = (req,res) =>{
    let path = __basedir + "/resources/static/assets/uploads/";

    fs.readdir(path, function(error , excel){
        if(error){
            res.status(500).send({
                message: "Unable to get excel!",
            });
        }

        let excelInfos = [];

        if(excel)
        {
            excel.forEach((file) =>{
              excelInfos.push({
                name: file,
                url: baseUrl + file
             });
            });
            res.status(200).send(excelInfos);
        }
    });
};

const download = (req,res) =>{
    const fileName = req.params.name;
    const path = __basedir + "/resources/static/assets/uploads/";

    res.download(path + fileName, fileName, (error)=>{
        if(error){
            res.status(500).send({
                message: "Unable to Download the Excel!" + error,
            });
        }
    });
};

module.exports = {
    upload, getStudentsData, getUrl, download
};