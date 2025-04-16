import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import TransactionList from "./components/TransactionList";
import FinanceChart from './components/FinanceChart';
import CategoryChart from './components/CategoryChart';
import NavBar from './components/NavBar';
import './App.css'


function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<TransactionList />} />
          <Route path='/chart/bar' element={<FinanceChart />} />
          <Route path='/chart/pie' element={<CategoryChart />} />
        </Routes>


      </BrowserRouter>
    </>
  )
}

export default App;