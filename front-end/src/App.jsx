import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage} from './pages/HomePage';
import { ManageWarehouses } from './pages/ManageWarehouses';
import { ManageProducts } from './pages/ManageProducts';
import { AppNav } from './components/NavBar';


export const App = () => {
    return (
        <BrowserRouter>
            <AppNav />
            <Routes>
                {/* Each route will "route" us to another "page" */}
                <Route path="/" element={<HomePage />} />
                <Route path="/warehouse" element={<ManageWarehouses />} />
                <Route path="/product" element={<ManageProducts />} />
            </Routes>
        </BrowserRouter>
    );
}