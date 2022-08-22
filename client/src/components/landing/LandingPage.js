import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './style.css'
import Triangles from './Triangle'
import Slide from '@mui/material/Slide'
import Menu from '../Menu'

const LandingPage = () => {
    const [opacity1, setOpacity1] = useState(0)
    const [opacity2, setOpacity2] = useState(0)
    const [opacity3, setOpacity3] = useState(0)
    const [opacity4, setOpacity4] = useState(1)
    const [welcome, setWelcome] = useState(true)

    useEffect(() => {
        setTimeout(() => setOpacity1(1), 400)
        setTimeout(() => setOpacity2(1), 4000)
        setTimeout(() => setOpacity3(1), 7000)
        setTimeout(() => setOpacity4(0.9), 5500)
    }, [])
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            position: 'absolute',
            top: '0',
            left: '0'
        }}>
            <Box className="scene" >
                <Triangles />
            </Box>
            <div className="content" >
                {welcome && (
                    <Slide direction="left" appear={true} in={welcome} timeout={{ enter: 700, exit: 1 }}>
                        <div className="main1">
                            <h1 component={'p'} style={{ opacity: opacity1 }}><b>Imagination?</b></h1>
                            <p style={{ opacity: opacity2 }}><b className="loader">none required<span className="loader__dot">.</span><span className="loader__dot">.</span><span className="loader__dot">.</span></b></p>

                            <div style={{ opacity: opacity3 }} className="main3">
                                <Link pointerEvents="all" to="/scenes" style={{ touchAction: 'all', pointerEvents: 'all', margin: '0', padding: '0', width: 'max-content', textDecoration: 'none', color: '#ffffff' }}>
                                    <Button onClick={(e) => e.stopPropagation()} color="secondary" variant="contained">Get started</Button>
                                </Link>
                                {/* <Link to="/" style={{ touchAction: 'all', pointerEvents: 'all', margin: '0', padding: '0', width: 'max-content', textDecoration: 'none', color: '#fff' }}> */}
                                <Button onClick={() => setWelcome(false)} color="primary" variant="contained" style={{ touchAction: 'all', pointerEvents: 'all' }}>Find out more</Button>
                                {/* </Link> */}
                            </div>
                        </div>
                    </Slide>)}
                {!welcome && (
                    <Slide direction="left" appear={true} in={!welcome} timeout={{ enter: 700, exit: 1 }}>
                        <div className="main1">
                            <h1 component={'p'} style={{ opacity: opacity1 }}><b>About</b></h1>
                            <p style={{ opacity: opacity2 }}><b className="loader">just a placeholder<span className="loader__dot">.</span><span className="loader__dot">.</span><span className="loader__dot">.</span></b></p>

                            <div style={{ opacity: opacity3 }} className="main3">
                                {/* <Link to="/" style={{ touchAction: 'all', pointerEvents: 'all', margin: '0', padding: '0', width: 'max-content', textDecoration: 'none', color: '#fff' }}> */}
                                <Button onClick={() => setWelcome(true)} color="primary" variant="contained" style={{ touchAction: 'all', pointerEvents: 'all' }}>Go back</Button>
                                {/* </Link> */}
                            </div>
                        </div>
                    </Slide>
                )}
            </div>
            <div className="cnt" style={{ opacity: opacity4 }} />
            <Menu />
        </div >
    );
}

export default LandingPage;
