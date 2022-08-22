import create from 'zustand'
import { devtools } from 'zustand/middleware'

const sceneStore = (set) => ({
    objects: [],
    settings: {},
    selected: [],
    ws: {},
    setWs: (ws) =>
        set(() => ({ ws: ws })),
    addObject: (object) =>
        set((state) => ({ objects: [...state.objects, object] })),
    removeObject: (sel) =>
        set((state) => ({
            objects: state.objects?.filter((obj) => {
                let selected = false
                for (let i = 0; i < sel.length; ++i) {
                    if (obj?.objID === sel[i]?.objID) selected = true
                }
                return !selected
            })
        })),
    changeObject: (property, value, objID) =>
        set((state) => ({
            objects: state.objects?.map((object) => {
                if (object?.objID === objID) {
                    object[property] = value
                } else if (object ?? true) state.removeObject(object)
                return object
            })
        })),
    setSelected: (selected) =>
        set(() => ({ selected: selected })),
    removeSelected: () =>
        set(() => ({ selected: [] })),
    changeSettings: (newSettings) =>
        set(() => ({ settings: newSettings })),
    setLoadedData: (data) =>
        set(() => ({ objects: data.objects, settings: data.settings })),
})

const useSceneStore = create(devtools(sceneStore))

export default useSceneStore
