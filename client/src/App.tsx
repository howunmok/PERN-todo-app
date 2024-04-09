import { useEffect, useState } from "react"
import { ListHeader } from "./components/ListHeader"
import { ListItem } from "./components/ListItem"

interface Task {
  date: Date
  id: string
  title: string
  user_email: string
  progress: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ListHeaderProps {
  listName: string
  getData: () => Promise<void>
}

function App() {
  const userEmail = "bennymok@test.com"
  const [tasks, setTasks] = useState<Task[] | null>(null)

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
      const json: Task[] = await response.json()
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  console.log(tasks)

  // Sort by date
  const sortedTasks = tasks?.sort(
    (a: Task, b: Task) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  return (
    <div className="app">
      <ListHeader listName={"🏖️ Holiday tick list"} getData={getData} />
      {sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task} getData={getData} />
      ))}
    </div>
  )
}

export default App
