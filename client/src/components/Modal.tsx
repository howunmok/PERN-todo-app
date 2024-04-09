import React, { useState } from "react"

interface Task {
  user_email: string
  title: string
  progress: number
  date: Date
}

interface ModalProps {
  mode: string
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  task?: Task
  getData: () => Promise<void>
}

export const Modal: React.FC<ModalProps> = ({
  mode,
  setShowModal,
  getData,
  task,
}) => {
  // const mode = "create"
  const editMode = mode === "edit" ? true : false
  const [data, setData] = useState({
    // testing with dummy email
    user_email: editMode ? task?.user_email : "bennymok@test.com",
    // user_email: editMode ? task?.user_email : null,
    title: editMode ? task?.title : null,
    progress: editMode ? task?.progress : 50,
    date: editMode
      ? task?.date
        ? new Date(task.date)
        : new Date()
      : new Date(),
  })

  const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", {
      timeZoneName: "short",
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/New_York",
    })
  }

  const postData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8000/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          date: formatDate(data.date),
        }),
      })
      // console.log(`response: ${response.status}`)
      if (response.status === 200) {
        console.log("WORKED")
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("changing")
    const { name, value } = e.target

    setData((data) => ({
      ...data,
      [name]: value,
    }))

    console.log(data)
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form onSubmit={postData}>
          <input
            required
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={data.title || ""}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className={mode}
            type="submit"
            // onClick={editMode ? "" : postData}
            // onClick={() => {
            //   if (!editMode) postData()
            // }}
          />
        </form>
      </div>
    </div>
  )
}
