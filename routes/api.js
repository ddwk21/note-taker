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

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id
  
    if (!id) {
      return res.status(400).json({ error: "We need an id" })
    }
  

    fs.readFile(dbPath, "utf8", function(err, data) {

        
      const noteData = JSON.parse(data)

      
      const newNoteData = noteData.filter(note => id != note.id)

      
      fs.writeFile(dbPath, JSON.stringify(newNoteData), function(err) {
        if (err) {
          return res.status(500).json(err)
        }
        res.json(true)
      })
    })
  })

module.exports = router