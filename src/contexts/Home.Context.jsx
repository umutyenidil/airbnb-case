import {createContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useQuery} from "@tanstack/react-query";

export const HomeContext = createContext({});

export const HomeContextProvider = ({children}) => {
    const [visibleCardIds, setVisibleCardIds] = useState([]);

    const {data: posts = null, isLoading} = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            return res.json();
        }
    });

    useEffect(() => {
        if (posts) {
            const intervalId = setInterval(() => {
                setVisibleCardIds(prevIds => {
                    const nextId = posts[prevIds.length]?.id; // Get the next ID from posts array
                    return nextId ? [...prevIds, nextId] : prevIds; // Add the next ID if it exists
                });
            }, 100);

            // Clear interval when component unmounts or when all IDs are added
            return () => clearInterval(intervalId);
        }
    }, [posts]);

    return (
        <HomeContext.Provider value={{
            posts,
            isLoading,
            visibleCardIds,
        }}>
            {children}
        </HomeContext.Provider>
    );
};

HomeContextProvider.propTypes = {
    children: PropTypes.any,
};

