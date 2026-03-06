import './App.css'
import './index.css'
import { Landing } from './components/landing'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './components/Screen'

function App() {


  return (
    <>
        <Routes>
          <Route path='/' element={<Landing></Landing>}></Route>
          <Route path='/chat' element={<Dashboard />}></Route>
        </Routes>
    </>
  )
}


export default App