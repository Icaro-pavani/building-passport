import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateBuildingRoute from "./components/PrivateBuildingRoute";
import PrivateResidentRoute from "./components/PrivateResidentRoute";
import { BuildingProvider } from "./contexts/BuildingContext";
import { ResidentProvider } from "./contexts/ResidentContext";
import AddListPage from "./pages/AddListPage";
import BuildingLoginPage from "./pages/BuildingLoginPage";
import BuildingNewsPage from "./pages/BuildingNewsPage";
import BuildingResidentsPage from "./pages/BuildingResidentsPage";
import GuestInfoPage from "./pages/GuestInfoPage";
import ListDetailPage from "./pages/ListDetailPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import QRCodePage from "./pages/QRCodePage";
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
            <Route path="/guests" element={<GuestInfoPage />} />
            <Route path="/qrcode" element={<QRCodePage />} />
          </Routes>
        </ResidentProvider>
        <BuildingProvider>
          <Routes>
            <Route path="/building" element={<BuildingLoginPage />} />
            <Route
              path="/building/residents"
              element={
                <PrivateBuildingRoute>
                  <BuildingResidentsPage />
                </PrivateBuildingRoute>
              }
            />
            <Route
              path="/building/news"
              element={
                <PrivateBuildingRoute>
                  <BuildingNewsPage />
                </PrivateBuildingRoute>
              }
            />
          </Routes>
        </BuildingProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
