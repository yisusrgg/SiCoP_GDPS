import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import RegistroProyecto from "../../components/RegistroProyecto";

export default function RegistroConvocatorias() {
  const navigate = useNavigate();

  const messages = {
    req: "Este campo es obligatorio",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (userInfo) => {
    Object.entries(userInfo).map((e) => {
      var [key, value] = e;
      localStorage.setItem(key, value);
      console.log(key + ": " + value);
    });
    navigate(``);
  };

  {
    /*const onSubmit = handleSubmit(async (data)=>{
        const rest = await createCall(data);
        console.log(res);

    });*/
  }
  return (
    <div
      style={{ minWidth: 20, marginTop: 60, paddingLeft: 50, paddingRight: 50 }}
    >
      <RegistroProyecto
        title="Registro de convocatoria"
        description="Llena la informacion correspondiente a la convocatoria"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*NOMBRE DE LA CONVOCATORIA*/}
        <div className="p-3 row">
          <label htmlFor="InputNombre" className="col-sm-2 col-form-label">
            Nombre de la convocatoria
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputNombre"
              {...register("nombre", {
                required: true,
              })}
            />
            {errors.nombre && (
              <p style={{ color: "#E11306" }}>{messages.req}</p>
            )}
          </div>
        </div>

        {/*RFC de la empresa*/}
        <div className="p-3 row">
          <label htmlFor="InputRFC" className="col-sm-2 col-form-label">
            RFC de la empresa
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputRFC"
              {...register("rfc", {
                required: true,
              })}
            />
            {errors.rfc && <p style={{ color: "#E11306" }}>{messages.req}</p>}
          </div>
        </div>

        <div>
          <div className="p-3 row">
            {/*FECHA INICIO*/}
            <div class="col-sm">
              <label className="col-form-label">Fecha de inicio</label>
            </div>
            <TextField
              type="date"
              variant="outlined"
              fullWidth
              error={!!errors.descripcion}
              InputProps={{
                endAdornment: errors.descripcion ? (
                  <InputAdornment position="end">
                    <ErrorIcon color="error" />
                  </InputAdornment>
                ) : null,
              }}
            />
            {/*FECHA INICIO*/}
            <div class="pt-4 col-sm">
              <label className="col-form-label">Fecha de fin</label>
            </div>
            <TextField
              type="date"
              variant="outlined"
              fullWidth
              error={!!errors.descripcion}
              InputProps={{
                endAdornment: errors.descripcion ? (
                  <InputAdornment position="end">
                    <ErrorIcon color="error" />
                  </InputAdornment>
                ) : null,
              }}
            />
          </div>
        </div>

        {/*Descripcion*/}
        <div className="p-3 row">
          <label className="col-sm-2 col-form-label">
            Descripcion de la convocatoria
          </label>
          <div className="col-sm-10">
            <textarea
              class="form-control"
              rows="3"
              {...register("descripcion", {
                required: true,
              })}
            />
            {errors.descripcion && (
              <p style={{ color: "#E11306" }}>{messages.req}</p>
            )}
          </div>
        </div>
        {/*LINK DE LA CONVOCATORIA*/}
        <div className="p-3 row">
          <label htmlFor="InputLink" className="col-sm-2 col-form-label">
            Link de la convocatoria
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputNombre"
              {...register("link", {
                required: true,
              })}
            />
            {errors.nombre && (
              <p style={{ color: "#E11306" }}>{messages.req}</p>
            )}
          </div>
        </div>
        {/*BOTONES*/}
        <Grid item xs={12} container justifyContent="space-between">
          <Button
            variant="outlined"
            disabled
            onClick={() => window.history.back()}
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
            Registrar
          </Button>
        </Grid>
      </form>
    </div>
  );
}
