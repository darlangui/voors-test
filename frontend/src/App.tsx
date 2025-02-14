import { Routes, Route } from 'react-router-dom';
import ChoosePizzas from './pages/ChoosePizzas';
import OrderPizzas from './pages/OrderPizzas';
import { OrderProvider } from './context/OrderProvider';
import Confirmation from "./pages/Confirmation.tsx";

function App() {
  return (
      <OrderProvider>
          <Routes>
              <Route path="/" element={<ChoosePizzas />} />
              <Route path="/order" element={<OrderPizzas/>} />
              <Route path="/confirmation" element={<Confirmation/>} />

          </Routes>
      </OrderProvider>
  )
}

export default App
