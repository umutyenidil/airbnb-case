import './index.css'
import HomePage from "./views/pages/Home.Page.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {HomeContextProvider} from "./contexts/Home.Context.jsx";

const client = new QueryClient();
const App = () => {

    return (
        <QueryClientProvider client={client}>
            <HomeContextProvider>
                <HomePage/>
            </HomeContextProvider>
        </QueryClientProvider>
    );
};

export default App;