import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NovelList from './components/NovelList'
import NovelReader from './components/NovelReader'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NovelList />} />
        <Route path="/read/:id" element={<NovelReader />} />
      </Routes>
    </Router>
  )
}

export default App 