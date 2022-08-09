import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateResidentRoute from "./components/PrivateResidentRoute";
import { ResidentProvider } from "./contexts/ResidentContext";
import AddListPage from "./pages/AddListPage";
import ListDetailPage from "./pages/ListDetailPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import GlobalStyle from "./theme/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <ResidentProvider>
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
            <Route
              path="/create-list"
              element={
                <PrivateResidentRoute>
                  <AddListPage />
                </PrivateResidentRoute>
              }
            />
            <Route
              path="/list/:id"
              element={
                <PrivateResidentRoute>
                  <ListDetailPage />
                </PrivateResidentRoute>
              }
            />
          </Routes>
        </ResidentProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
