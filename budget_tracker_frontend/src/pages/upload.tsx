// File: src/pages/upload.tsx
import { useState } from 'react';
import axios from 'axios';

export default function UploadPage() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      await axios.post('http://localhost:8000/api/upload/transactions/', formData);
      setMessage('Upload successful!');
    } catch (err) {
      console.error(err);
      setMessage('Upload failed.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Upload Transactions</h2>
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
        className="block mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-primary text-black px-4 py-2 rounded hover:bg-opacity-80"
      >
        Upload
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}