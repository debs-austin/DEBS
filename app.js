const express = require('express')
const app = express()
const port = 3000
const PouchDB = require('pouchdb-node')
const db = new PouchDB('offline-db')
const replicate = db.replicate.to("https://327025aa-ad5f-487a-a1b7-21e358ef00c7-bluemix:9e7caaaf567fb7d9235f6f91aa7c050ba7adef7fa7345c52974e395d57f45829@327025aa-ad5f-487a-a1b7-21e358ef00c7-bluemix.cloudant.com/debs", {
  live: true,
  retry: true
}).on('change', info => console.log(`synced: ${info}`))

app.get('/add', (req, res) => {
  const db = new PouchDB('offline-db')
  db.post({
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      -97.740079,
      30.268832
    ]
  },
  "properties": {
    "mission": "ATXTest",
    "battalion": "",
    "timestamp": "",
    "sensor_a": "",
    "sensor_b": "",
    "detections": [
      {
        "model": "model_a",
        "class": "light",
        "confidence": 0.74
      },
      {
        "model": "model_b",
        "class": "heavy",
        "confidence": 0.59
      }
    ]
  }
  }).then(res => {
    console.log('added test doc')
  }).catch(err => {
    console.log(err)
  })
  res.send('test doc added!')
})

app.get('/get', (req, res) => {
  const db = new PouchDB('offline-db')
  db.allDocs({
    include_docs: true
  }).then(docs => {
    res.json(docs.rows)
    console.log('displaying all docs')
  }).catch(err => {
    console.log(err)
  })
})

app.get('/erase', (req, res) => {
  db.destroy('offline-db')
  console.log('erasing all docs')
  res.send('deleted all docs in offline-db')
})


app.get('/sync', (req, res) => {
const db = new PouchDB('offline-db')
const replicate = db.replicate.to("https://327025aa-ad5f-487a-a1b7-21e358ef00c7-bluemix:9e7caaaf567fb7d9235f6f91aa7c050ba7adef7fa7345c52974e395d57f45829@327025aa-ad5f-487a-a1b7-21e358ef00c7-bluemix.cloudant.com/debs", {
  live: true,
  retry: true
}).on('change', info => res.send(info))
})

app.listen(port, () => console.log(`Debs listening on port ${port}!`))
