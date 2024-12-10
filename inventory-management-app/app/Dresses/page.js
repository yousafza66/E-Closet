'use client'  // This is a client-side module
import Image from "next/image";
import { useState, useEffect } from "react";
import {firestore} from '@/firebase'; // Import the firestore object from firebase.js
import { Box, Modal, Typography, Stack, TextField, Button, color, ImageList, ImageListItem } from "@mui/material";
import {doc, collection, getDocs, query, getDoc, setDoc, deleteDoc, addDoc } from "firebase/firestore";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import {storage} from '@/firebase';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';


export default function Dresses() {
    const [fileupload, setfileupload] = useState(null); 
    const [itemData, setItemData] = useState([]);

    // Fetch image data from Firestore when the component mounts, handles intital data fetching
    useEffect(() => {
        const fetchItems = async () => {
            const itemsCollection = collection(firestore, 'dresses');
            const itemsSnapshot = await getDocs(itemsCollection); //fetches data from the 'dresses' collection
            const itemsList = itemsSnapshot.docs.map(doc => doc.data());
            setItemData(itemsList);
        };
        fetchItems();
    }, []);


    const upload= ()=> {
        console.log(fileupload)
        if(fileupload!=null){
          const fileName = fileupload[0].name;
          const fileref= ref(storage,`dresses/${fileName}`)
          uploadBytes(fileref, fileupload[0]).then(async (data)=>{
            const url= await getDownloadURL(data.ref)
            const newItem = { img: url, title: fileName };

            // Save the new item to Firestore
            await addDoc(collection(firestore, 'dresses'), newItem);

            // Update itemData with the new image
            setItemData(prevItemData => [
                ...prevItemData,
                newItem // Add the new item to the end of the array
            ]);
          })
        }else{
          alert("Please select a file")
        }
    }

    return (
        <Box>
            <div>
                <input type='file' onChange={(event)=>setfileupload(event.target.files)}></input> 
                <button onClick={upload}>Upload</button>
            </div>

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
        </Box>
        
  );
}

