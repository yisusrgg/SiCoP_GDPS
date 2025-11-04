import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AlumnosRegistro from "./pages/AlumnosRegistro";
import InvRegistro from './pages/InvRegistro';
import Proyectos  from "./pages/Proyectos";
import EmpresaRegistro from "./pages/EmpresaRegistro";
import Archivos from './pages/DetallesProyecto/Archivos';
import Alumnos from "./pages/DetallesProyecto/Alumnos";
import General from "./pages/DetallesProyecto/General";
import Investigadores from './pages/DetallesProyecto/Investigadores';
import Institucion from './pages/DetallesProyecto/Institucion';
import Metas from './pages/DetallesProyecto/Metas';
import Convocatorias from './pages/Administrador/Convocatorias';
import NotFound from './pages/NotFound';
import RegistroConvocatorias from './pages/Administrador/RegistroConvocatorias';
import ConvocatoriasDetalle from './pages/Administrador/ConvocatoriasDetalle';
import Register from './pages/Form-registroProyecto/Register';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import CrudInvestigadores from './pages/Administrador/CrudInvestigadores';
import CrudProyectos from './pages/Administrador/CrudProyectos';
import FormProyecto from "./pages/Form-registroProyecto/FormProyecto";
import CrudLGAC from './pages/Administrador/CrudLGAC';
import EditarProyectos from './pages/Administrador/EditarProyectos'; 
import CrudEstudiantes from "./pages/CrudEstudiantes";
import Estudiantes from "./Estudiantes";
import RegistroEmpresa from "./RegistroEmpresa";
import Empresas from "./Empresas";
import CrudEmpresas from "./CrudEmpresas";
import Colaboradores from "./pages/Colaboradores";
import CrudColaboradores from "./pages/CrudColaboradores";
import ColaborRegistro from "./pages/ColaborRegistro";
import VinculacionFinanciamiento from "./Vinculacion_Financiamiento";
import RegistrarLGAC from "./RegistrarLGAC";
import RegistroInvestigadores from './pages/Administrador/RegistroInvestigadores';
import ConvocatoriasInvestigador from './pages/ConvocatoriasInvestigador';
import RegistroProyecto1 from "./pages/RegistroProyecto1";
import RegistroProyecto2 from "./pages/RegistroProyecto2";
import Login from "./Login";
import ConvocatoriaDetalle from './pages/Investigador/ConvocatoriaDetalle';
//import ST from "./pages/students/StudentsList";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className='conatiner mx-auto'>
      <Routes>
        {/* <Route path='/' element={<Convocatorias/>}/> */}
        <Route path='/Proyectos' element={<Proyectos/>}/>
        <Route path='/RegistroAlumnos' element={<AlumnosRegistro/>}/>
        <Route path='/RegistroInv' element={<InvRegistro/>}/>
        <Route path='/RegistroProyecto' element={<FormProyecto/>}/>
        <Route path='/RegistroEmpresas' element={<EmpresaRegistro/>}/>
        <Route path='/Detalles/Archivos' element={<Archivos/>}/>
        <Route path='/Detalles/Alumnos' element={<Alumnos/>}/>
        <Route path='/Detalles/General' element={<General/>}/>
        <Route path='/Detalles/Investigadores' element={<Investigadores/>}/>
        <Route path='/Detalles/Institucion' element={<Institucion/>}/>
        <Route path='/Detalles/Metas' element={<Metas/>}/>
        <Route path='/Administracion/Convocatorias' element={<Convocatorias/>}/>
        <Route path='/Administracion/Investigadores' element={<CrudInvestigadores/>}/>
        <Route path='/Administracion/Proyectos' element={<CrudProyectos/>}/>
        <Route path="/RegistroProyectodos" element={<FormProyecto />} />
        <Route path='/Administracion/LGAC' element={<CrudLGAC/>}/>
        <Route path='/NoTerminada' element={<NotFound/>}/>
        <Route path='/Administracion/RegistroConvocatorias' element={<RegistroConvocatorias/>}/>
        <Route path='/Administracion/ConvocatoriasDetalle' element={<ConvocatoriasDetalle/>}/>
        <Route path="/EditarProyecto" element={<EditarProyectos />} />
        <Route path="/Estudiantes" element={<Estudiantes />} />
        <Route path="/CrudEstudiantes" element={<CrudEstudiantes />} />
        <Route path="/RegistroEmpresa" element={<RegistroEmpresa />} />
        <Route path="/Empresas" element={<Empresas />} />
        <Route path="/CrudEmpresas" element={<CrudEmpresas />} />
        <Route path="/Colaboradores" element={<Colaboradores />} />
        <Route path="/CrudColaboradores" element={<CrudColaboradores />} />
        <Route path="/Administracion/RegistroColaborador" element={<ColaborRegistro />} />
        <Route path="/VinculacionFinanciamiento" element={<VinculacionFinanciamiento />} />
        <Route path="/Administracion/RegistroLGAC" element={<RegistrarLGAC />} />
        <Route path="/Administracion/RegistroInvestigador" element={<RegistroInvestigadores />} />
        <Route path="/ConvocatoriasInvestigador" element={<ConvocatoriasInvestigador />} />
        <Route path="/ConvocatoriaDetalle/:id" element={<ConvocatoriaDetalle />} />
        <Route path="/RegistroProyecto1" element={<RegistroProyecto1 />} />
        <Route path="/RegistroProyecto2" element={<RegistroProyecto2 />} />
        <Route path="/" element={<Login />} />
      </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
