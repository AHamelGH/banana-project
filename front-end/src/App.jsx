import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TestPage } from './pages/TestPage';


// This App file will be in charge of client side routing using react-router-dom

/**
 * React Router Dom allows us to add client-side routing to our application
 * 
 * React is used for SPAs (primarily) so react-router-dom is used to navigate between "pages" of our
 * The pages are not separate HTML documents, instead, they're prerendered HTML documents that are offscreen
 * 
 * Switching between routes just moves the other "pages" into view
 * 
 * BrowserRouter interfaces the history API in the web browser to allow us to use forward and back arrows
 * 
 * It also us to mutate the URL displayed at the top of the page such that visiting the about page looks like
 * https://www.google.com/about
 */

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Each route will "route" us to another "page" */}
                <Route path="/" element={<TestPage />} />
            </Routes>
            {/* Insert some footer */}
            <footer>Footer!</footer>
        </BrowserRouter>
    );
}