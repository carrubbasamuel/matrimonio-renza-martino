// Servizio per gestire la galleria foto tramite backend

export interface Photo {
  id: string;
  filename: string;
  url: string;
  uploadedAt: string;
  size?: number;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Recupera tutte le foto dal backend
export const getWeddingGallery = async (): Promise<Photo[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/photos`);
    
    if (!response.ok) {
      throw new Error(`Errore nel caricamento delle foto: ${response.status}`);
    }
    
    const photos = await response.json();
    return photos.sort((a: Photo, b: Photo) => 
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
  } catch (error) {
    console.error('Errore nel recuperare le foto:', error);
    throw error;
  }
};

// Carica una nuova foto al backend
export const uploadPhoto = async (file: File): Promise<Photo> => {
  try {
    const formData = new FormData();
    formData.append('photo', file);
    
    const response = await fetch(`${API_BASE_URL}/api/photos/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Errore nel caricamento: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Errore nel caricamento della foto:', error);
    throw error;
  }
};

// Elimina una foto (opzionale per il futuro)
export const deletePhoto = async (photoId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/photos/${photoId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Errore nell'eliminazione: ${response.status}`);
    }
  } catch (error) {
    console.error('Errore nell\'eliminazione della foto:', error);
    throw error;
  }
};
