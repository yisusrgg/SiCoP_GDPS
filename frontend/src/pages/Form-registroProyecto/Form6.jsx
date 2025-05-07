import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegistroProyecto from "../../components/RegistroProyecto";
import { useForm } from "react-hook-form";
import { getAllEmpresas } from "../../api/Empresa.api";
import { Button, Typography } from "@mui/material";

function Form6({handleNext, handleBack}) {
  const { register, handleSubmit } = useForm();
  const [empresa, setEmpresa] = useState([]);

  const navigation = useNavigate();

  const onSubmit = (userInfo) => {
    Object.entries(userInfo).map((e) => {
      var [key, value] = e;
      localStorage.setItem(key, value);
    });
    //navigation(`/RegistroProyecto/7`);
    handleNext();
  };

  useEffect(() => {
    async function loadEmpresa() {
      const res = await getAllEmpresas();
      setEmpresa(res.data);
    }
    loadEmpresa();
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <Typography
        variant="h6"
        align="center"
        sx={{ mb: 4 }}
        style={{ marginTop: "20px" }}
      >
        Selecciona la empresa que se le desarrollara el proyecto (en caso de no aparecer, presione añadir)
      </Typography>

      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
      <Button
          variant="text"
          color="primary"
          onClick={() => navigation(`/RegistroEmpresas`)}
        >
          Añadir empresa
        </Button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Seleccionar</th>
            <th scope="col">RFC</th>
            <th scope="col">Razon social</th>
            <th scope="col">Sector</th>
            <th scope="col">Tipo de empresa</th>
          </tr>
        </thead>
        <tbody>
          {empresa.map((empresa, i) => (
            <tr key={i}>
              <td>{empresa.companyName}</td>
              {/* <td>{empresa.rfc}</td>
              <td>{empresa.businessName}</td>
              <td>{empresa.sector}</td>
              <td>{empresa.companyType}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* BOTONES */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          onClick={handleBack}
          style={{
            marginLeft: "10px",
            borderColor: "#1B396A",
            color: "#1B396A",
            borderRadius: "20px",
          }}
          onMouseEnter={(e) => (
            (e.target.style.backgroundColor = "#1B396A"),
            (e.target.style.color = "#fff")
          )}
          onMouseLeave={(e) => (
            (e.target.style.backgroundColor = "transparent"),
            (e.target.style.color = "#1B396A")
          )}
        >
          Regresar
        </Button>
        <Button
          type="submit"
          variant="contained"
          style={{
            marginRight: "10px",
            backgroundColor: "#1B396A",
            color: "#fff",
            borderRadius: "20px",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#162e54")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#1B396A")}
        >
          Siguiente
        </Button>
      </div>
    </form>
  );
}

export default Form6;
