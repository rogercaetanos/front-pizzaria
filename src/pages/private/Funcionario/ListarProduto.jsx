import React,  {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import CredentialsUser from "../../../components/CredentialsUser";
import MenuFuncionario from "./MenuFuncionario";
import Modal from "../../../components/Modal";
import api from "../../../services/api";

const ListarProduto = () => {

  // useState: é um hook do React que serve para armazenar e controlar o estado de um componente.
  //           ele permite que você declare variáveis que lembram valores entre as renderizações do componente

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [produtoSelecionado,setProdutoSelecionado] = useState(null);
   const [idProduto, setIdProduto] = useState(null);
   const [produtos, setProdutos] = useState([]);

   const navigate = useNavigate();

   useEffect(()=>{

       api.get("/produto").then((response) =>{
         //console.log(response.data.data)
           setProdutos(response.data.data);
       }).catch((error)=>{
          console.error("Erro ao buscar a lista de produtos. ", error);
       });

   },[]);

  


   // `  ` => (Crase invertida)"Literal String" Forma de concatenar textos com variáveis de maneira mais natural 
   //          a variável deve estar entre ${}             

   const openModal = (produtoId) =>{
        console.log(`Produto selecionado para exclusão ${produtoId}`)
        setProdutoSelecionado(produtoId);
        setIsModalOpen(true);
   }

   const deleteProduto = async () => {
    
    try {
      console.log("Id: " + produtoSelecionado);
      const response = await api.delete(`/produto/${produtoSelecionado}`);
      alert(response.data.message);  
    } catch (error) {
       console.error("Erro: " + error)
       alert("Não foi possível a exclusão do produto com o id " + produtoSelecionado);
    }
    setIsModalOpen(false);
    location.href = location.href; // Redireciona para a mesma página
   }

 
/*
   const arrayProdutos = [
      {
            id: 1,
            nome: "Pizza de Calabresa",
            precoVenda: 30.0,
            descricao: "Pizza de Calabresa com cebola"
      },
      {
            id: 2,
            nome: "Pizza de Frango",
            precoVenda: 35.90,
            descricao: "Pizza de Frango com Catupiry"
      },
      {
            id: 3,
            nome: "Pizza de Mussarela",
            precoVenda: 49.60,
            descricao: "Pizza de Mussarela com Tomate"
      },

   ]
*/
 return (
    <div>
          <MenuFuncionario/>
          <CredentialsUser title="Lista de Produtos" />
      
          <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Status</th>
              <th>Ações</th> {/* Nova coluna de Ações */}
            </tr>
          </thead>
          <tbody>
            { produtos.map((produto)=> (
              <tr key={produto.id} >
                <td style={{ fontSize: "13px" }}>{produto.nome}</td>
                <td style={{ fontSize: "13px" }}>
                  
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  }).format(produto.precoVenda)}
                  </td>
                  
                <td style={{ fontSize: "13px" }}>{produto.descricao}</td>
                <td style={{ fontSize: "13px" }}>{ produto.categoria != null ? produto.categoria.nome : ""}</td>
                 

                <td style={{ fontSize: "13px" }}>
                  <span 
                  style={{
                    color: produto.codStatus === true ? "blue" : "red"}}
                  >
                   { produto.codStatus === true ? "Ativo" : "Inativo" }
                  </span>
                </td>


                <td className="text-center fs-6" style={{ width: "100px" }}>
                  {/* Botão de Editar */}
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={()=> navigate(`/pizzaria/funcionario/produto/editar/${produto.id}`)}
                    
                    >
                    <i className="fas fa-pencil-alt"></i>{" "}
                    {/* Ícone de editar */}

                  </button>
                  {/* Botão de Excluir */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={()=> openModal(produto.id)}
                    >
                    <i className="fas fa-trash-alt"></i>{" "}
                    {/* Ícone de excluir */}
                  </button>
                </td>
              </tr>   
             ))}

          </tbody>
        </table>
      </div>

     <div className="text-end mt-3">
      <a href="/pizzaria/funcionario/produto/novo" className="btn btn-success">
       <i className="fas fa-plus"></i> Novo Produto
      </a>
      </div> 

      <Modal
        isOpen={isModalOpen}
        onClose={()=> setIsModalOpen(false)}
        onConfirm={deleteProduto}
      />
    
    </div>
 )

}

export default ListarProduto;