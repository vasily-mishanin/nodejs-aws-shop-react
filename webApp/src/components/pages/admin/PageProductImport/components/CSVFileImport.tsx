import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    const fileName = file?.name;

    if (!fileName) {
      console.error('No file. Provide file to upload');
      return;
    }

    //Get the presigned URL from AWS Lambda called importProductsFile
    console.log('get upload url from', url);
    const response = await axios({
      method: 'GET',
      url,
      params: {
        name: encodeURIComponent(fileName),
      },
    });
    console.log('File to upload: ', fileName);
    console.log('Uploading to: ', response.data);
    const result = await fetch(response.data.s3UploadSignedUrl, {
      method: 'PUT',
      body: file,
    });
    console.log('Result: ', result);
    setFile(undefined);
  };

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type='file' onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
