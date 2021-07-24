const mongoose = require("mongoose");
const Student = mongoose.model("Student");


module.exports.getallstudents = function(req,res){

    console.log("yessssssshhhhhhhh")

    console.log("getall students");
    let count =6;
    let offset = 0;
    
    if(require.query && require.query.count){
        count = parseInt(req.query.count, 10);
    
    }
    
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({ "message": "Querystring offset " });
        return;
    }

    Student.find().skip(offset).limit(count).exec(function(err, Students){
        const response = {
            status: 200,
            message: Students
        };
        if(err) {
            console.log("Error finding students", err);
            
            response.status = 500;
            response.message = err;
        }    
       
        res.status(response.status).json(response.message);
   
    });
}

module.exports.addOneStudent = function (req, res) {
   
    const newStudent = {
        name: req.body.name,
        gpa: parseFloat(req.bpdy.gpa)

    }
    Student.create(newStudent,function (err, student) {
        const response = {
                status: 201,
                message: student
            };
        if (err) {
            response.status = 400;
            response.message = err;
        } 
        res.status(response.status).json(response.message);
    });

};

module.exports.deleteOneStudent = function (req, res) {

    const studentId = req.params.studentId;
   
    Student.findByIdAndRemove(studentId).exec(function(err, Student) {

            let response= {
                status:201,
                message:Student
            }
            if(err) {
                response.status=500;
                response.message=err;
               
            } if(!Student){
          
            response.status=400;
            response.message="Student no found";

            }

            res.status(response.status).json(response.message);
        });
};



    




