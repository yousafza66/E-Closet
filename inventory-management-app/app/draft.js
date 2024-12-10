'use client'  // This is a client-side module 
import Image from "next/image";
import { useState, useEffect } from "react";
import {firestore} from '@/firebase'; // Import the firestore object from firebase.js
import { Box, Modal, Typography, Stack, TextField, Button, color } from "@mui/material";
import {doc, collection, getDocs, query, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import {storage} from '@/firebase';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

export default function Home() {
  const [inventory, setInventory] = useState([]); // Initialize the inventory state variable that will store the inventory data
  const [open, setOpen] = useState(false); // Initialize the open state variable that will store the state of the dialog box
  const [itemName, setItemName] = useState(""); // Initialize the itemName state variable that will store the name of the item
  const [fileupload, setfileupload] = useState(null); // Initialize the itemName state variable that will store the name of the item


  const upload= ()=> {
    console.log(fileupload)
    if(fileupload!=null){
      const fileName = fileupload[0].name;
      const fileref= ref(storage,`newfiles/${fileName}`)
      uploadBytes(fileref, fileupload[0]).then((data)=>{
        getDownloadURL(data.ref)
      })
    }else{
      alert("Please select a file")
    }
  }
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory")); // Create a query to get all the documents in the inventory collection
    const docs = await getDocs(snapshot); // Get all the documents in the inventory collection`
    const inventoryList = []; // Initialize an empty array to store the inventory data

    docs.forEach(doc => { // Loop through each document in the inventory collection
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      }); // Add the data of the document to the inventoryList array
    });
    setInventory(inventoryList); // Update the inventory state variable with the inventoryList array
    console.log(inventoryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item) // Create a reference to the document to be deleted
    const docSnap = await getDoc(docRef); // Get the document snapshot which contains the data of the document

    if (docSnap.exists()) { // Check if the document exists
      const {quantity} = docSnap.data(); // Get the quantity of the item from the document data 
      await setDoc(docRef, {quantity: quantity + 1}); // Update the quantity of the item in the document
    } else {
      await setDoc(docRef, {quantity: 1}); // Create a new document with the quantity set to 1
    }

    await updateInventory(); // Call the updateInventory function to update the inventory data
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item) // Create a reference to the document to be deleted
    const docSnap = await getDoc(docRef); // Get the document snapshot which contains the data of the document

    if (docSnap.exists()) { // Check if the document exists
      const {quantity} = docSnap.data(); // Get the quantity of the item from the document data 
      if (quantity === 1) {
        await deleteDoc(docRef); // Delete the document if the quantity is 1
      }
      else{
        await setDoc(docRef,{quantity: quantity - 1}); // Update the quantity of the item in the document
      }
    }

    await updateInventory(); // Call the updateInventory function to update the inventory data
  }


  useEffect(() => {
    updateInventory(); // Call the updateInventory function when the component is mounted
  }, []); // The empty array as the second argument ensures that the function is only called once when the component is mounted, the second argument is an array of dependencies that will trigger the function when they change
  
  const handleOpen = () => setOpen(true); // Function to open the dialog box
  const handleClose = () => setOpen(false); // Function to close the dialog box

  return (
    <Box 
    width="100vw" 
    height="100vh" 
    display="flex" 
    flexDirection={"column"}
    justifyContent="center"
    alignItems="center"
    gap={2} // Add a gap of 2 units between the children
    >
      <Modal  open={open} onClose={handleClose}>
        <Box position="absolute" top="50%" left="50%"
        width={400}
        bgcolor="white"
        border="2px solid black"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        sx={{
          transform: "translate(-50%, -50%)" // Center the dialog box
        }}
        >
          <Typography variant="h6">Add Items</Typography>
          <div>
            <input type='file' onChange={(event)=>setfileupload(event.target.files)}></input> 
            <button onClick={upload}>Upload</button>
          </div>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
            variant='outlined'
            fullWidth
            value={itemName}
            onChange={(e)=>{
              setItemName(e.target.value); //update the itemName state variable with the value entered in the text field
            }}
            ></TextField>
            <Button 
              variant='outlined'
              onClick={()=>{
                addItem(itemName); // Call the addItem function with the itemName as the argument
                setItemName(""); // Clear the itemName state variable
                handleClose(); // Close the dialog box
              }}
            >Add</Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant = "contained" onClick={()=>{
        handleOpen(); // Call the handleOpen function when the button is clicked
      }}>
        Add New Item
      </Button>
      <Box border="1px solid #333">
        <Box width = "400px"height= "100px" bgcolor="Coral" display="flex" alignContent={"center"} justifyContent={"center"}>
          <Typography variant= 'h2' color='#333'>
            Items
          </Typography>
        </Box>
      <Stack width="400px" height= "300px" bgcolor= "#7FFFD4" spacing={2} overflow="auto">
        {
          inventory.map(({name, quantity}) => (
            <Box key={name} width="100%"
            minHeight="150px"
            display="flex"
            alignItems={"center"}
            justifyContent="space-between"
            bgColor="#f0f0f0"
            padding={5}
            >
              <Link href={`/${name}`}>
                <SearchIcon>
                </SearchIcon>
              </Link>
              
              <Typography 
              variant= "h3" 
              color= "#333"
              textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography 
              variant= "h3" 
              color= "#333"
              textAlign="center">
                {quantity}
              </Typography>
              {/* <Button 
                variant= "contained" 
                onClick={()=>{
                removeItem(name); // Call the removeItem function with the name of the item as the argument
                }}
              >
                Remove
              </Button> */}
            </Box>
          ))}
      </Stack>
      </Box>
    </Box>
  )
}
