import Alumnos from "../../components/Alumnos";
import { useState, useEffect } from "react";
import { getAllAlumnos } from "../../api/Alumno.api";
import { useNavigate } from "react-router-dom";
import RegistroProyecto from "../../components/RegistroProyecto";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@mui/material";
import AlumnosRegistro from "../AlumnosRegistro";

function Form5({ handleNext, handleBack }) {
  const { register, handleSubmit } = useForm();
  const navigation = useNavigate();
  const [alumno, setAlumnos] = useState([]);

  const onSubmit = (userInfo) => {
    Object.entries(userInfo).map((e) => {
      var [key, value] = e;
      localStorage.setItem(key, value);
    });
    //navigate(`/RegistroProyecto/6`);
    handleNext();
  };

  useEffect(() => {
    async function loadAlumnos() {
      const res = await getAllAlumnos();
      setAlumnos(res.data);
    }
    loadAlumnos();
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography
        variant="h6"
        align="center"
        sx={{ mb: 4 }}
        style={{ marginTop: "20px" }}
      >
        Añade los alumnos que participaran el proyecto (si no se cuenta con alguno salta este paso)
      </Typography>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
      <Button
          variant="text"
          color="primary"
          onClick={() => navigation(`/RegistroAlumnos`)}
        >
          Añadir alumno
        </Button>
      </div>

      <table className="table">
        <thead>
          <tr>
            {/*ENCABEZADOS*/}
            <th scope="col">Añadir</th>
            <th scope="col">No. Control</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Semestre</th>
            <th scope="col">Carrera</th>
          </tr>
        </thead>
        <tbody>
          {alumno.map((alumno, i) => (
            <tr key={i}>
              <td scope="row">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
              </td>
              <td>{alumno.controlN}</td>
              <td>{alumno.name}</td>
              <td>{alumno.last_name}</td>
              <td>{alumno.semester}</td>
              <td>{alumno.career}</td>
            </tr>
          ))}
          {/* {
            //CARGA DE DATOS
            Investigadores.map(investigador => (
                <Alumnos key={investigador.id} Inv={investigador} {...register(key)}/>
            ))
          } */}
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

export default Form5;
