'use client'
import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import Button from '@mui/material/Button';
import ImageListItem from '@mui/material/ImageListItem';
import AddIcon from '@mui/icons-material/Add';
import PopupForm from '@/components/PopupForm';

export default function Sweaters() {
  const [openForm, setOpenForm] = useState(false);

  // Handle opening and closing of the form
  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleSubmitForm = () => {
    // Add form submission logic here
    console.log('Form submitted');
    handleCloseForm(); // Close the form after submitting
  };

  return (
    <div>
      <ImageList sx={{ width: 500, height: 450, margin: '20px auto' }} cols={3} rowHeight={164}>
        {/* Button as the first item in the ImageList */}
        <ImageListItem>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '16px',
              textTransform: 'none', // Prevent all-uppercase text
              backgroundColor: 'lightgray', // Blue background color
              color: 'white', // White text color
              '&:hover': {
                backgroundColor: 'lightblue', // Darker blue background on hover
              },
            }}
            startIcon={<AddIcon />}
            onClick={handleOpenForm} // Open form when button is clicked
          >
            Add Item
          </Button>
        </ImageListItem>

        {/* Other items can go here */}
      </ImageList>

      {/* Popup Form Dialog */}
      <PopupForm 
        open={openForm} 
        handleClose={handleCloseForm} 
        handleSubmit={handleSubmitForm} 
      />
    </div>
  );
}

const itemData = [
  {
    img: 'images/zipknitsweater.png',
    title: 'Zip Knit Sweater',
  },
];
