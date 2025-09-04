const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configurazione Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://matrimonio-renza-martino.vercel.app',
        /\.vercel\.app$/
    ],
    credentials: true
}));
app.use(express.json());

// Crea la cartella uploads se non esiste
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configurazione Multer per upload temporaneo (prima di caricare su Cloudinary)
const storage = multer.memoryStorage(); // Usa memoria invece di salvare su disco

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
    fileFilter: (req, file, cb) => {
        // Accetta TUTTI i formati immagine, inclusi HEIC/HEIF da iPhone
        const allowedMimeTypes = [
            'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
            'image/bmp', 'image/tiff', 'image/svg+xml', 'image/heic', 'image/heif'
        ];
        
        // Controllo per estensione file per coprire casi dove MIME type non è riconosciuto
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff', '.svg', '.heic', '.heif'];
        const fileExtension = path.extname(file.originalname).toLowerCase();
        
        if (allowedMimeTypes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
            cb(null, true);
        } else {
            cb(new Error('Formato file non supportato. Carica un\'immagine valida.'), false);
        }
    }
});

// Serve file statici dalla cartella uploads
app.use('/uploads', express.static(uploadsDir));

// Database semplice in memoria (in produzione usare un database vero)
let photos = [];

// Carica le foto esistenti da Cloudinary all'avvio del server
const loadExistingPhotos = async () => {
    try {
        console.log('🔍 Caricamento foto esistenti da Cloudinary...');
        
        // Cerca le foto nella cartella matrimonio-renza-martino su Cloudinary
        const result = await cloudinary.search
            .expression('folder:matrimonio-renza-martino')
            .sort_by('created_at', 'desc')
            .max_results(500) // Limite per evitare problemi di performance
            .execute();

        if (result.resources && result.resources.length > 0) {
            result.resources.forEach(resource => {
                // Ricostruisce l'oggetto foto dal risultato di Cloudinary
                photos.push({
                    id: uuidv4(), // Genera un nuovo ID per compatibilità
                    filename: resource.original_filename || resource.public_id.split('/').pop(),
                    url: resource.secure_url,
                    cloudinaryId: resource.public_id,
                    uploadedAt: resource.created_at,
                    size: resource.bytes
                });
            });
        }
        
        console.log(`📸 Caricate ${photos.length} foto esistenti da Cloudinary`);
    } catch (error) {
        console.error('Errore nel caricare foto da Cloudinary:', error);
        console.log('📸 Continuo con 0 foto caricate');
    }
};

// API Routes

// GET /api/photos - Recupera tutte le foto
app.get('/api/photos', (req, res) => {
    console.log(`📡 Richiesta GET /api/photos - ${photos.length} foto disponibili`);
    res.json(photos);
});

// POST /api/photos/upload - Carica una nuova foto su Cloudinary
app.post('/api/photos/upload', upload.single('photo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Nessun file caricato' });
        }

        console.log(`⬆️ Caricamento su Cloudinary: ${req.file.originalname}`);

        // Carica l'immagine su Cloudinary usando una Promise
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'matrimonio-renza-martino', // Organizza le foto in una cartella
                    public_id: `wedding_${uuidv4()}`, // Nome unico per l'immagine
                    quality: 'auto', // Ottimizzazione automatica della qualità
                    fetch_format: 'auto' // Formato automatico basato sul browser
                },
                (error, result) => {
                    if (error) {
                        console.error('Errore Cloudinary:', error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            
            // Passa il buffer dell'immagine a Cloudinary
            uploadStream.end(req.file.buffer);
        });

        const photo = {
            id: uuidv4(),
            filename: req.file.originalname,
            url: uploadResult.secure_url, // URL sicuro da Cloudinary
            cloudinaryId: uploadResult.public_id, // ID per eventuali operazioni future
            uploadedAt: new Date().toISOString(),
            size: req.file.size
        };

        photos.push(photo);
        
        console.log(`✅ Foto caricata su Cloudinary: ${req.file.originalname}`);
        console.log(`🔗 URL: ${uploadResult.secure_url}`);
        
        res.status(201).json(photo);

    } catch (error) {
        console.error('Errore nel caricamento:', error);
        res.status(500).json({ message: 'Errore interno del server' });
    }
});

// GET /api/photos/:id/download - Scarica una foto
app.get('/api/photos/:id/download', async (req, res) => {
    try {
        const photoId = req.params.id;
        const photo = photos.find(p => p.id === photoId);
        
        if (!photo) {
            return res.status(404).json({ message: 'Foto non trovata' });
        }
        
        // Reindirizza direttamente all'URL di Cloudinary per il download
        res.redirect(photo.url);
        
        console.log(`� Download foto: ${photo.filename}`);
        
    } catch (error) {
        console.error('Errore nel download:', error);
        res.status(500).json({ message: 'Errore interno del server' });
    }
});

// GET /api/health - Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        photosCount: photos.length 
    });
});

// Gestione errori Multer
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File troppo grande. Massimo 10MB.' });
        }
    }
    
    if (error.message === 'Solo file immagine sono consentiti!') {
        return res.status(400).json({ message: error.message });
    }
    
    console.error('Errore del server:', error);
    res.status(500).json({ message: 'Errore interno del server' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint non trovato' });
});

// Avvia il server
app.listen(PORT, async () => {
    console.log(`🚀 Server avviato su http://localhost:${PORT}`);
    console.log(`☁️ Cloudinary configurato per: ${process.env.CLOUDINARY_CLOUD_NAME || 'NON CONFIGURATO'}`);
    
    // Carica le foto esistenti da Cloudinary
    await loadExistingPhotos();
    
    console.log(`\n📋 API Endpoints disponibili:`);
    console.log(`   GET  /api/photos              - Lista tutte le foto`);
    console.log(`   POST /api/photos/upload       - Carica una foto su Cloudinary`);
    console.log(`   GET  /api/photos/:id/download - Scarica una foto`);
    console.log(`   GET  /api/health              - Health check\n`);
});
