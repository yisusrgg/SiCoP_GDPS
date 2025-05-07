import { useEffect, useState } from "react";
import { getAllConovocatorias} from "../api/Convocatoria.api";

function LiderOptions() {
  const [investigadores,setInvestigadores]=useState([]);

  useEffect(() => {
    async function loadConvocatorias(){
      const ans = await getAllConovocatorias();
      setInvestigadores(ans.data)
    }
    loadConvocatorias();
  });

  return (
    //Retorna de todos los investigadores que obtiene del getall de la api investigadores un option para cada uno
     investigadores.map((investigador)=>{
        <option value={investigador.id}>{investigador.nombre}</option>
     })
  )
}

export default LiderOptions