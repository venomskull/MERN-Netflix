import React, { useContext, useState } from 'react'
import './newProduct.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebaseApp from '../../firebase';
import { createMovieCalls } from '../../context/movieContext/movieCalls';
import { MoviesContext } from '../../context/movieContext/MovieContext';


export default function NewProduct() {
    const [movie, setMovie] = useState(null);
    const [img, setImg] = useState(null);
    const [imgTitle, setImgTitle] = useState(null);
    const [imgSm, setImgSm] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    const [uploaded, setUploaded] = useState(0);

    const {dispatch} = useContext(MoviesContext);

    const handleChange = (e) => {
        const value = e.target.value;
        // setMovie(prev => ({...prev, [e.target.name]: value}));
        setMovie({ ...movie, [e.target.name]: value });
    }

    // https://firebase.google.com/docs/storage/web/upload-files#web-version-9_6
    const upload = (items) => {
        items.forEach(item => {
            const fileName = new Date().getTime() + '_' + item.label + '_' + item.file.name
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `/items/${fileName}`);
            // const uploadTask = uploadBytesResumable(storageRef, item);
            const uploadTask = uploadBytesResumable(storageRef, item.file);
            uploadTask.on('state_changed', (snapshot) => {
                const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + percentage + '% done');
            }, (error) => {
                console.log(error.code);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    console.log(url);
                    // setMovie(prev => {
                    //     return {...prev, [item.label]: url}
                    // });
                    setMovie(prev => ({ ...prev, [item.label]: url }));
                    setUploaded(prev => prev + 1);
                })
            });
        })
    }

    const handleUpload = (e) => {
        e.preventDefault();
        // label should be same as that of MovieSchema in api
        upload([
            { file: img, label: 'img' },
            { file: imgTitle, label: 'imgTitle' },
            { file: imgSm, label: 'imgSm' },
            { file: trailer, label: 'trailer' },
            { file: video, label: 'video' },
        ]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createMovieCalls(movie, dispatch);
    }

    console.log(img, imgTitle, imgSm, trailer, video);
    console.log(movie);

    return (
        <div className='newProduct'>
            <h1 className="addProductTitle">New Movie</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <input type="file" id="img" onChange={e => setImg(e.target.files[0])} />
                </div>
                <div className="addProductItem">
                    <label>Title Image</label>
                    <input type="file" id="imgTitle" onChange={e => setImgTitle(e.target.files[0])} />
                </div>
                <div className="addProductItem">
                    <label>Thumbnail Image</label>
                    <input type="file" id="imgSm" onChange={e => setImgSm(e.target.files[0])} />
                </div>
                <div className="addProductItem">
                    <label>Title</label>
                    <input type="text" placeholder="John Wick" name='title' onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <input type="text" placeholder="Description" name='description' onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Year</label>
                    <input type="text" placeholder="Year" name='year' onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Genre</label>
                    <input type="text" placeholder="Genre" name='genre' onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Duration</label>
                    <input type="text" placeholder="Duration" name='duration' onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Limit</label>
                    <input type="text" placeholder="Limit" name='limit' onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Is Series?</label>
                    <select name="active" id="isSeries">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </div>
                <div className="addProductItem">
                    <label>Trailer</label>
                    <input type="file" onChange={e => setTrailer(e.target.files[0])} />
                </div>
                <div className="addProductItem">
                    <label>Video</label>
                    <input type="file" onChange={e => setVideo(e.target.files[0])} />
                </div>
                {uploaded === 5
                    ? (<button className="addProductButton" onClick={handleSubmit} >Create</button>)
                    : <button className="addProductButton" onClick={handleUpload} >Upload</button>
                }

            </form>
        </div>
    )
}
