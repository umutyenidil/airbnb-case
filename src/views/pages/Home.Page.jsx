import HomePageCard from "../components/cards/HomePage.Card.jsx";
import {HomeContext} from "../../contexts/Home.Context.jsx";
import {useContext} from "react";

const HomePage = () => {
        const {posts} = useContext(HomeContext);

        return (
            <div className='p-32'>
                <div className='grid grid-cols-4 gap-8'>
                    {posts && posts.map((post) => (<HomePageCard key={post.id}
                                                                 data={post}/>))}
                </div>
            </div>
        );
    }
;

export default HomePage;