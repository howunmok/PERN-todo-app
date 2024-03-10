const PORT = process.env.PORT ?? 8000
const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./config/db")

app.use(cors())

// get all todos
app.get("/todos/:userEmail", async (req, res) => {
  //   console.log(req)
  const { userEmail } = req.params
  //   console.log(userEmail)
  try {
    const todos = await pool.query(
      // $1 is the variable for first item in an array
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    )
    res.json(todos.rows)
  } catch (err) {
    console.error(err)
  }
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
