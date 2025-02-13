import { Routes, Route } from 'react-router-dom';
import ChoosePizzas from './pages/ChoosePizzas'

function App() {
  return (
      <Routes>
        <Route path="/" element={<ChoosePizzas />} />
      </Routes>
  )
}

export default App
