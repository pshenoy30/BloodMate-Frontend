import { BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from './pages/MainPage/MainPage';
// import DonorPageByCity from './pages/DonorPageByCity/DonorPageByCity';
import DonorPage from "./pages/DonorPage/DonorPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RequestorPage from "./pages/RequestorPage/RequestorPage";
import RequestorPageByCity from "./pages/RequestorPageByCity/RequestorPageByCity";


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/donor/:city" element={<DonorPage />} />
        <Route path="/requestor" element={<RequestorPage />} />
        <Route path="/requestor/:city" element={<RequestorPageByCity />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
