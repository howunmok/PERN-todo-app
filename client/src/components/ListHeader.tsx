// import React from "react"

import { useState } from "react"
import { Modal } from "./Modal"

interface ListHeaderProps {
  listName: string
}

export const ListHeader = ({ listName }: ListHeaderProps) => {
  const [showModal, setShowModal] = useState(false)
  const signOut = () => {
    console.log("signout")
  }
  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          ADD NEW
        </button>
        <button className="signout" onClick={signOut}>
          SIGN OUT
        </button>
      </div>
      {showModal && <Modal mode={"create"} setShowModal={setShowModal} />}
    </div>
  )
}
