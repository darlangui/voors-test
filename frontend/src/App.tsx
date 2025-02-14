import { Routes, Route } from 'react-router-dom';
import ChoosePizzas from './pages/ChoosePizzas';
import { OrderProvider } from './context/OrderProvider';

function App() {
  return (
      <OrderProvider>
          <Routes>
              <Route path="/" element={<ChoosePizzas />} />
          </Routes>
      </OrderProvider>
  )
}

export default App
