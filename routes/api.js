const router = require('express').Router()
const path = require('path')
const fs = require('fs')
// const db = require('./db/db.json')
const dbPath = path.join(__dirname, "..", "db", "db.json")

let jsonData

router.get('/notes', (req, res) => {
    console.log("API route hit")

  fs.readFile(dbPath, 'utf-8', function(err, data) {
    if (err) {
      res.status(500).json(err)
      return
    }
    const json = JSON.parse(data)
    // respond with the parsed array
    // let db = JSON.parse(fs.readFile("./db/db.json", "utf-8"))
    res.json(json)

  }) 
})

router.post('/notes', (req, res) => {
        
    // const notesData = require('../db/db.json')
    // console.log(notesData)
    // const noteObj = {title: req.body.title, text: req.body.text, id: Math.floor(Math.random()*10)}
    // notesData.push(noteObj)
    // let db = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))

    const newNote = {
        ...req.body,
        id: Math.random()
    }

    fs.readFile(dbPath, "utf-8", function(err,data) {
        if (err) {
            res.status(500).json(err)
            return
        }

        const notesData = JSON.parse(data)

        notesData.push(newNote)

        fs.writeFile(dbPath, JSON.stringify(notesData), function(err){
            if(err) {
                res.status(500).json(err)
                return
            }
            res.status(200).json(newNote)
        })
    })
})

module.exports = router