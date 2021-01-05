import React, { useState } from 'react';
import LoaderIcon from '../../assets/ajax-loader.gif';
import {
  Container,
  Label,
  Description,
  Spinner,
} from './ImageFileUpload.style';

const ImageFileUpload = ({ id, text, onChange, description, isImageLoading, setIsImageLoading, ...props }) => {

  const uploadImage = async (e) => {
    try {
      const files = e.target.files;
      const data = new FormData();
      data.append('file', files[0]);
      data.append('upload_preset', 'myreactapp');

      setIsImageLoading(true);

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dh1mwdsag/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );
      const file = await res.json();
      const fileUrl = file.secure_url;

      onChange(fileUrl);

      setIsImageLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <div className="inner-container">
        <Label htmlFor={id} isLoading={isImageLoading}>
          {!isImageLoading && (
            <input type="file" id={id} {...props} onChange={uploadImage} />
          )}
          {text}
        </Label>
        {isImageLoading && (
          <Spinner>
            <img src={LoaderIcon} alt="Loading" />
          </Spinner>
        )}
      </div>
      <Description>{description}</Description>
    </Container>
  );
};

export default ImageFileUpload;
