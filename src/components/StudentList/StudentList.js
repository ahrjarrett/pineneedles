import React from 'react'

const Student = props => {
  const { student } = props
  return (
    <div className="Student">
      {student.login}
    </div>
  )

}

export default Student
