import React from 'react'
import './watch.scss'
import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from 'react-router-dom';

export default function Watch() {
    const location = useLocation();
    const video = location.movie.video;

    return (
        <div className='watch'>
            <Link to='/'>
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
            </Link>
            <video className='video' autoPlay progress controls
                src={video}
            // src="https://samplelib.com/lib/preview/mp4/sample-10s.mp4"
            />
        </div>
    )
}
