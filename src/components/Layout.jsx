import React from 'react'; 

import Header from './Header'

import '../assets/styles/components/Layout.css';

const Layout = ({ children }) => {
    return(
        <div className="screen">
            <Header />
            {children}
        </div>
    )
}

export default Layout;