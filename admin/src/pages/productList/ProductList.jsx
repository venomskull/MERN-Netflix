import React, { useContext, useEffect, useState } from 'react'
import './productList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from '../../dummyData';
import { Link } from 'react-router-dom'
import { MoviesContext } from '../../context/movieContext/MovieContext';
import { deleteMovieCalls, getMovieCalls } from '../../context/movieContext/movieCalls';

export default function ProductList() {
    const [data, setData] = useState(productRows);
    const { movies, dispatch } = useContext(MoviesContext);

    const handleDelete = (id) => {
        // setData(data.filter(item => item.id !== id));
        deleteMovieCalls(id, dispatch);
    }

    useEffect(() => {
        getMovieCalls(dispatch);
    }, [dispatch]);

    // console.log(movies)

    const columns = [
        { field: "_id", headerName: "ID", width: 90 },
        {
            field: "movie",
            headerName: "Movie",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.img} alt="" />
                        {params.row.title}
                    </div>
                );
            },
        },
        { field: "genre", headerName: "Genre", width: 120 },
        { field: "year", headerName: "year", width: 120 },
        { field: "limit", headerName: "limit", width: 120 },
        { field: "isSeries", headerName: "isSeries", width: 120 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={{ pathname: "/product/" + params.row._id, movie: params.row }}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className='productList'>
            <DataGrid
                disableSelectionOnClick
                rows={movies}
                // rows={data}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[5]}
                checkboxSelection
                getRowId={r => r._id}
            />
        </div>
    )
}
