import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CredentialsUser from "../../../components/CredentialsUser";
import MenuFuncionario from "./MenuFuncionario";
import api from "../../../services/api";

function EditarCategoria() {

  const [categoria, setCategoria] = useState(
     {
      nome: "",
      descricao: "",
      precoVenda: 0 
    }
  );

 const[categoriaId, setCategoriaId] = useState("");
 const [categorias, setCategorias] = useState([]);



  const {id} = useParams();
  const navigate = useNavigate();
  
  useEffect(()=>{
      api
      .get(`/categoria/${id}`)
      .then((response) => {
        const dados = response.data.data;
         setCategoria(dados);
        
      }).catch((error)=>{
        console.error(`Erro ao buscar a categoria selecionada. ${error}`)
      })
      

  },[]);
 
  const atualizarCategoria = async (e) => {
     e.preventDefault(); // Cancela o comportamento padrão do formulário submit via get para outra página
    try {
    const response = await api.put(`/categoria/${categoria.id}`, categoria, {
      headers : {
          "Content-Type": "application/json"
      }
    });
    navigate("/pizzaria/funcionario/categoria");   
    } catch (error) {
      console.error (`Não foi possível atualizar a categoria, ${error}`);
    }

  }

  const handleChange = (e) => {
    // Recupera o valor atual do produto e substitui pelo novo valor digitado no campo do formulário
    setCategoria({ ...categoria, [e.target.name] : e.target.value});
    
  }




  return (
    <div className="container mt-4">
      <MenuFuncionario/>
      <CredentialsUser title="Edição de Categoria" />

      <form onSubmit={atualizarCategoria} className="bg-light p-4 rounded shadow">
        {/* Nome do Produto */}
        <div className="mb-3">
          <input
            type="text"
            name="nome"
            className="form-control"
            placeholder="Digite o nome da Categoria"
            value={categoria.nome}
            onChange={handleChange}
            required
          />
        </div>

        {/* Descrição */}
        <div className="mb-3">
          <textarea
            name="descricao"
            className="form-control"
            rows="3"
            placeholder="Digite a descrição da categoria"
            value={categoria.descricao}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Upload de Imagem */}
        <div className="mb-3">
          
        </div>

        {/* Botão de Enviar */}
        <button type="submit" className="btn btn-primary w-100">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default EditarCategoria;
