import React, { useRef, useState } from 'react'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined, ArrowForwardIosRounded, } from "@material-ui/icons";
import './list.scss'
import ListItem from '../listItem/ListItem'

export default function List() {
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
            <span className="listTitle">Continue to watch</span>
            <div className="wrapper">
                <ArrowBackIosOutlined className='slideArrow left' onClick={() => handleClick('left')}
                    style={{ display: !isMoved && 'none' }}
                />
                <div className="container" ref={listRef}>
                    <ListItem index={0}/>
                    <ListItem index={1}/>
                    <ListItem index={2}/>
                    <ListItem index={3}/>
                    <ListItem index={4}/>
                    <ListItem index={5}/>
                    <ListItem index={6}/>
                    <ListItem index={7}/>
                    <ListItem index={8}/>
                    <ListItem index={9}/>
                </div>
                <ArrowForwardIosRounded className='slideArrow right' onClick={() => handleClick('right')} />
            </div>
        </div>
    )
}
