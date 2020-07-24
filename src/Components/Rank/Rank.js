import React from 'react'

const Rank = ({name, entries}) => {
    return(
        <div>
            <div className = 'white f3'>
                <p>
                    {`${name} , your current rank is...`}
                    <div className='white f1 '>
                        {entries}
                    </div>
                </p>
            </div>
        </div>
    )
}

export default Rank;