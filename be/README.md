# Backend del Matrimonio

Backend semplice per gestire le foto del matrimonio.

## Installazione

```bash
npm install
```

## Avvio

```bash
npm start
```

Per development con auto-reload:
```bash
npm run dev
```

## API Endpoints

- `GET /api/photos` - Recupera tutte le foto
- `POST /api/photos/upload` - Carica una nuova foto
- `DELETE /api/photos/:id` - Elimina una foto
- `GET /api/health` - Health check
- `GET /uploads/:filename` - Serve i file immagine

## Note

- Le foto vengono salvate nella cartella `uploads/`
- Limite di dimensione file: 10MB
- Formati supportati: JPG, PNG, GIF, WEBP
- Il server gira sulla porta 3001
