import { userActions } from '../_actions';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class HomePage extends Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll())
    }

    handleDeleteUser(id) {
        return this.props.dispatch(userActions.delete(id))
    }

    render() {
        const { users, user } = this.props

        return (
            <div>
                <h1>Hi { user.firstName }</h1>
                <h3>All registered users:</h3>
                { users.loading && <em>Loading users...</em>}
                { users.items && 
                    <ul>
                        {   
                            users.items.map((user, index) => 
                                <li key={user.id}>
                                    { user.firstName + '' + user.lastName }
                                    {
                                        user.deleting ? <em> - deleting ...</em>
                                        : user.deleteError ? <span className="error"> - ERROR: {user.deleteError}</span>
                                        : <span> - <a onClick={this.handleDeleteUser.bind(this, user.id)}>Delete</a></span>
                                    }
                                </li>
                            )
                        }
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { auth, users } = state
    const { user } = auth

    return { users, user }
}

export default connect(mapStateToProps)(HomePage)