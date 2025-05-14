import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import HomeFuncionario from "./pages/private/Funcionario/HomeFuncionario";
import ListarProduto from "./pages/private/Funcionario/ListarProduto";
import NovoProduto from "./pages/private/Funcionario/NovoProduto";
import EditarProduto from "./pages/private/Funcionario/EditarProduto";

function App() {
  return (
    <>
      <div className="container">
          
         <Router>
            <Routes>

            <Route exact path="/" element={<HomeFuncionario/>} />
            
              <Route
              path="/pizzaria/funcionario/home"
              element={<HomeFuncionario/>}
              />

              <Route
              path="/pizzaria/funcionario/produto"
              element={<ListarProduto/>}
              />

              <Route
              path="/pizzaria/funcionario/produto/novo"
              element={<NovoProduto/>}
              />

              <Route path="/pizzaria/funcionario/produto/editar/:id"  
                element={<EditarProduto />}
               />
               
            </Routes>
         </Router>
      </div>
    </>
  );
}

export default App;
