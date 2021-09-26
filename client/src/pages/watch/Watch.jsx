import React from 'react'
import './watch.scss'
import { ArrowBackOutlined } from "@material-ui/icons";

export default function Watch() {
    return (
        <div className='watch'>
            <div className="back">
                <ArrowBackOutlined />
                Home
            </div>
            <div className="video">
                <video autoPlay progress controls
                    src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
                    // src="https://samplelib.com/lib/preview/mp4/sample-10s.mp4"

                />
            </div>
        </div>
    )
}
