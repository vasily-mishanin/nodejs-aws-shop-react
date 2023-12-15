import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import CSVFileValidator from 'csv-file-validator';

type CSVFileImportProps = {
  url: string;
  title: string;
};

const validatorConfig = {
  headers: [
    { name: 'id', inputName: 'id', isRequired: true },
    { name: 'title', inputName: 'title', isRequired: true },
    { name: 'description', inputName: 'description', isRequired: true },
    { name: 'price', inputName: 'price', isRequired: true },
    { name: 'discountPercentage', inputName: 'discountPercentage' },
    { name: 'rating', inputName: 'rating' },
    { name: 'count', inputName: 'count', isRequired: true },
    { name: 'brand', inputName: 'brand' },
    { name: 'category', inputName: 'category' },
    { name: 'thumbnail', inputName: 'thumbnail', isRequired: true },
  ], // required
  isHeaderNameOptional: false,
  isColumnIndexAlphabetic: false,
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();
  const [isInvalidFile, setIsInvalidFile] = React.useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (!file.name.toLowerCase().endsWith('.csv')) {
        setFile(undefined);
        setIsInvalidFile(true);
      }

      CSVFileValidator(file, validatorConfig)
        .then((csvData) => {
          if (csvData.inValidData.length > 0) {
            setFile(undefined);
            setIsInvalidFile(true);
          } else {
            setFile(file);
            setIsInvalidFile(false);
          }
        })
        .catch((err) => {
          console.error('Error while validating CSV', err);
        });
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
        <>
          <input type='file' onChange={onFileChange} />
          {isInvalidFile && (
            <span>Not valid CSV. Please choose valid CSV file</span>
          )}
        </>
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
          {!isInvalidFile && <span>{file.name}</span>}
        </div>
      )}
    </Box>
  );
}
