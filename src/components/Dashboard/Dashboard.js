import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import { trackedStudents } from '../../hardcodedData'

const githubUrl = 'https://api.github.com'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  async componentDidMount() {
    const token = this.props.token || localStorage.token

    if (this.state.users.length) return
    if (window.localStorage.users) {
      this.setState({ users: JSON.parse(window.localStorage.users) })
      return
    }

    const promises =  trackedStudents.map(async username => {
      console.log('making request!')

      const response = await axios({
	url: `${githubUrl}/users/${username}`,
	method: 'GET',
	headers: {
	  Authorization: `token ${token}`,
	  Accept: 'application/vnd.github.v3+json'
	}
      })
      return response
    })

    const responses = await Promise.all(promises)
    const users = responses.map(({ data }) => data)
    window.localStorage.setItem('users', JSON.stringify(users))
    this.setState({ users })
  }

  render() {
    const { user } = this.props
    const { users } = this.state

    return (
      <div className="Dashboard">
	<Header user={user}/>
	<div className="Dashboard--header">
	  Welcome to your dashboard, {user.name || user.login}!
	</div>
	<div className="Dashboard--students-wrapper">
	  <div className="Dashboard--students-header">
	    These are your students:
	  </div>
	  <div className="Dashboard--students">
	    {users.map(user => (
	      <div key={user.id}>
		<Link to={`/students/${user.login}`}>{user.login}</Link>
	      </div>
	    ))}
	  </div>
	</div>
      </div>
    )
  }
}

export default Dashboard
