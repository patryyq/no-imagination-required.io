import React, { useEffect, useContext } from 'react'
import MenuAppBar from './MenuAppBar'
import './style.css'
import { useSnackbar } from 'notistack'
import UserProvider from './contexts/UserProvider'

const Layout = ({ children }) => {
    const userData = useContext(UserProvider.Context);
    const { enqueueSnackbar } = useSnackbar()
    const messageAfterLogin = () => {
        const link = window.localStorage.getItem("beforeSignIn")
        if (link === 'just') {
            window.localStorage.setItem("beforeSignIn", '')
            enqueueSnackbar('Successfully signed in!', { variant: 'success' })
        }
    }
    useEffect(() => {
        messageAfterLogin()
        const link = window.localStorage.getItem("beforeSignIn")
        if (userData && link.length > 0) window.localStorage.setItem("beforeSignIn", '')
    })

    return (
        <React.Fragment>
            <MenuAppBar />
            {children}
        </React.Fragment>
    )
}

export default Layout;
