

export const NavParent = ({children, className}) => {
    return (
        <nav className={className ?? 'navbar'}>
            {children}
        </nav>
    );
}