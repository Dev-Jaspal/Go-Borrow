import React, { Component } from 'react'
import '../../index.css'

const EachProduct = () => {
    const product = (
        <div className='eachProduct'>
        <div>
          <img className="eachImg" src={("https://a0.muscache.com/im/pictures/c96ca7bd-3f0b-4d65-99ae-5fbcf409868e.jpg?im_w=1200")} alt="" />
        </div>
        <div>
          <p style={{fontWeight:'bold', marginBottom:0}}>Vancouver, BC - 0.0km away</p>
          <p style={{color:'gray', marginBottom:'0.5rem'}}>Intex Challenger K2 Kayak</p>
          <p style={{fontWeight:'bold'}}>$18 per day</p>
        </div>
      </div>
    )

    return ( 
        <div className='allProduct'>
            {product}{product}{product}{product}{product}{product}{product}{product}{product}
        </div>
     );
}
 
export default EachProduct;