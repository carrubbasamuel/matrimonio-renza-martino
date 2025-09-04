import { Close as CloseIcon, Download as DownloadIcon } from '@mui/icons-material';
import {
    Alert,
    Box,
    Card,
    CardMedia,
    CircularProgress,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    Tooltip,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getWeddingGallery, Photo } from '../services/galleryService';

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  // Carica le foto al mount del componente
  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      setError(null);
      const photosData = await getWeddingGallery();
      setPhotos(photosData);
      console.log('📸 Foto caricate:', photosData.length);
    } catch (err) {
      console.error('Errore nel caricamento delle foto:', err);
      setError('Errore nel caricamento delle foto. Riprova più tardi.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPhoto = async (photo: Photo, event: React.MouseEvent) => {
    event.stopPropagation(); // Previene l'apertura del dialog
    
    try {
      setDownloading(photo.id);
      
      // Scarica direttamente dal URL di Cloudinary
      const link = document.createElement('a');
      link.href = photo.url;
      link.download = photo.filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('📥 Download avviato:', photo.filename);
    } catch (err) {
      console.error('Errore nel download:', err);
      setError('Errore nel download della foto. Riprova più tardi.');
    } finally {
      setDownloading(null);
    }
  };

  const openPhotoDialog = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closePhotoDialog = () => {
    setSelectedPhoto(null);
  };

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="400px" sx={{ px: 2 }}>
        <CircularProgress 
          size={70} 
          thickness={3}
          sx={{ 
            color: '#8B7355',
            mb: 4
          }} 
        />
        <Typography 
          variant="h5" 
          sx={{ 
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 300,
            color: '#2C2C2C',
            fontSize: { xs: '1.3rem', sm: '1.6rem' },
            textAlign: 'center',
            fontStyle: 'italic'
          }}
        >
          Stiamo caricando le vostre foto...
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            fontFamily: '"Lato", sans-serif',
            fontWeight: 300,
            color: '#8B7355',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            textAlign: 'center',
            mt: 1,
            opacity: 0.8
          }}
        >
          Un momento di pazienza
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
        <Typography variant="body2" sx={{ mt: 1 }}>
          <button onClick={loadPhotos} style={{ background: 'none', border: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}>
            Riprova
          </button>
        </Typography>
      </Alert>
    );
  }

  if (photos.length === 0) {
    return (
      <Box textAlign="center" sx={{ mt: 8, px: 2 }}>
        <Typography 
          variant="h3" 
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 300,
            color: '#2C2C2C',
            mb: 3,
            fontSize: { xs: '2.2rem', sm: '2.8rem' },
            fontStyle: 'italic'
          }}
        >
          La nostra galleria vi aspetta
        </Typography>
        <Typography 
          variant="h6" 
          sx={{
            fontFamily: '"Lato", sans-serif',
            fontWeight: 300,
            color: '#8B7355',
            mb: 4,
            fontSize: { xs: '1rem', sm: '1.2rem' },
            lineHeight: 1.8
          }}
        >
          Condividete con noi i momenti più belli di questa giornata speciale
        </Typography>
        <Box sx={{ 
          width: { xs: 60, sm: 80 }, 
          height: '2px', 
          bgcolor: '#D4C5B8',
          mx: 'auto',
          borderRadius: 1
        }} />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2, px: { xs: 1, sm: 2 } }}>
      <Typography 
        variant="h3" 
        gutterBottom
        sx={{
          textAlign: 'center',
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 300,
          color: '#2C2C2C',
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.2rem' },
          fontStyle: 'italic'
        }}
      >
        I nostri ricordi insieme
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        mb: { xs: 4, sm: 5 },
        gap: { xs: 2, sm: 3 }
      }}>
        <Box sx={{ 
          width: { xs: 30, sm: 50 }, 
          height: '1px', 
          bgcolor: '#D4C5B8' 
        }} />
        <Typography
          variant="body1"
          sx={{
            color: '#8B7355',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            fontWeight: 400,
            fontFamily: '"Lato", sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          {photos.length} {photos.length === 1 ? 'foto condivisa' : 'foto condivise'} con noi
        </Typography>
        <Box sx={{ 
          width: { xs: 30, sm: 50 }, 
          height: '1px', 
          bgcolor: '#D4C5B8' 
        }} />
      </Box>
      
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {photos.map((photo) => (
          <Grid item xs={6} sm={4} md={3} lg={2.4} key={photo.id}>
            <Card 
              sx={{ 
                position: 'relative',
                cursor: 'pointer',
                borderRadius: { xs: 3, sm: 4 },
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(139, 115, 85, 0.15)',
                transition: 'all 0.4s ease',
                border: '1px solid rgba(212, 197, 184, 0.3)',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 20px 40px rgba(139, 115, 85, 0.25)',
                  '& .download-button': {
                    opacity: 1,
                    transform: 'scale(1)'
                  }
                }
              }}
              onClick={() => openPhotoDialog(photo)}
            >
              <CardMedia
                component="img"
                image={photo.url}
                alt={photo.filename}
                sx={{ 
                  objectFit: 'cover',
                  height: { xs: '140px', sm: '180px', md: '220px' },
                  width: '100%'
                }}
              />
              
              {/* Overlay romantico */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(139, 115, 85, 0.1) 0%, rgba(212, 197, 184, 0.1) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 1
                  }
                }}
              />
              
              {/* Pulsante download elegante */}
              <Tooltip title="Scarica questa foto" arrow>
                <IconButton
                  className="download-button"
                  sx={{
                    position: 'absolute',
                    top: { xs: 8, sm: 12 },
                    right: { xs: 8, sm: 12 },
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    opacity: 0,
                    transform: 'scale(0.8)',
                    transition: 'all 0.3s ease',
                    width: { xs: 36, sm: 44 },
                    height: { xs: 36, sm: 44 },
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(139, 115, 85, 0.2)',
                    '&:hover': {
                      backgroundColor: '#8B7355',
                      color: 'white',
                      transform: 'scale(1.1)',
                      boxShadow: '0 4px 12px rgba(139, 115, 85, 0.4)'
                    }
                  }}
                  size="small"
                  onClick={(e) => handleDownloadPhoto(photo, e)}
                  disabled={downloading === photo.id}
                >
                  {downloading === photo.id ? (
                    <CircularProgress size={18} sx={{ color: '#8B7355' }} />
                  ) : (
                    <DownloadIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog elegante per visualizzare la foto ingrandita */}
      <Dialog
        open={Boolean(selectedPhoto)}
        onClose={closePhotoDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, sm: 4 },
            maxHeight: '95vh',
            backgroundColor: '#1A1A1A',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8)'
          }
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative', backgroundColor: '#1A1A1A' }}>
          {selectedPhoto && (
            <>
              {/* Pulsante chiudi elegante */}
              <IconButton
                sx={{
                  position: 'absolute',
                  top: { xs: 12, sm: 20 },
                  right: { xs: 12, sm: 20 },
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: 'white',
                  zIndex: 3,
                  width: { xs: 44, sm: 52 },
                  height: { xs: 44, sm: 52 },
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 20px rgba(255, 255, 255, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
                onClick={closePhotoDialog}
              >
                <CloseIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
              </IconButton>
              
              {/* Pulsante download nella vista ingrandita */}
              <Tooltip title="Scarica questa foto" arrow>
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: { xs: 12, sm: 20 },
                    left: { xs: 12, sm: 20 },
                    backgroundColor: 'rgba(139, 115, 85, 0.9)',
                    color: 'white',
                    zIndex: 3,
                    width: { xs: 44, sm: 52 },
                    height: { xs: 44, sm: 52 },
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: '#8B7355',
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 20px rgba(139, 115, 85, 0.5)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={(e) => handleDownloadPhoto(selectedPhoto, e)}
                  disabled={downloading === selectedPhoto.id}
                >
                  {downloading === selectedPhoto.id ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    <DownloadIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                  )}
                </IconButton>
              </Tooltip>
              
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.filename}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  maxHeight: '95vh',
                  objectFit: 'contain'
                }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PhotoGallery;
