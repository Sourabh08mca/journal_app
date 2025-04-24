import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import JournalForm from './component/JournalForm'
import JournalList from './component/JournalList'
import UpdateForm from './component/UpdateForm'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<JournalList/>}></Route>
          <Route path='/form' element={<JournalForm/>}></Route>
          <Route path='/update/:id' element={<UpdateForm/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
