import {createContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useQuery} from "@tanstack/react-query";

export const HomeContext = createContext({});

export const HomeContextProvider = ({children}) => {

    const {data: posts = Array(25).fill(null), isLoading} = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await res.json();
            return Array(25).fill(null).map((item, index) => ({delay: (index + 1) * 100, data: data[index]}));
        }
    });

    return (
        <HomeContext.Provider value={{
            posts,
            isLoading,
        }}>
            {children}
        </HomeContext.Provider>
    );
};

HomeContextProvider.propTypes = {
    children: PropTypes.any,
};

