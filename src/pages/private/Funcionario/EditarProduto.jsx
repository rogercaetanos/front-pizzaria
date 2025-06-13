import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CredentialsUser from "../../../components/CredentialsUser";
import MenuFuncionario from "./MenuFuncionario";
import api from "../../../services/api";

function EditarProduto() {

  const [produto, setProduto] = useState(
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
      .get(`/produto/${id}`)
      .then((response) => {
        const dados = response.data.data;
         setProduto(dados);
         if(dados?.categoria?.id) {
          setCategoriaId(dados.categoria.id);
         }

      }).catch((error)=>{
        console.error(`Erro ao buscar o produto selecionado. ${error}`)
      })
      
      api
      .get(`/categoria`)
      .then((response) => {
         setCategorias(response.data.data);
      }).catch((error)=>{
        console.error(`Erro ao buscar o produto selecionado. ${error}`)
      })




  },[]);
 
  const atualizarProduto = async (e) => {
     e.preventDefault(); // Cancela o comportamento padrão do formulário submit via get para outra página
    try {
    const response = await api.put(`/produto/${produto.id}`, produto, {
      headers : {
          "Content-Type": "application/json"
      }
    });
    navigate("/pizzaria/funcionario/produto");   
    } catch (error) {
      console.error (`Não foi possível atualizar o produto, ${error}`);
    }

  }

  const handleChange = (e) => {
    // Recupera o valor atual do produto e substitui pelo novo valor digitado no campo do formulário
    // setProduto({ ...produto, [e.target.name] : e.target.value});  // funciona sem o codStatus

    
    const { name, value } = e.target;
    const parsedValue = name === "codStatus" ? value === "true" : value;

    setProduto((produto)=> ({
      ...produto,
      [name] : parsedValue,
    }))
    
  }

  const handleChangeCategoria = (e) => {
   const novoId = e.target.value;
   setCategoriaId(novoId);

   setProduto((prev) => ({
     ...prev,
     categoria: { ...prev.categoria, id: novoId},
   }))
    
  }


  return (
    <div className="container mt-4">
      <MenuFuncionario/>
      <CredentialsUser title="Edição de Produto" />

      <form onSubmit={atualizarProduto} className="bg-light p-4 rounded shadow">
        {/* Nome do Produto */}
        <div className="mb-3">
          <input
            type="text"
            name="nome"
            className="form-control"
            placeholder="Digite o nome do produto"
            value={produto.nome}
            onChange={handleChange}
            required
          />
        </div>

        {/* Preço */}
        <div className="mb-3">
          <input
            type="number"
            name="precoVenda"
            className="form-control"
            placeholder="Digite o preço"
            value={produto.precoVenda}
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
            placeholder="Digite a descrição do produto"
            value={produto.descricao}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Escolha a Categoria:</label>
          <select
          value={categoriaId}
          onChange={handleChangeCategoria}
          className="border p-2 w-full rounded"
          required
          >
          <option value="">Selecione uma categoria</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
                 {cat.nome}
            </option>
          ))}
          </select>
        </div>

        <div className="mb-3">
          <h6>Ativar ou Desativar Produto</h6>
          <label>
                <input 
                type="radio"
                name="codStatus"
                value= "true"
                checked={produto.codStatus === true} 
                onChange={handleChange}
                />
            Ativo
          </label>
          <br />

          <label>
                <input 
                type="radio"
                name="codStatus"
                value= "false"
                checked={produto.codStatus === false} 
                onChange={handleChange}
                />
             Inativo
          </label>
         
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

export default EditarProduto;
