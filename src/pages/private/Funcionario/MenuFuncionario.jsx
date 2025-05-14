
const MenuFuncionario = () =>{



    return (
         <div>
             <nav className="navbar navbar-expand-lg navbar-light bg-light p-2 rounded shadow-sm w-100">
        <a className="navbar-brand" href="/pizzaria/funcionario/home">
          Home
        </a>

        {/* Botão Hamburguer para telas menores */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/pizzaria/funcionario/produto">
                Produtos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/pizzaria/funcionario/categoria">
                Categorias
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/pizzaria/funcionario/estoque">
                Estoque
              </a>
            </li>

            {/* Dropdown Menu */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Opções
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Ação 1
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Ação 2
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Outra opção
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link disabled">Desativado</a>
            </li>
          </ul>

          {/* Botão de Logout alinhado à direita */}
          <button type="button" className="btn btn-primary">
            Logout
          </button>
        </div>
      </nav>
         </div>
    )
}

export default MenuFuncionario;