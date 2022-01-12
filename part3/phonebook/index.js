import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.json({ test: 1 })
})

const PORT = 3001
app.listen(PORT)
