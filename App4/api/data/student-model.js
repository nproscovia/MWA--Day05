const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gpa: {
        type: Number   
    }, 

})


mongoose.model("Student", studentSchema, "Students");