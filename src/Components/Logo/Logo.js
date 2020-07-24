import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css'
import logo from './logo.png'

const Logo = () => {
    return(
        <div className = 'ma4 mt0 top'>
            <Tilt className = 'Tilt' options = {{max:25}} style = {{height: 150, width: 150}}>
                <div className = 'Tilt-inner'> <img style = {{paddingTop: '30px'}} alt = 'logo' src = {logo} width = '100' height = '100'  /> </div>
            </Tilt>
        </div>
    );
}

export default Logo