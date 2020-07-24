import React from 'react';

const navigation = ({onRouteChange, isSignedIn}) => {
        if(isSignedIn) {
            return(
                <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
                    <p className = 'f3 link dim black pa3 pointer' onClick = {() => onRouteChange('SignIn')}>
                        Sign Out
                    </p>
                </nav>
            );
        } else {
            return (
                <nav style ={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick = {() => onRouteChange('SignIn')} className = 'f3 link dim black underline pa3 pointer'>Sign In</p>
                </nav>
            );
        }
    }
    

export default navigation;