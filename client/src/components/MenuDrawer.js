import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Drawer, Button, Divider, Box, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { BiWorld } from "react-icons/bi";
import { FaHome } from "react-icons/fa"
import { MdSupportAgent, MdOutlineVideoCameraBack } from "react-icons/md"
import { RiLogoutBoxLine } from "react-icons/ri"
import { CgProfile } from "react-icons/cg"
import useIsLogged from './useIsLogged'
import { logOut, login } from './utils/logOut'
import './MenuDrawer.css'
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import axios from "axios"
import { useSnackbar } from 'notistack'

export default function RightMenuDrawer() {
  const [state, setState] = useState({ left: false })
  const { enqueueSnackbar } = useSnackbar()
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return
    setState({ ...state, [anchor]: open })
  }

  // const login = (prodvider) => {
  //   const url = prodvider === 'gg' ? '/auth/google' : '/auth/facebook'
  //   loginRequest(url)
  // }

  // const loginRequest = (providerUrl) => {
  //   const isLocalhost = window.location.hostname === 'localhost'
  //   const url = !isLocalhost ? '/backend' : 'http://localhost:5000' //'https://no-imagination-required.io/'
  //   axios({
  //     method: 'get',
  //     url: url + providerUrl,
  //     headers: { 'Access-Control-Allow-Origin': 'https://no-imagination-required.io' },
  //     withCredentials: true,
  //   }).then(res => {
  //     if (res) {
  //       console.log(res)
  //       enqueueSnackbar(res, { variant: 'success' })
  //     }
  //   }).then((error) => window.location.href = error);
  //   return
  // }

  const isLocalhost = window.location.hostname === 'localhost'
  const url = !isLocalhost ? '/backend' : 'http://localhost:5000' //'https://no-imagination-required.io/'
  const isLogged = useIsLogged()
  return (
    <React.Fragment>
      <Box className={"invisButton"}>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)} className={"buttonHitbox"} >{anchor}</Button>
            <Drawer
              className={"root"}
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              <Box
                role="presentation"
                className={"list"}
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
              >
                {isLogged[0] && isLogged[1].image !== undefined && (
                  <React.Fragment>
                    <div className="imgMenuWrap">
                      <img alt="avatar" src={isLogged[1].image} className="profileImg" />
                      <p>{isLogged[1].firstName}</p>
                    </div>
                    <Divider sx={{ height: '2px' }} />
                  </React.Fragment>
                )}
                <Divider sx={{ height: '12px', borderColor: '#fff' }} />
                <Link to="/" className={"link"}>
                  <ListItem button key={Math.random(0, 1234)}>
                    <ListItemIcon>
                      <FaHome className={"cBlack"} />
                    </ListItemIcon>
                    <ListItemText primary="Home page" />
                  </ListItem>
                </Link>
                {isLogged[0] ? (
                  <React.Fragment>
                    <Divider sx={{ height: '24px', borderColor: '#fff' }} />
                    <Link to="/profile" className={"link"}>
                      <ListItem button key={Math.random(0, 1234)}>
                        <ListItemIcon>
                          <CgProfile className={"cGreen"} />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                      </ListItem>
                    </Link>
                    <Divider sx={{ height: '12px' }} />
                    <Divider sx={{ height: '12px', borderColor: '#fff' }} />
                    <Link to="/scenes" className={"link"}>
                      <ListItem button key={Math.random(0, 1234)}>
                        <ListItemIcon>
                          <MdOutlineVideoCameraBack className={"cBlue"} />
                        </ListItemIcon>
                        <ListItemText primary="Scenes" />
                      </ListItem>
                    </Link>
                    <Divider sx={{ height: '24px', borderColor: '#fff' }} />
                    <Link to="#" className={"link"}>
                      <ListItem button key={Math.random(0, 1234)}>
                        <ListItemIcon>
                          <BiWorld className={"cBlue"} />
                        </ListItemIcon>
                        <ListItemText primary="Objects" />
                      </ListItem>
                    </Link>
                    <Divider sx={{ height: '12px' }} />
                    <Divider sx={{ height: '22px', borderColor: '#fff' }} />
                    <Link to="#" className={"link"}>
                      <ListItem button key={Math.random(0, 1234)} onClick={logOut}>
                        <ListItemIcon>
                          <RiLogoutBoxLine className={"cRed"} />
                        </ListItemIcon>
                        <ListItemText primary="Sign out" />
                      </ListItem>
                    </Link>
                    <Divider sx={{ height: '12px', borderColor: '#fff' }} />
                    <Link to="#" className={"link"}>
                      <ListItem button key={Math.random(0, 1234)}>
                        <ListItemIcon>
                          <MdSupportAgent className={"cRed"} />
                        </ListItemIcon>
                        <ListItemText primary="Support" />
                      </ListItem>
                    </Link>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Divider sx={{ height: '22px', borderColor: '#fff' }} />
                    <Link to="#" className={"link"}>
                      <ListItem button key={Math.random(0, 1234)}>
                        <ListItemIcon>
                          <MdSupportAgent className={"cRed"} />
                        </ListItemIcon>
                        <ListItemText primary="Support" />
                      </ListItem>
                    </Link>
                    <Divider sx={{ height: '12px' }} />
                    <Divider sx={{ height: '12px', borderColor: '#fff' }} />
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <a href={url + "/auth/google"} className={"link"}>
                        <ListItemIcon>
                          <GoogleLoginButton style={{ fontSize: '17px' }} />
                        </ListItemIcon>
                      </a>
                      <a href={url + "/auth/facebook"} className={"link"}>

                        <ListItemIcon>
                          <FacebookLoginButton style={{ fontSize: '16px' }} />
                        </ListItemIcon>

                      </a>
                    </div>
                  </React.Fragment>)}
                <Divider sx={{ height: '22px', borderColor: '#fff' }} />
              </Box>
            </Drawer>
          </React.Fragment>
        ))
        }
      </Box >
    </React.Fragment >
  )
}
