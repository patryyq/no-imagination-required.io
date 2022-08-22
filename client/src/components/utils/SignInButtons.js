import React from 'react'
import { ListItem, ListItemIcon } from '@mui/material'
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons"
import { Link } from "react-router-dom"

const isLocalhost = window.location.hostname === 'localhost'
const url = !isLocalhost ? '/backend' : 'http://localhost:5000' //'https://no-imagination-required.io/'

function SignInButtons() {
    window.localStorage.setItem("beforeSignIn", window.location.href)
    return (
        <>
            <Link to='#' className={"link"} >
                <ListItem onClick={() => (window.location = url + '/auth/google')}>
                    <ListItemIcon>
                        <GoogleLoginButton style={{ fontSize: '17px' }} />
                    </ListItemIcon>
                </ListItem>
            </Link>
            <Link to='#' className={"link"} >
                <ListItem onClick={() => (window.location = url + '/auth/facebook')}>
                    <ListItemIcon>
                        <FacebookLoginButton style={{ fontSize: '16px' }} />
                    </ListItemIcon>
                </ListItem>
            </Link>
        </>)
}

export default SignInButtons