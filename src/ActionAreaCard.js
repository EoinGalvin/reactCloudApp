import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Youtube from 'react-youtube';


export default function ActionAreaCard({DescriptionText,YoutubeURL}) {
    console.log(YoutubeURL)

  return (
    <Card sx={{}}>
      <CardContent sx={{border: 'black 2px solid',background: '#3A6596'}}>
      <Youtube videoId = {YoutubeURL} opts = {{width: '320',height: '180'}}/>
        <Typography variant="body2" color="text.secondary">
        {DescriptionText}
        </Typography>
      </CardContent>
    </Card>
  );
}
