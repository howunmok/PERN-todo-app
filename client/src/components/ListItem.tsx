// import React from "react"

import { ProgressBar } from "./ProgressBar"
import { TickIcon } from "./TickIcon"

interface Task {
  title: string
}

export const ListItem = ({ task }: { task: Task }) => {
  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar />
      </div>

      <div className="button-container">
        <button className="edit">Edit</button>
        <button className="delete">Delete</button>
      </div>
    </li>
  )
}
