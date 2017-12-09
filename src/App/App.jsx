import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Router } from 'react-router-dom';

import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { history } from '../_helpers';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import { RegisterPage } from '../RegisterPage/Register';

class App extends Component {
    constructor(props) {
        super(props)

        const { dispatch } = this.props

        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear())
        })
    }

    render() {
        const { alert } = this.props

        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {   alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }

                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/login" component={LoginPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { alert } = state

    return { alert }
}

// export default connect(mapStateToProps)(App);

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 