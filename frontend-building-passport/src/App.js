import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateResidentRoute from "./components/PrivateResidentRoute";
import { ResidentProvider } from "./contexts/ResidentContext";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
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
            <Route
              path="/main"
              element={
                <PrivateResidentRoute>
                  <MainPage />
                </PrivateResidentRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ResidentProvider>
    </>
  );
}

export default App;
