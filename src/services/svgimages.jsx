
import React from 'react';

export const Jersey = ({ color, colorTwo }) => {
	console.log(color, colorTwo)
	return (
		<svg className='jersey'  fill={color} stroke={colorTwo} stroke-width='2' x="0px" y="0px" viewBox="0 0 128 128">
			<path d="M11.1,38.8L25.4,52l4.3-4.3l0.3,64.6c0,0,11.7,5.4,33.9,6.1c22.2,0.7,34-5.5,34-5.5V47.2l4.6,5.5l14.3-13.9 L97.1,16.7l-20-6.4H51.4l-20,5.8L11.1,38.8z"/>
		</svg>
	);
};

