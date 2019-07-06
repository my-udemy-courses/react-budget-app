import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Ausgaben Checker</h1>
            <p>Hilft dabei, Ausgaben im Blick zu behalten.</p>
            <button className="button" onClick={startLogin}>Login mit Google</button>
        </div>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
