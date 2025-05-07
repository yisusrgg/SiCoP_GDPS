import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import ProyectoList from "../components/ProyectoList";

export default function Proyectos() {
    const navigate = useNavigate();
    return (
    <div className="max-w-xl mx-auto pt-5">
        <div className="text-center pt-2">
            <h1>Mis Proyectos</h1>
            <button type="button" class="btn btn-link" onClick={()=>navigate(`/RegistroProyecto`)}>Registra tu proyecto</button>
        </div>
        <ProyectoList/>
    </div>
  );
}