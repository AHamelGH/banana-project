import { Link } from 'react-router-dom';
import { NavParent, NavItem, NavSection } from './index.js';

// This will be the one I use as my actual nav bar
export const AppNav = () => {
    return (
        <NavParent>
            <NavSection onClick={() => console.log('Hello Nav!')}>
                <NavItem>
                    {/* <a className="nav-link" href="/">Home</a> */}
                    <Link to="/" className="nav-link">Home</Link>
                </NavItem>
            </NavSection>
            <NavSection className="reverse-nav-section"> {/* </Nav>style={{color: 'blue'}}> */}
                <NavItem>
                    <Link to="/warehouse" className="nav-link">Manage Warehouses</Link>
                </NavItem>
                <NavItem>
                    <Link to="/product" className="nav-link">Manage Products</Link>
                </NavItem>
            </NavSection>
        </NavParent>
    );
}