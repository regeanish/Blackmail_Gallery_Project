var express = require("express");
var multer = require("multer");
var app = express();
var abs_file_name;
app.use(express.static("."));
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './img/large');
    },
    filename: function (req, file, callback) {
        var f_type = file.mimetype.split("/")[1];
        console.log(f_type);
        //callback(null, file.fieldname+'-'+Date.now()+'.'+f_type);
        var f = file.fieldname+'-'+Date.now()+'.'+f_type;
        callback(null, f);
        console.log(file);
        //abs_file_name = "img/large/"+file.fieldname+'-'+Date.now()+'.'+f_type;
        abs_file_name = "img/large/"+f;
    }
});
var upload = multer({storage:storage}).single('userphoto');

app.get('/', function(req,res){
   res.sendFile(__dirname+"/index.html"); 
});

app.post('/api/photo', function(req,res){
    upload(req,res,function(err){
        if(err){
            return res.end("Error uploading file.");
        }
        res.send(abs_file_name);
        
    });
});

app.listen(5000, function(){
    console.log("Working on port 5000");
});