import HelpDialog from './HelpDialog'
import SceneSettings from './SceneSettings'
import ModeFAB from './ModeFAB'
import DayNightToggle from 'react-day-and-night-toggle'
import { Box, Fab, Typography } from '@mui/material'
import AddObjectDialog from './AddObjectDialog'
import { HiAdjustments } from 'react-icons/hi'
import Cursor from './Cursor'

const SceneIcons = (props) => {
    return (
        <>
            <Box sx={{ position: 'absolute', zIndex: '1000', top: '1rem', left: '1rem', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center' }}>
                <Box>
                    <HelpDialog />
                </Box>
                <Box sx={{ marginLeft: '20px' }}>
                    <SceneSettings {...props} />
                </Box>
                <Box sx={{ marginLeft: '20px' }}>
                    <Cursor />
                </Box>
                {/* <Box sx={{ marginLeft: '20px' }}>
                    <DayNightToggle
                        onChange={() => props.setDayNight(!props.dayNight)}
                        checked={props.dayNight}
                    />
                </Box> */}
            </Box>
            <Box sx={{ position: 'absolute', zIndex: '1000', bottom: '2rem', right: '1rem', display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
                <Box hidden={!props.hidden}>
                    <Fab
                        onClick={() => props.properties()}
                        color='primary'
                        size="medium"
                        aria-label='move'
                        /* props.showProp?1: 0.4  */
                        sx={{ fontSize: '1.7rem', opacity: 1 }} >
                        <HiAdjustments />
                        <Box sx={{ padding: '2px', bottom: '-1.7rem', position: 'absolute' }}>
                            <Typography sx={{ fontSize: '13px', fontWeight: '900', color: '#333' }} variant={'body2'}>
                                prop.
                            </Typography>
                        </Box>
                    </Fab>
                </Box>
                <Box sx={{ marginLeft: '20px' }}>
                    <ModeFAB {...props} />
                </Box>
                <Box>
                    <AddObjectDialog {...props} />
                </Box>
            </Box>
        </>
    )
}

export default SceneIcons