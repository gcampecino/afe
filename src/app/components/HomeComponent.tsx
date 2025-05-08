"use client";

import { profileList } from "app/components/api/Api";
import { useState, useEffect } from 'react';
import { CldImage } from 'next-cloudinary';

function HomeComponent() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);


    useEffect(() => {
        const getProfileList = async () => {
            try {
                const response = await profileList()
                setData(response.data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };
        getProfileList();
    }, []);

    return (<>Home</>);
}

export default HomeComponent;