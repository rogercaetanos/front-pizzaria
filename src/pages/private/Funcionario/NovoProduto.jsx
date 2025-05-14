import React, { useState, useRef } from "react";
import api from "../../../services/api";
import MenuFuncionario from "./MenuFuncionario";
import CredentialsUser from "../../../components/CredentialsUser";


const NovoProduto = () => {
  
  const [nome, setNome] = useState("");
  const [precoVenda, setPrecoVenda] = useState("");
  const [descricao, setDescricao] = useState("");
  const fileInputRef = useRef(null); // Utilizamos para controlar os elementos do DOM (HTML) ele traz uma referência para esses elementos
  
  const [image, setImage] = useState(null); // Agora armazenamos múltiplas imagens
  const [preview, setPreview] = useState(null); // Para armazenar as prévias das imagens selecionadas
  const [croppedPreview, setCroppedPreview] = useState(null);

  
const token = localStorage.getItem("token"); // Obtém o token salvo
// Manipula a seleção de imagem e gera prévia
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    setImage(file);
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    // Criar recorte automaticamente
    cropImage(imageUrl);
  }
};

// Função para recortar a imagem para um tamanho fixo (exemplo: 200x200)
const cropImage = (imageSrc) => {
  const img = new Image();
  img.src = imageSrc;
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const targetSize = 100; // Define o tamanho do recorte
    canvas.width = targetSize;
    canvas.height = targetSize;

    // Cálculo para centralizar o corte
    const size = Math.min(img.width, img.height);
    const sx = (img.width - size) / 2;
    const sy = (img.height - size) / 2;

    ctx.drawImage(img, sx, sy, size, size, 0, 0, targetSize, targetSize);

    const croppedImageUrl = canvas.toDataURL("image/jpeg"); // Converte para URL Base64
    setCroppedPreview(croppedImageUrl);
  };
};     

  const enviarProduto = async (e) => {
    
        e.preventDefault(); // Cancela o reload da página
       
        console.log("Produto:", { nome, precoVenda, descricao });

        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("precoVenda", precoVenda);
        formData.append("descricao", descricao);

        if (croppedPreview !== null) {
          const response = await fetch(croppedPreview);
          const blob = await response.blob();
          formData.append("files", blob, "cropped-image.jpg");
        }
        
        try {
          const response = await api.post(
            "/produto",
            formData,
             {
              headers:{
                "Content-Type": "application/json"
              }
             }

          );
         console.log("Produto cadastrado " + response.data);
         alert(response.data.data.nome + " cadastrada sucesso");
         // Limpando os campos
         setNome("");
         setPrecoVenda("");
         setDescricao("");

        } catch (error) {
           console.error("Não foi possível salvar o produto ", error)
        }
   };

  return (
    <div>
      <MenuFuncionario />
      <CredentialsUser title="Novo Produto" />

      <form onSubmit={enviarProduto} className="container-fluid p-4">
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
          <label className="form-label">Preço:</label>
          <input
            type="text"
            className="form-control"
            value={precoVenda}
            onChange={(e) => setPrecoVenda(e.target.value)}
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

        <div className="mb-3">
          <label className="form-label">Imagem:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} 
            ref={fileInputRef}
            className="w-full p-2 border rounded mt-2"
          />
          {preview && (
            <div>
              <p className="mt-4 text-sm font-bold">Imagem Original:</p>
              <img
                src={preview}
                alt="Original"
                className="mt-2 w-full h-48 object-cover rounded"
              />
            </div>
          )}
          {croppedPreview && (
            <div>
              <p className="mt-4 text-sm font-bold">Imagem Recortada:</p>
              <img
                src={croppedPreview}
                name="files"
                alt="Cropped"
                className="mt-2 w-48 h-48 object-cover rounded mx-auto"
              />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Adicionar Produto
        </button>
      </form>
    </div>
  );
};

export default NovoProduto;
