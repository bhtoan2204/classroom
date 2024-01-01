import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard() {
  const imageArray = [
    '/images/logos/classroom.jpg',
    '/images/logos/classroom1.jpg',
    '/images/logos/classroom2.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
  };

  return (
    <Card sx={{ width: 850, height: 300 }}>
      <CardActionArea onClick={handleImageClick}>
        <CardMedia
          component="img"
          height="300"
          image={imageArray[currentImageIndex]}
        />
      </CardActionArea>
    </Card>
  );
}
