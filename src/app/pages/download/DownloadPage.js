import axios from 'axios';
import { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import DownloadButton from '../components/Download/DownloadButton';

function DownloadPage() {
  const [releases, setRelease] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to parse filename and extract information, including a human-readable date
  const parseFilename = (filename) => {
    const parts = filename.split('-');
    const productName = parts[0];
    const platform = parts[1];
    const timestamp = parts[parts.length - 1].split('.')[0]; // Remove file extension and get timestamp
    // Convert timestamp to a human-readable date
    const date = new Date(parseInt(timestamp, 10)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return { productName, platform, date };
  };

  useEffect(() => {
    // Fetch release data from the server
    const fetchReleases = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(`${process.env.REACT_APP_DOWNLOAD_URL}/fetch-release`);
        const sortedReleases = response.data.sort((a, b) => {
          const timestampA = parseInt(a.split('-').pop().split('.')[0], 10);
          const timestampB = parseInt(b.split('-').pop().split('.')[0], 10);
          return timestampB - timestampA; // For descending order
        });
        setRelease(sortedReleases); // Assuming the response.data is an array of filenames
        console.log(sortedReleases);
      } catch (error) {
        console.error('Failed to fetch releases:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReleases();
  }, []);

  return isLoading ? (
    <div className="w-full md:w-4/5 absolute">
      <LinearProgress color="primary" />
    </div>
  ) : (
    <div className="container px-12 py-20 md:px-24 flex flex-col gap-10 max-h-[calc(100vh-76px)] overflow-y-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Available Downloads</h1>
      {releases.length === 0 ? (
        <p className="text-center text-xl">No releases available.</p>
      ) : (
        <div className="space-y-4">
          {releases.map((filename, index) => {
            const { productName, platform, date } = parseFilename(filename);
            return (
              <div
                key={index}
                className="bg-celestial-10 rounded-xl shadow hover:shadow-xl p-12 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">
                    {productName} ({platform})
                  </h2>
                  <p className="text-gray-500">Released on {date}</p>
                  <p className="text-gray-600 italic">{filename}</p>
                </div>
                <DownloadButton filename={filename} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DownloadPage;
