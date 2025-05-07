import React from "react";
import { useState, useEffect } from "react";
import { getAllInvestigadores } from "../../api/Investigadores.api";
import { useNavigate } from "react-router-dom";
import RegistroProyecto from "../../components/RegistroProyecto";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@mui/material";

function Form4({handleNext, handleBack}) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (userInfo) => {
    Object.entries(userInfo).map((e) => {
      var [key, value] = e;
      localStorage.setItem(key, value);
    });
    //navigate(`/RegistroProyecto/5`);
    handleNext();
  };

  const navigate = useNavigate();

  const [inv, setInv] = useState([]);

  useEffect(() => {
    async function loadInv() {
      const res = await getAllInvestigadores();
      setInv(res.data);
    }
    loadInv();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography
        variant="h6"
        align="center"
        sx={{ mb: 4 }}
        style={{ marginTop: "20px" }}
      >
        Añade los investigadores que participaran el proyecto (si no se cuenta con alguno salta este paso)
      </Typography>
      {/*TABLA DE INVESTIGADORES*/}
      <table className="table">
        {/*ENCABEZADOS*/}
        <thead>
          <tr>
            <th scope="col">Añadir</th>
            <th scope="col">CURP</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Carrera</th>
          </tr>
        </thead>
        {/*INVESTIGADORES*/}
        <tbody>
          {inv.map((inv, i) => (
            <tr key={i}>
              <td scope="row">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
              </td>
              <td>{inv.curp}</td>
              <td>{inv.name}</td>
              <td>{inv.last_name}</td>
              <td>{inv.career}</td>
            </tr>
          ))}

          {/* {inv.map((inv, i) => (
            <inv key={i} Inv={inv} {...register(key)} />
          ))} */}
        </tbody>
      </table>

      {/* BOTONES */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              style={{
                marginLeft: "10px",
                borderColor: "#1B396A",
                color: "#1B396A",
                borderRadius: "20px",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#1B396A", e.target.style.color = "#fff")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent", e.target.style.color = "#1B396A")}
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
export default Form4;
