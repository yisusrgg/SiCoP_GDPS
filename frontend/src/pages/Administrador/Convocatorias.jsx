import React, { useEffect, useState, useRef } from "react";
import { Grid, CssBaseline, Typography, Box, IconButton, Modal, Card, CardContent, Fade, Backdrop, Button, Chip, Divider } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ConvocatoriasCard from "../../components/ConvocatoriasCard";
import { useNavigate } from "react-router-dom";
import SideBarAdmin from "../../components/SideBarAdmin";
import { getAllConvocatorias } from "../../api/Convocatoria.api";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";

export default function Convocatorias({ user = { type: "Admin" } }) {
  const navigate = useNavigate();
  const [convocatorias, setConvocatorias] = useState([]);

  const sliderRef = useRef(null);
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideWidth, setSlideWidth] = useState(null);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedConvocatoria, setSelectedConvocatoria] = useState(null);

  const handleOpenModal = (convocatoria) => {
    setSelectedConvocatoria(convocatoria);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedConvocatoria(null);
  };

  const buildArchivoUrl = (archivo) => {
    if (!archivo) return null;
    if (typeof archivo === 'string') {
      if (archivo.startsWith('http')) return archivo;
      if (archivo.startsWith('/media')) return `http://127.0.0.1:8000${archivo}`;
      return `http://127.0.0.1:8000/media/${archivo}`;
    }
    if (archivo.url) return archivo.url;
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllConvocatorias();
        const datos = (data || []).map((item) => ({
          id: item.clave_convocatoria,
          convocatoria: item.convocatoria,
          fechaInicio: item.fechaInicioConvocatoria || item.fechaInicioFinanciamiento || item.fechaInicio,
          fechaFin: item.fechaFinConvocatoria || item.fechaFinFinanciamiento || item.fechaFin,
          presupuesto: item.presupuesto,
          descripcion: item.descripcion,
          requisitos: Array.isArray(item.requisitos) ? item.requisitos : item.requisitos ? [item.requisitos] : [],
          archivo: item.archivo,
          estado: item.estado || 'Activa',
          areas: Array.isArray(item.areas) ? item.areas : item.areas ? [item.areas] : (item.lineas || []),
        }));
        setConvocatorias(datos);
        setActiveIndex(0);
      } catch (err) {
        console.error("Error fetching convocatorias:", err);
      }
    };
    fetchData();
  }, []);

  // compute slideWidth and itemsPerView (use same logic as investigador)
  useEffect(() => {
    const computeSizes = () => {
      const wrap = wrapperRef.current;
      const sliderEl = sliderRef.current;
      if (!wrap || !sliderEl) return;
      const ww = wrap.clientWidth;

      const style = window.getComputedStyle(sliderEl);
      const gapPx = parseFloat(style.columnGap || style.gap) || 0;
      const padL = parseFloat(style.paddingLeft) || 0;
      const padR = parseFloat(style.paddingRight) || 0;

      const MIN_CARD_PX = 220;
      let items = 3;
      if (ww < 600) items = 1;
      else if (ww < 900) items = 2;
      else items = 3;

      let effectiveItems = items;
      let available = ww - padL - padR - (effectiveItems - 1) * gapPx;
      let single = Math.floor(available / effectiveItems);
      while (effectiveItems > 1 && single < MIN_CARD_PX) {
        effectiveItems -= 1;
        available = ww - padL - padR - (effectiveItems - 1) * gapPx;
        single = Math.floor(available / effectiveItems);
      }

      setItemsPerView(effectiveItems);
      setSlideWidth(single);

      const maxIndex = Math.max(0, (convocatorias || []).length - effectiveItems);
      setActiveIndex(ai => Math.min(ai, maxIndex));
    };

    computeSizes();
    window.addEventListener('resize', computeSizes);
    return () => window.removeEventListener('resize', computeSizes);
  }, [convocatorias]);

  // scroll to active
  useEffect(() => {
    const el = sliderRef.current;
    if (!el || !slideWidth) return;
    const maxIndex = Math.max(0, convocatorias.length - itemsPerView);
    const idx = Math.min(activeIndex, maxIndex);
    const child = el.children[idx];
    if (child) el.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
  }, [activeIndex, slideWidth, itemsPerView, convocatorias]);

  useEffect(() => {
    if (isPaused) return undefined;
    if (!convocatorias || convocatorias.length <= 1 || !slideWidth) return undefined;
    const maxIndex = Math.max(0, convocatorias.length - itemsPerView);
    const interval = setInterval(() => {
      setActiveIndex(i => (i >= maxIndex ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, convocatorias, slideWidth, itemsPerView]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', justifyContent: 'center' }}>
      <CssBaseline />
      {user && user.type === "Admin" && (
        <nav>
          <SideBarAdmin />
        </nav>
      )}
      <Box sx={{ flex: 1, padding: "20px", mt: 7, mb: 7, overflowX: "hidden", pb: { xs: 8, sm: 12 } }}>
        <Typography variant="h3" align="center" style={{ marginTop: "20px" }}>
          Convocatorias
        </Typography>
        <Box sx={{ textAlign: "center", mb: "20px", mt: "20px" }}>
          {user && user.type === "Admin" && (
            <button
              type="button"
              className="btn btn-link"
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
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', px: { xs: 1, sm: 4 }, py: 3 }}>
          <Box ref={wrapperRef} sx={{ position: 'relative', width: '100%', maxWidth: 'min(1200px, 95vw)', mx: 'auto', overflow: 'visible', pb: { xs: 6, sm: 8 }, pt: 2 }}>

            {convocatorias.length > 0 && (
              <IconButton
                aria-label="anterior"
                onClick={() => setActiveIndex(i => Math.max(0, i - 1))}
                sx={{ position: 'absolute', left: -56, top: '45%', transform: 'translateY(-50%)', zIndex: 30, bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' }, width: 40, height: 40 }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
              </IconButton>
            )}

            <Box
              ref={sliderRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              sx={{
                display: 'flex',
                gap: 2,
                overflowX: 'auto',
                overflowY: 'visible',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                p: 0,
                py: 2,
                alignItems: 'flex-start',
                width: '100%',
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {convocatorias.length === 0 ? (
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  <Typography variant="body1">No hay convocatorias disponibles.</Typography>
                </Box>
              ) : (
                convocatorias.map((convocatoria, idx) => (
                  <Box key={convocatoria.id || idx} sx={{ flex: '0 0 auto', scrollSnapAlign: 'start', ml: idx === 0 ? 6 : 0, mr: idx === convocatorias.length - 1 ? 6 : 0 }} style={slideWidth ? { width: `${slideWidth}px` } : undefined}>
                    <div onClick={() => setActiveIndex(idx)}>
                      <ConvocatoriasCard
                        isActive={idx === activeIndex}
                        convocatoria={{ convocatoria: convocatoria.convocatoria, fechaInicioFinanciamiento: convocatoria.fechaInicio, fechaFinFinanciamiento: convocatoria.fechaFin, archivo: convocatoria.archivo }}
                        onClick={() => handleOpenModal(convocatoria)}
                      />
                    </div>
                  </Box>
                ))
              )}
            </Box>

            {convocatorias.length > 0 && (
              <IconButton
                aria-label="siguiente"
                onClick={() => {
                  const maxIndex = Math.max(0, convocatorias.length - itemsPerView);
                  setActiveIndex(i => Math.min(maxIndex, i + 1));
                }}
                sx={{ position: 'absolute', right: -56, top: '45%', transform: 'translateY(-50%)', zIndex: 30, bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' }, width: 40, height: 40 }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
              </IconButton>
            )}

            {convocatorias.length > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                {(() => {
                  const maxIndex = Math.max(0, convocatorias.length - itemsPerView);
                  const pages = maxIndex + 1;
                  return Array.from({ length: pages }).map((_, i) => (
                    <Box key={i} onClick={() => setActiveIndex(i)} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: i === activeIndex ? 'primary.main' : 'grey.300', mx: 0.5, cursor: 'pointer' }} />
                  ));
                })()}
              </Box>
            )}

            {/* Modal (identical al investigador) */}
            <Modal
              aria-labelledby="convocatoria-modal-title"
              aria-describedby="convocatoria-modal-description"
              open={modalOpen}
              onClose={handleCloseModal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={modalOpen} timeout={500}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", sm: "80%", md: "70%" },
                    maxWidth: 800,
                    maxHeight: "90vh",
                    overflow: "auto",
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    boxShadow: 24,
                  }}
                >
                  {selectedConvocatoria && (
                    <Card elevation={0} sx={{ borderRadius: 3 }}>
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                          <Box sx={{ flex: 1, pr: 2 }}>
                            <Typography
                              id="convocatoria-modal-title"
                              variant="h4"
                              component="h2"
                              sx={{
                                fontWeight: "bold",
                                color: "primary.main",
                                mb: 1,
                                lineHeight: 1.3
                              }}
                            >
                              {selectedConvocatoria.convocatoria}
                            </Typography>
                            <Chip label={selectedConvocatoria.estado} color={selectedConvocatoria.estado === 'Activa' ? 'success' : (selectedConvocatoria.estado === 'Cerrada' ? 'error' : 'warning')} size="small" sx={{ fontWeight: 'bold' }} />
                          </Box>
                          <IconButton
                            aria-label="cerrar"
                            onClick={handleCloseModal}
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

                        <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                              <CalendarTodayIcon sx={{ mr: 1, color: "primary.main" }} />
                              <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                                Fechas importantes
                              </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                              <strong>Inicio:</strong> {selectedConvocatoria.fechaInicio}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Cierre:</strong> {selectedConvocatoria.fechaFin}
                            </Typography>
                          </Box>
                          <Box sx={{ width: 200 }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                              <AttachMoneyIcon sx={{ mr: 1, color: "success.main" }} />
                              <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                                Presupuesto
                              </Typography>
                            </Box>
                            <Typography variant="h5" sx={{ color: "success.main", fontWeight: "bold" }}>
                              {typeof selectedConvocatoria.presupuesto === 'number'
                                ? selectedConvocatoria.presupuesto.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
                                : selectedConvocatoria.presupuesto}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ mb: 3 }}>
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
                            {selectedConvocatoria.descripcion}
                          </Typography>
                        </Box>

                        {selectedConvocatoria.areas && selectedConvocatoria.areas.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1 }}>Áreas de investigación</Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              {selectedConvocatoria.areas.map((a, i) => (
                                <Chip key={i} label={a} size="small" variant="outlined" />
                              ))}
                            </Box>
                            <Divider sx={{ my: 2 }} />
                          </Box>
                        )}

                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }}>
                            Requisitos principales
                          </Typography>
                          <Box component="ul" sx={{ pl: 2, m: 0 }}>
                            {selectedConvocatoria.requisitos.map((requisito, index) => (
                              <Typography
                                component="li"
                                key={index}
                                variant="body1"
                                sx={{ mb: 1, color: "text.secondary" }}
                              >
                                {requisito}
                              </Typography>
                            ))}
                          </Box>
                        </Box>

                        {selectedConvocatoria.archivo && (
                          <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <DescriptionIcon sx={{ mr: 1, color: 'info.main' }} />
                              <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                                Documento
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                              {(() => {
                                const url = buildArchivoUrl(selectedConvocatoria.archivo);
                                return (
                                  <>
                                    <Button variant="outlined" onClick={() => window.open(url, '_blank')}>Ver documento</Button>
                                    <Button variant="contained" onClick={() => { const a = document.createElement('a'); a.href = url; a.download = ''; a.click(); }}>Descargar</Button>
                                  </>
                                );
                              })()}
                            </Box>
                          </Box>
                        )}

                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pt: 2 }}>
                          <Button
                            variant="outlined"
                            onClick={handleCloseModal}
                            sx={{ borderRadius: 2 }}
                          >
                            Cerrar
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            disabled={selectedConvocatoria.estado === "Cerrada"}
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
                            {selectedConvocatoria.estado === "Cerrada" ? "Convocatoria Cerrada" : "Aplicar Ahora"}
                          </Button>
                        </Box>

                      </CardContent>
                    </Card>
                  )}
                </Box>
              </Fade>
            </Modal>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}