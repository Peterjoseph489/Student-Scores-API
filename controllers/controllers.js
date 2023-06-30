const studentModel = require('../models/model.js')
const mongoose = require('mongoose')


// Creating new student
const newStudent = async (req, res)=>{
    try {
        const data = {
            name: req.body.name,
            score: req.body.score
        }
        const student = await studentModel.create(data)
        if(!student){
            res.status(404),json({
                message: "Student could not be created"
            })
        } else {
            res.status(201).json({
                message: 'Student created',
                data: student
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Getting all students
const getAllStudents = async (req, res)=>{
    try{
        const students = await studentModel.find()
        console.log(students)
        if(students.length == 0) {
            return res.status(400).json({
                message: 'Students not found'
            })
        } else {
            return res.status(200).json({
                message: 'Students found',
                data: students,
                size: students.length
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// Getting single student
const getStudent = async (req, res)=>{
    try{
        const student = await studentModel.findById(req.params.id)
        if(!student) {
            return res.status(400).json({
                message: 'Student not found'
            })
        } else {
            return res.status(200).json({
                message: 'Student found',
                data: student
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// Updating single student
const updateStudent = async (req, res)=>{
    try{
        const student = await studentModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!student) {
            return res.status(400).json({
                message: 'Student not found or cannot be created at the moment'
            })
        } else {
            return res.status(200).json({
                message: 'Student updated',
                data: student
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// Deleting single student
const deleteStudent = async (req, res)=>{
    try{
        const student = await studentModel.findByIdAndDelete(req.params.id)
        if(!student) {
            return res.status(400).json({
                message: 'Student not found or cannot be deleted at the moment'
            })
        } else {
            return res.status(200).json({
                message: 'Student deleted',
                data: student
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// Getting the student with the highest score from the database in descending order of preference
const highestStudent = async (req, res)=>{
    try{
        const students = await studentModel.find().sort({score: -1})
        if(!students) {
            return res.status(400).json({
                message: 'Students not found'
            })
        } else {
            return res.status(200).json({
                message: 'Students found',
                data: students,
                size: students.length
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


// Getting the student with the highest score from the database in asscending order of preference
const lowestStudent = async (req, res)=>{
    try{
        const students = await studentModel.find().sort({score: 1})
        if(!students) {
            return res.status(400).json({
                message: 'Students not found'
            })
        } else {
            return res.status(200).json({
                message: 'Students found',
                data: students,
                size: students.length
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


// get students with a score greater than a specified value
const specifiedScore = async (req, res)=>{
    try{
        // const students = await studentModel.find({score: {$gt: req.params.score}})
        const value = parseInt(req.params.score)
        const students = await studentModel.find().where("score").gt(value)
        if(!students) {
            return res.status(400).json({
                message: 'Students not found'
            })
        } else {
            return res.status(200).json({
                message: 'Students found',
                data: students,
                size: students.length
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// Get documents sorted by name in ascending order
const sortByName = async (req, res)=>{
    try{
        const students = await studentModel.find().sort({name: 1})
        if(!students) {
            return res.status(400).json({
                message: 'Students not found'
            })
        } else {
            return res.status(200).json({
                message: 'Students found',
                data: students,
                size: students.length
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


// Getting documents with names starting with a specified letter
const searchByNamePrefix = async (req, res)=>{
    try{
        const students = await studentModel.find({name: {$regex: req.params.name, $options: 'i'}})
        if(!students) {
            return res.status(400).json({
                message: 'Students not found'
            })
        } else {
            return res.status(200).json({
                message: 'Students found',
                data: students,
                size: students.length
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// Get the average score of all students 
const averageScores = async (req, res)=>{
    try{
        const students = await studentModel.aggregate([
            {
                $group: {
                    _id: '$name',
                    averageScore: {$avg: '$score'}
                }
            }
        ])
        if(!students) {
            return res.status(400).json({
                message: 'Students not found'
            })
        } else {
            return res.status(200).json({
                message: 'Students found',
                data: students,
                size: students.length
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// Get students with scores within a specified range
const specifiedRange = async (req, res)=>{
    try{
        // const students = await studentModel.find({score: {$gte: req.params.min, $lte: req.params.max}})
        const min = parseInt(req.params.min)
        const max = parseInt(req.params.max)
        const students = await studentModel.find({score: {$gte: min, $lte: max}})
        if(!students) {
            return res.status(400).json({
                message: 'Students not found'
            })
        } else {
            return res.status(200).json({
                message: 'Students found',
                data: students,
                size: students.length
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// Get the sum of all scores
const sumScores = async (req, res)=>{
    try{
        const students = await studentModel.aggregate([
            {
                $group: {
                    _id: '$name',
                    sumScore: {$sum: '$score'}
                }
            }
        ])
        if(!students) {
            return res.status(400).json({
                message: 'Students not found'
            })
        } else {
            return res.status(200).json({
                message: 'Students found',
                data: students,
                size: students.length
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


// Changing the scores of all students to a particular score at once
const changeScore = async (req, res)=>{
    try{
        const student = await studentModel.findByIdAndUpdate(req.params.id, {$set: {score: req.params.score}})
        if(!student) {
            return res.status(400).json({
                message: 'Student not found or cannot be updated at the moment'
            })
        } else {
            return res.status(200).json({
                message: 'Student updated',
                data: student
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// Get students with names in uppercase
const upperNames = async (req, res)=>{
    try{
        // const students = await studentModel.find({name: {$regex: req.params.name, $options: 'i'}})
        const students = await studentModel.find().select('name');
        const uppercaseNames = students.map(doc=>doc.name.toUppercase());
        if(!uppercaseNames) {
            return res.status(400).json({
                message: 'Students not found'
            })
        } else {
            return res.status(200).json({
                message: 'Students found',
                data: students,
                size: students.length
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// Get the first document in the collection 
const firstStudent = async (req, res)=>{
    try{
        // const students = await studentModel.findOne()
        const students = await studentModel.find().limit(1)
        if(!students) {
            return res.status(400).json({
                message: 'Students not found'
            })
        } else {
            return res.status(200).json({
                message: 'Students found',
                data: students,
                size: students.length
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// Get the last document in the collection
const lastStudent = async (req, res)=>{
    try{
        const students = await studentModel.find().limit(-1)
        if(!students) {
            return res.status(400).json({
                message: 'Students not found'
            })
        } else {
            return res.status(200).json({
                message: 'Students found',
                data: students,
                size: students.length
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// Get students sorted by score in descending order
const highestScore = async (req, res)=>{
    try{
        const students = await studentModel.find().sort({score: -1})
        if(!students) {
            return res.status(400).json({
                message: 'Students not found'
            })
        } else {
            return res.status(200).json({
                message: 'Students found',
                data: students,
                size: students.length
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}



module.exports = {
    newStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    highestStudent,
    lowestStudent,
    specifiedScore,
    sortByName,
    searchByNamePrefix,
    averageScores,
    specifiedRange,
    sumScores,
    upperNames,
    firstStudent,
    lastStudent,
    highestScore
}