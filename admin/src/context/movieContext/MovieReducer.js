
export const MoviesReducer = (state, action) => {
    switch (action.type) {
        case 'GET_MOVIES_START':
            return {
                movies: [],
                isFetching: true,
                isError: false
            };
        case 'GET_MOVIES_SUCCESS':
            return {
                movies: action.payload,
                isFetching: false,
                isError: false
            };
        case 'GET_MOVIES_FAILURE':
            return {
                movies: [],
                isFetching: false,
                isError: true
            };
        case 'DELETE_MOVIE_START':
            return {
                ...state,
                isFetching: true,
                isError: false
            };
        case 'DELETE_MOVIE_SUCCESS':
            return {
                movies: state.movies.filter(movie => movie._id !== action.payload),
                isFetching: false,
                isError: false
            };
        case 'DELETE_MOVIE_FAILURE':
            return {
                ...state,
                isFetching: false,
                isError: true
            };
        default:
            return { ...state };
    }
}
