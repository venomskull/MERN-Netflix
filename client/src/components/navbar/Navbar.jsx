import React, { useState } from 'react'
import './navbar.scss'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }
    // console.log(isScrolled);

    return (
        <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
            <div className="container">
                <div className="left">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
                    <span>Homepage</span>
                    <span>Series</span>
                    <span>Movies</span>
                    <span>New and Popular</span>
                    <span>My List</span>
                </div>
                <div className="right">
                    <SearchSharpIcon className='icon' />
                    <span>KID</span>
                    <NotificationsSharpIcon className='icon' />
                    <img src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
                    <div className="profile">
                        <ArrowDropDownSharpIcon className='icon' />
                        <div className="options">
                            <span>Settings</span>
                            <span>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
