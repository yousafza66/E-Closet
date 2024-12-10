import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  
function PopupForm({ open, handleClose, handleSubmit }) {
    // Declare the state for size
    const [size, setSize] = useState('');
    const handleChange = (event) => {
        setSize(event.target.value);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Item</DialogTitle>
            <DialogContent>
                {/* Form content */}
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    >
                    Upload files
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => console.log(event.target.files)}
                        multiple
                    />
                </Button>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    margin="dense"
                    label="Brand"
                    type="text"
                    fullWidth
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                />
                
                {/* FormControl and InputLabel to properly label the Select */}
                <FormControl fullWidth margin="dense">
                    <InputLabel id="size-select-label">Size</InputLabel>
                    <Select
                        labelId="size-select-label"
                        id="size-select"
                        value={size}
                        label="Size"
                        onChange={handleChange}
                    >
                        <MenuItem value="XS">XS</MenuItem>
                        <MenuItem value="S">S</MenuItem>
                        <MenuItem value="M">M</MenuItem>
                        <MenuItem value="L">L</MenuItem>
                        <MenuItem value="XL">XL</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PopupForm;
