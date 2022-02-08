import React, { useState, useEffect } from 'react';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';
import axios from 'axios';

const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);

    // token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmFjM2IwNDQ0MGQ4MWU0ODAxNzM1OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjY1MjY5MCwiZXhwIjoxNjQzMDg0NjkwfQ.Lu2drkg_GJFy1VrGDu8MUZ5uo9EaQGYlLXD9CuyuM2I'

    console.log(process.env.TOKEN_ID);
    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(
                    `lists${type ? '?type=' + type : ''}${genre ? '&genre=' + genre : ''}`, {
                    headers: {
                        token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmFjM2IwNDQ0MGQ4MWU0ODAxNzM1OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NDIyMjI2OSwiZXhwIjoxNjQ0NjU0MjY5fQ.jqzH3DTSm8yno5PTwuagJRnLdVd8YZhxrBZNeYhFbF8`
                    }
                });
                console.log(res);
                setLists(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        getRandomLists();
    }, [genre, type]);

    return (
        <div className='home'>
            <Navbar />
            <Featured type={type} />
            {lists.map((list, i) => (
                <List key={i} list={list} />
            ))}
        </div>
    )
}

export default Home
