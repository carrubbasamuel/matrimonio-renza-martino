import { CloudUpload, PhotoCamera } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Snackbar,
  Stack,
  Typography
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { uploadPhoto } from '../services/galleryService';

const PhotoUpload: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    setError('');
    setUploadProgress(0);

    try {
      const totalFiles = files.length;
      let completedFiles = 0;

      for (const file of Array.from(files)) {
        // Verifica dimensione file (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`Il file ${file.name} è troppo grande. Massimo 10MB.`);
        }

        // Verifica tipo file - accetta TUTTI i formati immagine inclusi HEIC/HEIF da iPhone
        const allowedTypes = [
          'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 
          'image/bmp', 'image/tiff', 'image/svg+xml', 'image/heic', 'image/heif'
        ];
        
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff', '.svg', '.heic', '.heif'];
        const fileExtension = file.name.toLowerCase().split('.').pop();
        
        if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(`.${fileExtension}`)) {
          throw new Error(`Il file ${file.name} non è un formato immagine supportato.`);
        }

        try {
          // Upload al backend
          await uploadPhoto(file);
          
        } catch (uploadError) {
          throw new Error(`Errore caricamento ${file.name}: ${uploadError}`);
        }

        completedFiles++;
        setUploadProgress((completedFiles / totalFiles) * 100);
      }

            // Mostra messaggio di successo
      const photoText = totalFiles === 1 ? 'foto ricevuta' : 'foto ricevute';
      setSuccessMessage(`Grazie di cuore! ${totalFiles} ${photoText}. Andate alla galleria per vederle insieme a noi.`);
      setShowSuccessMessage(true);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante il caricamento delle foto');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      // Reset input
      event.target.value = '';
    }
  }, []);

  return (
    <Box sx={{ 
      maxWidth: { xs: '100%', sm: 500, md: 600 }, 
      mx: 'auto',
      px: { xs: 2, sm: 3, md: 0 },
      py: { xs: 2, sm: 3, md: 4 }
    }}>
      <Card 
        elevation={0}
        sx={{ 
          mb: { xs: 4, sm: 6, md: 8 },
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(212, 197, 184, 0.3)',
          borderRadius: { xs: 3, sm: 4 },
          boxShadow: '0 10px 30px rgba(139, 115, 85, 0.1)'
        }}
      >
        <CardContent sx={{ 
          p: { xs: 3, sm: 4, md: 6 }, 
          textAlign: 'center' 
        }}>
          <PhotoCamera 
            sx={{ 
              fontSize: { xs: 28, sm: 32, md: 36 }, 
              color: '#8B7355',
              mb: { xs: 2, sm: 2.5, md: 3 }
            }} 
          />
          
          <Typography 
            variant="h2" 
            textAlign="center" 
            gutterBottom
            sx={{ 
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 300,
              color: '#2C2C2C',
              mb: { xs: 2, sm: 2.5, md: 3 },
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontStyle: 'italic'
            }}
          >
            Condividete con noi questo giorno
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.1rem' }, 
              maxWidth: { xs: 350, sm: 500, md: 600 }, 
              mx: 'auto', 
              lineHeight: 1.8,
              fontWeight: 300,
              fontFamily: '"Lato", sans-serif',
              mb: { xs: 4, sm: 5 },
              px: { xs: 2, sm: 0 },
              textAlign: 'center',
              color: '#8B7355'
            }}
          >
            Ci farebbe immenso piacere vedere questo giorno attraverso i vostri occhi. 
            Le vostre foto diventeranno parte dei nostri ricordi più cari.
          </Typography>

          {/* Messaggio di errore */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: { xs: 3, sm: 4 },
                textAlign: 'left',
                fontSize: { xs: '0.85rem', sm: '0.9rem' }
              }}
            >
              {error}
            </Alert>
          )}

          {/* Barra di progresso durante upload */}
          {uploading && (
            <Box sx={{ mb: { xs: 4, sm: 5 }, px: { xs: 2, sm: 0 } }}>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ 
                  mb: 2,
                  textAlign: 'center',
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  fontWeight: 400,
                  fontFamily: '"Lato", sans-serif',
                  color: '#8B7355',
                  fontStyle: 'italic'
                }}
              >
                Stiamo caricando le vostre foto... {Math.round(uploadProgress)}%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={uploadProgress}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'rgba(212, 197, 184, 0.3)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(45deg, #8B7355 30%, #D4C5B8 90%)',
                    borderRadius: 5,
                  }
                }}
              />
            </Box>
          )}

          {/* Sezione Upload */}
          <Stack spacing={{ xs: 2, sm: 3 }} alignItems="center">
            <input
              accept="image/*,.heic,.heif"
              style={{ display: 'none' }}
              id="photo-upload-input"
              multiple
              type="file"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            
            <label htmlFor="photo-upload-input">
              <Button
                variant="contained"
                component="span"
                disabled={uploading}
                startIcon={uploading ? <CircularProgress size={24} /> : <CloudUpload />}
                sx={{
                  backgroundColor: '#8B7355',
                  color: '#FFFFFF',
                  py: { xs: 3, sm: 3.5 },
                  px: { xs: 5, sm: 7 },
                  fontSize: { xs: '1.1rem', sm: '1.2rem' },
                  fontWeight: 500,
                  fontFamily: '"Lato", sans-serif',
                  textTransform: 'none',
                  borderRadius: 4,
                  minWidth: { xs: '220px', sm: '280px' },
                  boxShadow: '0 8px 24px rgba(139, 115, 85, 0.3)',
                  '&:hover': {
                    backgroundColor: '#6B5A45',
                    boxShadow: '0 12px 32px rgba(139, 115, 85, 0.4)',
                    transform: 'translateY(-3px)',
                  },
                  '&:disabled': {
                    backgroundColor: '#E0E0E0',
                    color: '#9E9E9E',
                    boxShadow: 'none'
                  },
                  transition: 'all 0.4s ease'
                }}
              >
                {uploading ? 'Caricando le vostre foto...' : 'Caricate le vostre foto'}
              </Button>
            </label>
          </Stack>
        </CardContent>
      </Card>

      {/* Snackbar per messaggi di successo */}
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={4000}
        onClose={() => setShowSuccessMessage(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccessMessage(false)} 
          severity="success"
          sx={{
            backgroundColor: 'rgba(139, 115, 85, 0.1)',
            color: '#8B7355',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            fontFamily: '"Lato", sans-serif',
            border: '1px solid rgba(139, 115, 85, 0.2)',
            borderRadius: 3
          }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PhotoUpload;
