import React from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./routes/Landing";
import Allocations from "./components/Allocations";
import Contact from "./components/Contact";
import Inventories from "./components/Inventories";
import Members from "./components/Members";
import Header from "./components/Header"; 
import Footer from "./components/Footer"; 

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/members"
            element={
              <>
                <Header />
                <Members />
                <Footer />
              </>
            }
          />
          <Route
            path="/allocations"
            element={
              <>
                <Header />
                <Allocations />
                <Footer />
              </>
            }
          />
          <Route
            path="/inventories"
            element={
              <>
                <Header />
                <Inventories />
                <Footer />
              </>
            }
          />          
          <Route
            path="/contact"
            element={
              <>
                <Header />
                <Contact />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
