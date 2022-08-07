import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResidentProvider } from "./contexts/ResidentContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import GlobalStyle from "./theme/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <ResidentProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </ResidentProvider>
    </>
  );
}

export default App;
