const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const Routes = require("./app/routes/studentexcel.routes")
global.__basedir = __dirname + "/";


// db.sequelize.sync({force: true}).then(()=>{
//     console.log("Dropping and Resynching Database")
// });

var corsOptions = {
   origin: "http://localhost:8081" 
}; 
 
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));
 
app.use(express.urlencoded({extended: true}));
Routes(app);

require("./app/routes/student_data.routes")(app);

 const db = require("./app/models");

db.sequelize.sync();
// db.sequelize.sync({force: true}).then(()=>{
//     console.log("Dropping and Resynching Database")
// });

app.get("/", (req, res)=>{
    res.json({
        message: "Welcome to our application"
    });
});
 


const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

 