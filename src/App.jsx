import { BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from './pages/MainPage/MainPage';
import DonorPageByCity from './pages/DonorPageByCity/DonorPageByCity';
import DonorPageByCitySigned from "./pages/DonorPageByCitySigned/DonorPageByCitySigned";
import DonorPage from "./pages/DonorPage/DonorPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RequestorPage from "./pages/RequestorPage/RequestorPage";
import RequestorPageByCity from "./pages/RequestorPageByCity/RequestorPageByCity";
import RequestorPageByCitySigned from "./pages/RequestorPageByCitySignedUser/RequestorPageByCitySigned";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/donor" element={<DonorPage />} />
        <Route path="/donor/:city/:Lat/:Lng/:address" element={<DonorPageByCity />} />
        <Route path="/donor/:city/:Lat/:Lng/:address/signed" element={<DonorPageByCitySigned />} />
        <Route path="/requestor" element={<RequestorPage />} />
        <Route path="/requestor/:city" element={<RequestorPageByCity />} />
        <Route path="/requestor/:city/signed" element={<RequestorPageByCitySigned />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
