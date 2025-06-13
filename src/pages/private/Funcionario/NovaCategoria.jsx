import React, { useState, useRef } from "react";
import api from "../../../services/api";
import MenuFuncionario from "./MenuFuncionario";
import CredentialsUser from "../../../components/CredentialsUser";
import { use } from "react";
import { useEffect } from "react";


const NovaCategoria = () => {
  
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const enviarCategoria = async (e) => {
    
        e.preventDefault(); // Cancela o reload da página
       
           const formData = new FormData();
           formData.append("nome", nome);
           formData.append("descricao", descricao); 
   

        try {
          const response = await api.post(
            "/categoria",
             formData,
             {
              headers:{
                "Content-Type": "application/json"
              }
             }
          );
         console.log("Categoria cadastrada " + response.data);
         alert(response.data.data.nome + " cadastrada sucesso");
         // Limpando os campos
         setNome("");
         setDescricao("");

        } catch (error) {
           console.error("Não foi possível salvar a categoria ", error)
        }
   };


  return (
    <div>
      <MenuFuncionario />
      <CredentialsUser title="Novo Categoria" />

      <form onSubmit={enviarCategoria} className="container-fluid p-4">
        <div className="mb-3">
          <label className="form-label">Nome:</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

            <div className="mb-3">
          <label className="form-label">Descrição:</label>
          <textarea
            className="form-control"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows="3"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Adicionar Categoria
        </button>
      </form>
    </div>
  );
};

export default NovaCategoria;
