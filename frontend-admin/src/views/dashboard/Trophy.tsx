import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function Trophy() {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        sx={{ height: 193 }}
        image="/images/wallpaper/2.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Educa
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Educa is a modern software designed for efficient classroom management and interaction.
          With a user-friendly interface and versatile features, Educa empowers teachers to effortlessly manage student information while fostering a positive learning experience.
          Educa's interactive platform enables seamless document sharing, online discussions, and diverse media interactions.
          Notably, it provides detailed assessment and progress tracking, allowing teachers to offer comprehensive feedback for holistic student development
        </Typography>
      </CardContent>
    </Card>
  );
}