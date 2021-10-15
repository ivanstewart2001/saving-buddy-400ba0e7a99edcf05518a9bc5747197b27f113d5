import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../../Actions/auth'

export const LoginPage = ({ startLogin }) => {
    return (
        <div>
            <div>
                <h1>Saving Buddy</h1>
                <button onClick={startLogin}>Login with Google</button>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLogin : () => dispatch(startLogin())
    }
}

export default connect(undefined, mapDispatchToProps)(LoginPage)