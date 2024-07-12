import { BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from './pages/MainPage/MainPage';
import Header from './components/Header/Header';
import DonorPage from './pages/DonorPage/DonorPage';
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {

  return (
    <>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/donor" element={<DonorPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
