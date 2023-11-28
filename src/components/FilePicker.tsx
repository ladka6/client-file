import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';

interface FilePickerProps {
  onUpload: (imageUrl: string) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:8081/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        },
      });

      const data = response.data;
      console.log(data);

      const imageUrl = data.imageUrl;
      onUpload(imageUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
      // You might want to display an error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" name="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default FilePicker;
