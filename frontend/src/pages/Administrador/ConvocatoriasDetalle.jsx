import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Box, CssBaseline, Typography, Card, CardContent, Button, Chip, IconButton, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Avatar, Collapse, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from '@mui/icons-material/Delete';

import AuthContext from '../../contexts/AuthContext';

export default function ConvocatoriasDetalle({ user = null }) {
        const navigate = useNavigate();
        const auth = useContext(AuthContext);
        const effectiveUser = user || auth?.user || null;
        const isAdmin = (() => {
            const u = effectiveUser;
            if (!u) return false;
            const roleCandidates = [u.type, u.Rol, u.role, u.rol, u.role_name];
            for (const r of roleCandidates) {
                if (!r) continue;
                const rr = String(r).toLowerCase();
                if (rr === 'administrador' || rr === 'admin') return true;
            }
            if (u.is_staff || u.is_superuser) return true;
            return false;
        })();
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [mensajeError, setMensajeError] = useState("");
    const [openAlert, setOpenAlert] = useState(false);

    // Datos de ejemplo (en producción vendrían de props, location.state o una API)
    const location = useLocation();
    const convocatoriaFromState = location?.state?.convocatoria ?? null;

    const convocatoria = convocatoriaFromState ?? {
        id: 1,
        convocatoria: "Convocatoria de Investigación 2024",
        estado: "Activa",
        fechaInicio: "2024-01-15",
        fechaFin: "2024-06-30",
        presupuesto: 500000,
        descripcion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.",
        requisitos: [
            "Ser investigador activo en la institución",
            "Contar con al menos dos años de experiencia",
            "Tener disponibilidad de tiempo completo",
            "Cumplir con los estándares académicos requeridos"
        ],
        areas: ["Ingeniería de Software", "Inteligencia Artificial", "Ciberseguridad"],
        archivo: null
    };

    const handleAplicar = () => {
        // Lógica para aplicar a la convocatoria
        console.log("Aplicar a convocatoria:", convocatoria.id);
    };

    const handleEliminar = () => {
        setOpenConfirmDelete(true);
    };

    const confirmDelete = async () => {
        try {
            const { deleteCall } = await import("../../api/Convocatoria.api");
            await deleteCall(convocatoria.id);
            setOpenConfirmDelete(false);
            navigate('/Administracion/Convocatorias');
        } catch (error) {
            console.error('Error eliminando convocatoria:', error);
            setMensajeError('No se pudo eliminar la convocatoria. Por favor intenta de nuevo.');
            setOpenAlert(true);
            setOpenConfirmDelete(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <CssBaseline />
            
            <Box sx={{ flex: 1, padding: "20px", mt: 2, mb: 4 }}>
                                <Box sx={{ maxWidth: 900, mx: 'auto' }}>
                                        <Collapse in={openAlert} sx={{ mb: 2 }}>
                                            <Alert severity="error" onClose={() => setOpenAlert(false)}>
                                                {mensajeError}
                                            </Alert>
                                        </Collapse>
                    {/* Encabezado */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                        <Box>
                            <Typography 
                                variant="h3" 
                                sx={{ 
                                    fontWeight: "bold",
                                    color: "primary.main",
                                    mb: 1
                                }}
                            >
                                {convocatoria.convocatoria}
                            </Typography>
                            <Chip 
                                label={convocatoria.estado} 
                                color={convocatoria.estado === 'Activa' ? 'success' : (convocatoria.estado === 'Cerrada' ? 'error' : 'warning')} 
                                size="small" 
                                sx={{ fontWeight: 'bold' }} 
                            />
                        </Box>
                        <IconButton
                            aria-label="atrás"
                            onClick={() => navigate(-1)}
                            sx={{
                                color: "grey.500",
                                "&:hover": {
                                    backgroundColor: "grey.100",
                                    transform: "scale(1.1)"
                                },
                                transition: "all 0.2s ease"
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Tarjeta Principal */}
                    <Card 
                        elevation={2} 
                        sx={{ 
                            borderRadius: 3,
                            mb: 3
                        }}
                    >
                        <CardContent sx={{ p: 4 }}>
                            {/* Fechas e Presupuesto */}
                            <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                        <CalendarTodayIcon sx={{ mr: 1, color: "primary.main" }} />
                                        <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                                            Fechas importantes
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <strong>Inicio:</strong> {convocatoria.fechaInicio}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Cierre:</strong> {convocatoria.fechaFin}
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 0.5 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                        <AttachMoneyIcon sx={{ mr: 1, color: "success.main" }} />
                                        <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                                            Presupuesto
                                        </Typography>
                                    </Box>
                                    <Typography variant="h5" sx={{ color: "success.main", fontWeight: "bold" }}>
                                        {typeof convocatoria.presupuesto === 'number'
                                            ? convocatoria.presupuesto.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
                                            : convocatoria.presupuesto}
                                    </Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            {/* Descripción */}
                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <DescriptionIcon sx={{ mr: 1, color: "info.main" }} />
                                    <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                                        Descripción
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        lineHeight: 1.6,
                                        textAlign: "justify",
                                        color: "text.secondary"
                                    }}
                                >
                                    {convocatoria.descripcion}
                                </Typography>
                            </Box>

                            {/* Áreas de investigación */}
                            {convocatoria.areas && convocatoria.areas.length > 0 && (
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2 }}>
                                        Áreas de investigación
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        {convocatoria.areas.map((area, index) => (
                                            <Chip key={index} label={area} size="small" variant="outlined" color="primary" />
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            <Divider sx={{ my: 3 }} />

                            {/* Requisitos */}
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }}>
                                    Requisitos principales
                                </Typography>
                                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                    {convocatoria.requisitos.map((requisito, index) => (
                                        <Typography
                                            component="li"
                                            key={index}
                                            variant="body1"
                                            sx={{ mb: 1.5, color: "text.secondary" }}
                                        >
                                            {requisito}
                                        </Typography>
                                    ))}
                                </Box>
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            {/* Botones de acción */}
                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pt: 2 }}>
                                                                {isAdmin && (
                                                                    <Button
                                                                        variant="outlined"
                                                                        color="error"
                                                                        startIcon={<DeleteIcon />}
                                                                        onClick={handleEliminar}
                                                                        sx={{ borderRadius: 2 }}
                                                                    >
                                                                        Eliminar
                                                                    </Button>
                                                                )}

                                                                <Button
                                    variant="outlined"
                                    onClick={() => navigate(-1)}
                                    sx={{ borderRadius: 2 }}
                                >
                                    Atrás
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={convocatoria.estado === "Cerrada"}
                                    onClick={handleAplicar}
                                    sx={{
                                        borderRadius: 2,
                                        px: 3,
                                        "&:hover": {
                                            transform: "translateY(-1px)",
                                            boxShadow: 6
                                        },
                                        transition: "all 0.2s ease"
                                    }}
                                >
                                    {convocatoria.estado === "Cerrada" ? "Convocatoria Cerrada" : "Aplicar Ahora"}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

                        {/* Dialog de confirmación para eliminar */}
                        <Dialog
                            open={openConfirmDelete}
                            onClose={() => setOpenConfirmDelete(false)}
                            maxWidth="xs"
                            fullWidth
                            sx={{ zIndex: 2100 }}
                            PaperProps={{
                                sx: {
                                    borderRadius: 3,
                                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                                    overflow: 'hidden',
                                    width: '350px',
                                    maxHeight: '400px'
                                }
                            }}
                        >
                            <DialogTitle sx={{
                                textAlign: 'center',
                                p: 2,
                                backgroundColor: '#d32f2f',
                                color: 'white',
                                fontWeight: 'bold',
                                position: 'relative'
                            }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 45, height: 45 }}>
                                        <DeleteIcon fontSize="medium" />
                                    </Avatar>
                                    <Typography variant="h6" fontWeight="bold" fontSize="1rem">Eliminar Convocatoria</Typography>
                                </Box>
                            </DialogTitle>
                            <DialogContent sx={{ pt: '28px', pb: 2, textAlign: 'center', backgroundColor: 'white', px: 3 }}>
                                <Typography variant="body1" sx={{ mt: 2, mb: 2, color: 'text.primary', fontWeight: 'bold' }}>
                                    ¿Está seguro de eliminar la convocatoria?
                                </Typography>
                                <DialogContentText sx={{ fontSize: '0.85rem', color: 'text.primary', lineHeight: 1.3 }}>
                                    Esta acción eliminará permanentemente la convocatoria y no podrá deshacerse.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ p: 2.5, justifyContent: 'center', gap: 2, backgroundColor: 'white' }}>
                                <Button onClick={() => setOpenConfirmDelete(false)} variant="outlined" size="medium" sx={{ borderRadius: 2, px: 2.5, py: 1, borderColor: '#1B396A', color: '#1B396A', fontWeight: 'bold', fontSize: '0.9rem' }}>Cancelar</Button>
                                <Button onClick={confirmDelete} variant="contained" autoFocus size="medium" startIcon={<DeleteIcon fontSize="small" />} sx={{ borderRadius: 2, px: 2.5, py: 1, backgroundColor: '#d32f2f', color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>Eliminar</Button>
                            </DialogActions>
                        </Dialog>
        </Box>
    );
}