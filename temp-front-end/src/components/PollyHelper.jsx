import React from 'react'
import '../components/styles.scss';
import { useState } from 'react';


export default function PollyHelper() {
    return(
        <div class='fade-in-image' style={{backgroundColor: 'transparent', position: 'absolute', bottom: 20, right: 20}}  >
            <p className='text-secondary'>Need help?</p>
            {/* <button id="close-image" onClick={} href = '#' ><img width='80px' src={require("../images/polly_mascot_tmp2.png")} alt="Polly The Panda"/></button> */}
        </div>
    );
}
