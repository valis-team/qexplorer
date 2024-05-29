import { useState } from 'react';
import axios from 'axios';

const DownloadButton = ({ filename }) => {
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const downloadRelease = async () => {
    setDownloading(true);
    setProgress(0);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DOWNLOAD_URL}/download-release`,
        { filename },
        {
          responseType: 'blob',
          onDownloadProgress: (progressEvent) => {
            if (progressEvent.total) {
              setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            }
          },
        }
      );
      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Failed to download release:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="my-2">
      <button
        type="button"
        className={`p-4 bg-main-80 text-white rounded-md ${
          downloading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
        }`}
        onClick={downloadRelease}
        disabled={downloading}
      >
        {downloading ? `Downloading... (${progress}%)` : 'Download'}
      </button>
      {downloading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
