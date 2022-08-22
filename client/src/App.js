import React, { useContext } from "react"
import Layout from './components/Layout'
import Scene from './components/scene/Scene'
import UserProvider from './components/contexts/UserProvider'
import SignInButtons from './components/utils/SignInButtons'
import './App.css'

const App = () => {
  const userData = useContext(UserProvider.Context);
  return (
    <Layout>
      <div className="App">
        {userData ?
          (<Scene userData={userData} />) :
          (<div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'column', width: 'fit-content', margin: '4rem auto 0 auto', textAlign: 'center' }}>
            <h2> You need to sign in first.</h2>
            <SignInButtons />
          </div>)}
      </div>
    </Layout>
  )
}

export default App