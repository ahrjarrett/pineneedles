import React from 'react'

const Student = props => {
  console.log(props.match.params)
  return (
    <div className="Student">
      hi!
    </div>
  )

}

export default Student
