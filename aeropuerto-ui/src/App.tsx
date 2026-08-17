import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";

import LoginPage from "./pages/LoginPage";

import AdminGatesPage from "./pages/GatesPage";
import AdminFlightsPage from "./pages/FlightsPage";

import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Airpot (MUI)
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ flexWrap: "wrap" }}>
            <Button color="inherit" component={Link} to="/gates">Gates</Button>
            <Button color="inherit" component={Link} to="/flights">Flights</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            
          </Stack>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/gates"
          element={
            <RequireAuth>
              <AdminGatesPage />
            </RequireAuth>
          }
        />

        <Route
          path="/flights"
          element={
            <RequireAuth>
              <AdminFlightsPage />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}