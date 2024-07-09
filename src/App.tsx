import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Modules/Home/Home'
import EditPage from './Modules/Edit/EditPage'
import CreatePage from './Modules/Create/CreatePage'


function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agregar" element={<CreatePage />} />
          <Route path="/editar/:id" element={<EditPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
