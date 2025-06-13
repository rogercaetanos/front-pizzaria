import React,  {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import CredentialsUser from "../../../components/CredentialsUser";
import MenuFuncionario from "./MenuFuncionario";
import Modal from "../../../components/Modal";
import api from "../../../services/api";

const ListarCategoria = () => {

  // useState: é um hook do React que serve para armazenar e controlar o estado de um componente.
  //           ele permite que você declare variáveis que lembram valores entre as renderizações do componente

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [categoriaSelecionada,setCategoriaSelecionada] = useState(null);
   const [idCategoria, setIdCategoria] = useState(null);
   const [categorias, setCategorias] = useState([]);

   const navigate = useNavigate();

   useEffect(()=>{

       api.get("/categoria").then((response) =>{
         //console.log(response.data.data)
           setCategorias(response.data.data);
       }).catch((error)=>{
          console.error("Erro ao buscar a lista de categorias. ", error);
       });

   },[]);

  
   // `  ` => (Crase invertida)"Literal String" Forma de concatenar textos com variáveis de maneira mais natural 
   //          a variável deve estar entre ${}             

   const openModal = (categoriaId) =>{
        console.log(`Categoria selecionada para exclusão ${categoriaId}`)
        setCategoriaSelecionada(categoriaId);
        setIsModalOpen(true);
   }

   const deleteCategoria = async () => {
    
    try {
      console.log("Id: " + categoriaSelecionada);
      const response = await api.delete(`/categoria/${categoriaSelecionada}`);
      alert(response.data);  
    } catch (error) {
       console.error("Erro: " + error)
       alert("Não foi possível a exclusão da categoria com o id " + categoriaSelecionada);
    }
    setIsModalOpen(false);
    location.href = location.href; // Redireciona para a mesma página
   }

 

 return (
    <div>
          <MenuFuncionario/>
          <CredentialsUser title="Lista de Categorias" />
      
          <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th> {/* Nova coluna de Ações */}
            </tr>
          </thead>
          <tbody>
            { categorias.map((categoria)=> (
              <tr key={categoria.id} >
                <td style={{ fontSize: "13px" }}>{categoria.nome}</td>
               
                  
                <td style={{ fontSize: "13px" }}>{categoria.descricao}</td>
                
                <td className="text-center fs-6" style={{ width: "100px" }}>
                  {/* Botão de Editar */}
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={()=> navigate(`/pizzaria/funcionario/categoria/editar/${categoria.id}`)}
                    
                    >
                    <i className="fas fa-pencil-alt"></i>{" "}
                    {/* Ícone de editar */}

                  </button>
                  {/* Botão de Excluir */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={()=> openModal(categoria.id)}
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
      <a href="/pizzaria/funcionario/categoria/nova" className="btn btn-success">
       <i className="fas fa-plus"></i> Nova Categoria
      </a>
      </div> 

      <Modal
        isOpen={isModalOpen}
        onClose={()=> setIsModalOpen(false)}
        onConfirm={deleteCategoria}
      />
    
    </div>
 )

}

export default ListarCategoria;