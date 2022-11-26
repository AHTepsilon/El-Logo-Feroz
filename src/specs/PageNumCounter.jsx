import React from 'react'
import './styles/PageNumCounter.scss'

function PageNumCounter({pageNum}){
    return <h1 className='page-num-count-text'>{ pageNum } DE 3</h1>
}

export default PageNumCounter;