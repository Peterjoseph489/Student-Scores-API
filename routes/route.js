const {
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
} = require('../controllers/controllers')
const express = require('express');
const router = express.Router();

router.post('/students', newStudent)
router.get('/students', getAllStudents)
router.get('/students/:id', getStudent)
router.put('/students/:id', updateStudent)
router.delete('/students/:id', deleteStudent)
router.get('/studentsHighest', highestStudent)
router.get('/students/lowest', lowestStudent)
router.get('/students/:id/:score', specifiedScore)
router.get('/studentsName', sortByName)
router.post('/students/name/:i', searchByNamePrefix)
router.get('/students/average/score', averageScores)
router.get('/students/range', specifiedRange)
router.get('/students/sum', sumScores)
router.get('/students/upper', upperNames)
router.get('/students/first', firstStudent)
router.get('/students/last', lastStudent)
router.get('/students/highest/score', highestScore)


module.exports = router;