const express = require('express')
const app = express()
const port = 3000
const PouchDB = require('pouchdb-node')
const db = new PouchDB('offline-db')
db.replicate.to("https://327025aa-ad5f-487a-a1b7-21e358ef00c7-bluemix:9e7caaaf567fb7d9235f6f91aa7c050ba7adef7fa7345c52974e395d57f45829@327025aa-ad5f-487a-a1b7-21e358ef00c7-bluemix.cloudant.com/debs", {
  live: true,
  retry: true
}).on('change', () => console.log(`synced with remote DB`))

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
  }).then(doc => {
    res.send(doc)
  }).catch(err => {
    console.error(err)
  })
})

app.get('/get', (req, res) => {
  const db = new PouchDB('offline-db')
  db.allDocs({
    include_docs: true
  }).then(docs => {
    res.json(docs.rows)
  }).catch(err => {
    console.error(err)
  })
})

app.get('/erase', (req, res) => {
  const db = new PouchDB('offline-db')
  db.destroy('offline-db')
  res.send('deleted all docs in offline-db')
})

app.listen(port, () => console.log(`Debs listening on port ${port}!`))
