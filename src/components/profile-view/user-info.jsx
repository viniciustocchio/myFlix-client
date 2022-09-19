import React from 'react'

function UserInfo({ Username, Email, Birthday }) {
  return (
    <>
      <p>Name: {Username}</p>
      <p>Email: {Email}</p>
      <p>Birthday: {Birthday}</p>
    </>

  )
}

export default UserInfo