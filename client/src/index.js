import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import UserProvider from './components/contexts/UserProvider';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import { SnackbarProvider } from 'notistack'
import { Loader } from '@react-three/drei'
import './index.css'
const LulabyScene = lazy(() => import('./components/scenes/lulaby'))
const App = lazy(() => import('./App'))
const LandingPage = lazy(() => import('./components/landing/LandingPage'))
const Profile = lazy(() => import('./components/profile/Profile'))
const ScenesDashboard = lazy(() => import('./components/dashboard/ScenesDashboard'))

const redirectAfterLogin = () => {
  let link = window.localStorage.getItem("beforeSignIn")
  if (link === null) {
    window.localStorage.setItem("beforeSignIn", '')
    link = window.localStorage.getItem("beforeSignIn")
  }
  if (link.length > 0 && link !== 'just') {
    window.localStorage.setItem("beforeSignIn", 'just')
    window.location.href = link
  }
}
redirectAfterLogin()

ReactDOM.render(
  <Router>
    {/* <React.StrictMode> */}
    <UserProvider>
      <SnackbarProvider maxSnack={3}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/scene/:sceneId" element={<App />} />
            <Route path="/scenes" element={<ScenesDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/lulaby-city-scene" element={<LulabyScene />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </Suspense>
      </SnackbarProvider>
    </UserProvider>
    {/* </React.StrictMode> */}
  </Router>,
  document.getElementById('root')
);

// serviceWorkerRegistration.register()
// reportWebVitals()
