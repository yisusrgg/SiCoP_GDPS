import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import AlumnosRegistro from "./pages/AlumnosRegistro";
import Proyectos from "./pages/Proyectos";
import Archivos from './pages/DetallesProyecto/Archivos';
import Metas from './pages/DetallesProyecto/Metas';
import Convocatorias from './pages/Administrador/Convocatorias';
import NotFound from './pages/NotFound';
import RegistroConvocatorias from './pages/Administrador/RegistroConvocatorias';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import CrudInvestigadores from './pages/Administrador/CrudInvestigadores';
import CrudProyectos from './pages/Administrador/CrudProyectos';
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
import RegistrarLGAC from "./pages/Administrador/RegistrarLGAC";
import RegistroInvestigadores from './pages/Administrador/RegistroInvestigadores';
import RequireRole from './components/RequireRole';
import ConvocatoriasInvestigador from './pages/ConvocatoriasInvestigador';
import RegistroProyecto1 from "./pages/RegistroProyecto1";
import RegistroProyecto2 from "./pages/RegistroProyecto2";
import { RegistroProyectoProvider } from './components/Context';
import Login from "./Login";
import ConvocatoriasDetalle from './pages/Administrador/ConvocatoriasDetalle';
//import ST from "./pages/students/StudentsList";
// Prueba de subida a GitHub
// Prueba de subida a GitHub

function Layout({ children }) {
  const location = useLocation();

  // Oculta NavBar y Footer en la ruta de login
  const hideLayout = location.pathname === "/";

  return (
    <>
      {!hideLayout && <NavBar />}
      <div className='container mx-auto'>
        {children}
      </div>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className='conatiner mx-auto'>
        <RegistroProyectoProvider>
          <Layout>
            <Routes>

              {/* ADMINISTRADOR */}
              <Route path='/Administracion/Convocatorias' element={
                <RequireRole allowedRoles={["Administrador"]}>
                  <Convocatorias />
                </RequireRole>
              } />
              <Route path='/Administracion/Investigadores' element={
                <RequireRole allowedRoles={["Administrador"]}>
                  <CrudInvestigadores />
                </RequireRole>
              } />
              <Route path='/Administracion/LGAC' element={
                <RequireRole allowedRoles={["Administrador"]}>
                  <CrudLGAC />
                </RequireRole>
              } />
              <Route path="/Administracion/RegistroLGAC" element={
                <RequireRole allowedRoles={["Administrador"]}>
                  <RegistrarLGAC />
                </RequireRole>
              } />
              <Route path='/Administracion/Proyectos' element={
                <RequireRole allowedRoles={["Administrador"]}>
                  <CrudProyectos />
                </RequireRole>
              } />
              <Route path="/EditarProyecto" element={<EditarProyectos />} />
              <Route path="/Administracion/RegistroInvestigador" element={
                <RequireRole allowedRoles={["Administrador"]}>
                  <RegistroInvestigadores />
                </RequireRole>
              } />
              <Route path='/Administracion/RegistroConvocatorias' element={
                <RequireRole allowedRoles={["Administrador"]}>
                  <RegistroConvocatorias />
                </RequireRole>
              } />
              <Route path="/Administracion/RegistroColaborador" element={
                <RequireRole allowedRoles={["Administrador"]}>
                  <ColaborRegistro />
                </RequireRole>
              } />

              <Route path="/Administracion/ConvocatoriasDetalle" element={
                <RequireRole allowedRoles={["Administrador","Investigador"]}>
                  <ConvocatoriasDetalle />
                </RequireRole>
              } />

              {/* INVESTIGADOR */}
              <Route path="/ConvocatoriasInvestigador" element={
                <RequireRole allowedRoles={["Investigador"]}>
                  <ConvocatoriasInvestigador />
                </RequireRole>
              } />
              <Route path='/Proyectos' element={
                <RequireRole allowedRoles={["Investigador"]}>
                  <Proyectos />
                </RequireRole>
              } />

              {/* REGISTRO DE PROYECTO */}
              <Route path="/RegistroProyecto1" element={<RegistroProyecto1 />} />
              <Route path="/RegistroProyecto2" element={<RegistroProyecto2 />} />
              <Route path='/Detalles/Metas' element={<Metas />} />
              <Route path="/Colaboradores" element={<Colaboradores />} />
              <Route path="/CrudColaboradores" element={<CrudColaboradores />} />
              <Route path="/Estudiantes" element={<Estudiantes />} />
              <Route path="/CrudEstudiantes" element={<CrudEstudiantes />} />
              <Route path='/RegistroAlumnos' element={<AlumnosRegistro />} />
              <Route path="/Empresas" element={<Empresas />} />
              <Route path="/CrudEmpresas" element={<CrudEmpresas />} />
              <Route path="/RegistroEmpresa" element={<RegistroEmpresa />} />
              <Route path="/VinculacionFinanciamiento" element={<VinculacionFinanciamiento />} />
              <Route path='/Detalles/Archivos' element={<Archivos />} />
              <Route path='/NoTerminada' element={<NotFound />} />
              <Route path="/" element={<Login />} />

              {/* modo Editar */}
              <Route path="/Administracion/RegistroInvestigador/:id" element={<RegistroInvestigadores />} />

              {/* Ruta no existente */}
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </Layout>
        </RegistroProyectoProvider>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
