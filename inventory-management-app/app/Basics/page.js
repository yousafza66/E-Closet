import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function Basics() {
    return (
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
    </ImageList>
  );
}

const itemData = [
    {
      img: 'images/greentee.png',
      title: 'Green Tee',
    },
    {
      img: 'images/nudetee.png',
      title: 'Nude Tee',
    },
    {
      img: 'images/ribbedtanktop.png',
      title: 'Ribbed Tank Top',
    }
  ];