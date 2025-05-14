

const CredentialsUser = ({ title })=> {

    // Estilos personalizados

    const customStyles = {
       
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fafdf4",
        padding: "5px",
        marginBottom: "15px",
        marginTop: "15px",
        width: "100%",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        color: "#721c24",
        fontSize: "14px"

    }

    const pageInfo = {
        backgroundColor: "#fafdf4",
        color: "#f7999f",
        fontWeight: "bold",
        padding: "10px"
    }

    const userInfo = {
        backgroundColor: "#fafdf4",
        color: "#f7999f",
        padding: "10px"
    }

    return (
        <div style={customStyles}>
            <div style={pageInfo}>{title}</div>
            <div style={userInfo}>
                Usuário: emailuser@gmail.com | Função: Funcionário
            </div>
        
        </div>
    )

}

export default CredentialsUser;