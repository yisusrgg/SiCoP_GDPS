import {useState} from "react";
import * as React from 'react';
import RegistroProyecto from "../../components/RegistroProyecto";
import { useForm } from "react-hook-form";
import ConvocatoriasOptions from "../../components/ConvocatoriasOptions";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

let data = new Map();

function Form7({handleBack}) {

  function generadorClave(){
    const fecha = new Date();
    const Año = fecha.getFullYear();
    const mesActual = fecha.getMonth() + 1; 
    
    // * Estructura:
    // ? ITSUR-PI-[Periodo AD, EJ| Año| Mes]-ID
    return "ITSUR-PI-"+(mesActual<7?'EJ':'AD')+Año.toString().slice(2)+(mesActual<10?
      '0'+mesActual:mesActual)+"-ID";
  }

  const [clave] = useState(generadorClave())
  const [value, setValue] = useState([])
  const {register,formState:{errors},handleSubmit} = useForm();

  const navigation = useNavigate();

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    localStorage.clear()
    navigation(`/`);
  };

  const messages = {
    req: "Este campo es obligatorio",
   };

   

  const GetData = () =>{
    for (let i = 0; i < localStorage.length; i++) {
      //console.log(localStorage.key(i)+" "+localStorage.getItem(localStorage.key(i))) 
      data.set(localStorage.key(i),localStorage.getItem(localStorage.key(i)))
    } 
  };

  const onSubmit = (userInfo) => {
    Object.entries(userInfo).map(e=>{
      var[key,value]=e;
      localStorage.setItem(key,value)
      GetData()
      // TODO: poner metodo de enviar al backend
    })
    //MOSTRAR MENSAJE y registrar la informacion en la bd (Pendiente: generacion de la clave)
    handleClickOpen()
  };

  return (
    <div>
      <RegistroProyecto title="Vinculacion y financiamiento" description="Captura los campos con la información correspondiente, valida la información antes de seguir"/>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/*Convocatoria*/}
        <div className="p-3 row">
          <label
            className="col-sm-2 col-form-label">
            Convocatoria
          </label>        
          <div className="col-sm-10">
            <select
              className="form-select"
              aria-label="Default select example"
              {...register('convocatoria',{
                required: true
              })}
            >
              <option value="0">Hello world</option>
              <ConvocatoriasOptions/>
            </select>
            {errors.convocatoria && <p style={{color: '#E11306'}}>{messages.req}</p>}
          </div>
        </div>

        {/*¿Tiene financiamieto?*/}
        <div>
          <label
            className="col-sm-2 col-form-label"
          >
            ¿Tiene financiamiento?
          </label>

          {/*SI*/}
          <div className="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              value="Si"
              onChange={e => setValue(e.currentTarget.value)}/>
            
            <label class="form-check-label" for="inlineRadio1">
              Si
            </label>
          </div>

          {/*NO*/}
          <div className="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              value="No"
              onChange={e => setValue(e.currentTarget.value)}
            />
            <label class="form-check-label" for="inlineRadio2">
              No
            </label>
          </div>

          {/*APARICION DE DATOS EXTRAS*/}
          { value==="Si" ? (
          <div>

            {/*¿Quien financia?*/}
            <div>
            <div className="p-3 row">
              <label
                className="col-sm-2 col-form-label"
              >
                ¿Quien financía?
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  {...register('financiador')}
                >
                  <option value="1"></option>
                  <option value="2"></option>
                  <option value="3"></option>
                </select>
              </div>
            </div>
          </div>
          
          {/*MONTO*/}
          <div  className="p-3 row">
            <label className="col-sm-2 col-form-label">
              Monto ($)
            </label>
            <div className="col-sm-10">
              <input type="number" min={0} defaultValue={0} class="form-control" {...register('monto')}/>
            </div>
          </div>

          {/*Fechas de financiamiento*/}
          <div className="row g-3 align-items-center" >
            <div className="col-auto">
              <label className="col-form-label" >
                Fechas de financiamiento
              </label>
            </div>
            <div className="col-auto">
              <label className="col-form-label">
                Inicio
              </label>
            </div>
            <div className="col-auto">
              <input type="date" className="form-control" defaultValue={null} {...register('inicio')}/>
            </div>
            <div className="col-auto">
              <label className="col-form-label" >
                Fin
              </label>
            </div>
            <div className="col-auto">
              <input type="date" className="form-control" defaultValue={null} {...register('fin')}/>
            </div>
          </div>
          </div>
        ):null}
        </div>

        

        <div className="form-text text-center p-3">
            En caso de que registre un dato mal, podrá modificarlo posteriormente, sin embargo, se recomienda verificar la información antes de registrar el proyecto 
        </div>
        {/*BOTONES*/}
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
         type="submit" onClick={
          ()=>{console.log(data)}}
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
      </div>


  

      </form>
      
      {/*Dialogo de confirmacion*/}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"El proyecto "+data.get("nombre")+" ha sido creado exitosamente"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"clave de proyecto: "+clave}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>handleClose()} >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default Form7;
