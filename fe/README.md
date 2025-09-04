# 💒 M&R Wedding Photo App

Un'applicazione React elegante e raffinata per condividere le foto del matrimonio di M&R.

## 🌸 Caratteristiche

- **Upload semplice**: Gli invitati possono caricare facilmente le loro foto
- **Galleria elegante**: Visualizzazione delle foto in una galleria responsive
- **Design raffinato**: Tema personalizzato con colori neutri e font eleganti
- **Integrazione Cloudinary**: Storage sicuro e ottimizzato per le immagini
- **QR Code Access**: Accesso rapido tramite scansione QR
- **Mobile-first**: Completamente responsive per tutti i dispositivi

## 🔧 Configurazione Cloudinary (IMPORTANTE!)

### 1. Crea Account Cloudinary
1. Vai su [cloudinary.com](https://cloudinary.com)
2. Registrati gratuitamente
3. Accedi al dashboard

### 2. Ottieni Credenziali
Nel dashboard troverai:
- **Cloud name** (es: `my-wedding-cloud`)
- **API Key** (numero lungo)

### 3. Crea Upload Preset (CRUCIALE!)
1. Vai su **Settings** → **Upload**
2. Clicca **Add upload preset**
3. Configurazione:
   ```
   Preset name: wedding_photos
   Signing Mode: Unsigned ⚠️ IMPORTANTE!
   Folder: matrimonio-mr-2025
   Allowed formats: jpg,jpeg,png,webp
   Max file size: 10000000 (10MB)
   ```

### 4. Configura Variabili d'Ambiente
Crea un file `.env` nella root del progetto:

```env
# Sostituisci con i tuoi valori reali
REACT_APP_CLOUDINARY_CLOUD_NAME=il-tuo-cloud-name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=wedding_photos
REACT_APP_CLOUDINARY_FOLDER=matrimonio-mr-2025

# App Configuration
REACT_APP_WEDDING_COUPLE=M&R
REACT_APP_WEDDING_DATE=05/09/2025
```

## 🚀 Avvio dell'Applicazione

```bash
# Installa le dipendenze
npm install

# Avvia l'applicazione in sviluppo
npm start

# Build di produzione
npm run build
```

## 🎨 Design

L'applicazione utilizza una palette di colori delicata:
- **Primario**: Grigio elegante (#8B8B8B)
- **Secondario**: Beige neutro (#F0EBE3)
- **Background**: Bianco puro (#FFFFFF)
- **Font**: Cormorant Garamond (headings) + Lato (body)

## 📱 Come Funziona per gli Invitati

1. **Scansione QR**: L'invitato scansiona il QR code
2. **Accesso App**: Si apre l'app web nel browser
3. **Upload Foto**: Seleziona le foto dal telefono
4. **Caricamento**: Upload automatico su Cloudinary
5. **Visualizzazione**: Le foto appaiono nella galleria condivisa

## 🛠 Tecnologie Utilizzate

- **Frontend**: React 18 + TypeScript
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router
- **Storage**: Cloudinary
- **Build**: Create React App

## 📂 Struttura del Progetto

```
src/
├── components/
│   ├── Header.tsx          # Header con logo M&R
│   ├── Logo.tsx            # Componente logo SVG
│   ├── PhotoUpload.tsx     # Upload delle foto
│   └── PhotoGallery.tsx    # Galleria foto
├── services/
│   └── cloudinary.ts       # Servizio Cloudinary
├── theme.ts                # Tema Material-UI
├── App.tsx                 # App principale
└── index.tsx              # Entry point
```

## 🔐 Sicurezza

- Upload tramite **preset unsigned** (sicuro)
- Validazione file lato client
- Limitazione dimensioni file
- Organizzazione in cartelle specifiche

## 🌐 Deploy

L'app può essere deployata gratuitamente su:
- **Vercel** (consigliato)
- **Netlify**
- **GitHub Pages**

```bash
# Build per produzione
npm run build

# Il contenuto della cartella build/ può essere deployato
```

## 🎯 Verifica Configurazione

L'app mostrerà un avviso se Cloudinary non è configurato correttamente. Assicurati che:

1. ✅ File `.env` creato con le variabili corrette
2. ✅ Upload preset "wedding_photos" creato come **Unsigned**
3. ✅ Cloud name e preset name corretti

## � Matrimonio M&R

Questa applicazione è stata creata con amore per il matrimonio speciale di M&R del **05 Settembre 2025**. 

Ogni foto caricata diventerà parte dei ricordi indimenticabili di questa giornata magica! ✨

---

*Fatto con ❤️ per M&R*
