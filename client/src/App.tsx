import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import Homepage from "./components/homepage/Homepage.tsx";
const App = () => {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/fiverr" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
