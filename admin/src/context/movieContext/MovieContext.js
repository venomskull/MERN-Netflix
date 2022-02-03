import { createContext, useReducer } from "react";
import { MoviesReducer } from "./MovieReducer";

const INITIAL_STATE = {
    movies: [],
    isFetching: false,
    isError: false
}

export const MoviesContext = createContext(INITIAL_STATE);

const MoviesContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(MoviesReducer, INITIAL_STATE);

    return (
        <MoviesContext.Provider
            value={{
                movies: state.movies,
                isFetching: state.isFetching,
                isError: state.isError,
                dispatch
            }}
        >
            {children}
        </MoviesContext.Provider>
    )
}

export default MoviesContextProvider;