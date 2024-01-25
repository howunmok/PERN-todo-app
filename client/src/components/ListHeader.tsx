import React from "react"

interface ListHeaderProps {
  listName: string
}

export const ListHeader = ({ listName }: ListHeaderProps) => {
  const signOut = () => {
    console.log("signout")
  }
  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create">ADD NEW</button>
        <button className="signout" onClick={signOut}>
          SIGN OUT
        </button>
      </div>
    </div>
  )
}
