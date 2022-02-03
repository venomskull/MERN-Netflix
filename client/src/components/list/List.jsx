import React, { useRef, useState } from 'react'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined, ArrowForwardIosRounded, } from "@material-ui/icons";
import './list.scss'
import ListItem from '../listItem/ListItem'

export default function List({ list }) {
    const [slideNumber, setSlideNumber] = useState(0);
    const [isMoved, setIsMoved] = useState(false);
    const listRef = useRef();

    const handleClick = (direction) => {
        setIsMoved(true);
        // let distance = listRef.current.getBoundingClientRect();
        // console.log(distance); // = 50
        let distance = listRef.current.getBoundingClientRect().x - 50; //50 is the margin of container
        if (direction === 'left' && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            //280 - 50 = 230 
            //230 is 225 + 5 of the listItem
            listRef.current.style.transform = `translateX(${distance + 230}px)`;
            // let distance = listRef.current.getBoundingClientRect();
            // console.log(distance);
        }
        if (direction === 'right' && slideNumber < 5) {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${distance - 230}px)`;
        }
    }

    return (
        <div className='list'>
            <span className="listTitle">{list.title}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined className='slideArrow left' onClick={() => handleClick('left')}
                    style={{ display: !isMoved && 'none' }}
                />
                <div className="container" ref={listRef}>
                    {list.content.map((item, i) => (
                        <ListItem index={i} item={item} />
                    ))}
                </div>
                <ArrowForwardIosRounded className='slideArrow right' onClick={() => handleClick('right')} />
            </div>
        </div>
    )
}
