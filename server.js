const express = require("express")
const port = 5000
const app = express()

const ideas = [
  {
    id: 1,
    text: "Develop a new mobile app for task management",
    username: "JaneDoe",
    tag: "Productivity",
    date: new Date(),
  },
  {
    id: 2,
    text: "Create an online platform for learning programming languages",
    username: "JohnSmith",
    tag: "Education",
    date: new Date(),
  },
  {
    id: 3,
    text: "Start a podcast discussing technology and innovation",
    username: "TechEnthusiast",
    tag: "Technology",
    date: new Date(),
  },
  {
    id: 4,
    text: "Design a sustainable urban transportation system",
    username: "UrbanPlanner",
    tag: "Environment",
    date: new Date(),
  },
]

app.get("/", (req, res) => {
  res.json({ message: "Welcome" })
})
// Get all datas
app.get("/api/ideas", (req, res) => {
  res.json({ success: true, data: ideas })
})

app.get("/api/ideas/:id", (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id)

  if (!idea) {
    res.status(404).json({ success: false, error: "Resource not found" })
  }

  res.json({ success: true, data: idea })
})

app.listen(port, () => console.log(`server listening on ${port}`))
