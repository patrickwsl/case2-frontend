import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./app/page";
import ClientsPage from "./app/clients/page";
import HomePage from "./app/home/page";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/clients" element={<ClientsPage />} />

        {/* Redirecionar para login por padrão */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
