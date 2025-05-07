import { Grid, CssBaseline, Typography } from "@mui/material";
import ConvocatoriasCard from "../../components/ConvocatoriasCard";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import SideBarAdmin from "../../components/SideBarAdmin";

export default function Proyectos({ user = { type: "Admin" } }) {
  const navigate = useNavigate();
  return (
    <div className="max-w-xl mx-auto text-center">
      <CssBaseline />
      {user && user.type === "Admin" && (
        <nav>
          <SideBarAdmin />
        </nav>
      )}
      <div
        className="text-center"
        style={(user && user.type === "Admin") ? { paddingTop: "50px", marginLeft: "80px"} : { paddingTop: "50px"}}
      >
        <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
          Convocatorias
        </Typography>
        {user && user.type === "Admin" && (
          <button
            type="button"
            class="btn btn-link"
            onClick={() => navigate(`/Administracion/RegistroConvocatorias`)}
          >
            Registrar Convocatoria
          </button>
        )}
        <p>
          Conoce las diversas convocatorias activas, en las que puedes
          participar para superarte a ti mismo, ayudando a transformar e innovar
          nuestra comunidad
        </p>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ padding: 30 }}
        >
          {Array.from(Array(6)).map((_, index) => (
            <Grid xs={2} sm={4} md={4} className="p-2" key={index}>
              <ConvocatoriasCard />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
