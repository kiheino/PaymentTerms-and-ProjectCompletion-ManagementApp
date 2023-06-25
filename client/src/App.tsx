import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Home } from "./components/pages/Home";
import { ClientManagement } from "./components/pages/ClientManagement";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/client" element={<ClientManagement />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
