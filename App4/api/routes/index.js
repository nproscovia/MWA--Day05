const express = require("express");
const controllerStudents = require("../controllers/student.controllers");

console.log("here")
const router = express.Router();


router.route("/students")
      .get(controllerStudents.getallstudents)
      .post(controllerStudents.addOneStudent);

     
router.route("/students/:studentId")
      
      .delete(controllerStudents.deleteOneStudent);
      
    module.exports = router;  









    


    
