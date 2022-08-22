import React from 'react'
import { LevaPanel, useControls as useControlsImpl, useCreateStore, Leva } from 'leva'
import Box from '@mui/material/Box'


const Panel = ({ selected, props }) => {
    return (
        <Box>
            <LevaPanel fill flat store={selected[0]?.userData.store} titleBar={{ title: selected.map(() => '●').join(' ') }} {...props} />
        </Box>
    )
}

const useControls = (selected, props) => {
    const store = useCreateStore()
    const isFirst = selected[0] === store
    const materialProps = useControlsImpl(
        Object.keys(props).reduce(
            (acc, key) => ({
                ...acc,
                [key]: {
                    ...props[key],
                    transient: false,
                    onChange: (value, path, ctx) =>
                        !ctx.initial && isFirst && selected.length > 1 && selected.forEach((s, i) => i > 0 && s.setValueAtPath(path, value)),
                    render: (get) => selected.length === 1 || selected.every((store) => store.getData()[key])
                }
            }),
            {}
        ),
        { store },
        [selected]
    )
    return [store, materialProps]
}

export { Panel, useControls }