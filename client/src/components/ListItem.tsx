// import React from "react"

import { useState } from "react"
import { ProgressBar } from "./ProgressBar"
import { TickIcon } from "./TickIcon"
import { Modal } from "./Modal"

interface ListItemProps {
  task: Task
  getData: () => Promise<void>
}

interface Task {
  title: string
  user_email: string
  progress: number
  date: Date
}

export const ListItem = ({ task, getData }: ListItemProps) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar />
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          Edit
        </button>
        <button className="delete">Delete</button>
      </div>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          getData={getData}
          task={task}
        />
      )}
    </li>
  )
}
