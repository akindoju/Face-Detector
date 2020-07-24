import React from 'react';
import './ImageLinkForm.css'


const ImageLinkForm = ( {onInputChange, onButtonSubmit} ) => {
    return(
        <div className = 'f4'>
            <p>
                {'This app will detect faces in your pictures, give it a try :)'}
            </p>
            <div className = 'center'>
                <div className = 'form center pa4 br3 shadow-5'>
                    <input className = 'f6 pa2 w-70 ba br2 center' type = 'text' onChange={onInputChange} />
                    <button className = 'w-30 grow f5 link br2 button pv1 white bg-blue pb3' onClick={onButtonSubmit}>
                        Detect
                    </button>
                </div>      
            </div>
        </div>
    );
}

export default ImageLinkForm;