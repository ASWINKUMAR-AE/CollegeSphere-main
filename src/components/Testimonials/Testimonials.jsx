import React, { useRef } from 'react'

import next_icon from '../../assets/next-icon.png'
import back_icon from '../../assets/back-icon.png'



const Testimonials = () => {

    const slider = useRef();
    let tx = 0;

    const slideForword = () => {
        if(tx > -50){
            tx -= 25;
        }
        slider.current.style.transform = `translateX(${tx}% )`;
    }

    const slideBackword = () => {
        if(tx < 0){
            tx += 25;
        }
        slider.current.style.transform = `translateX(${tx}% )`;
    }
    return 
        
    
}

export default Testimonials