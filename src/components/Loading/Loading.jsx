import React from 'react';
import './Loading.css';
import loadingIcon from '../../assets/loading-icon.svg';

const Loading = () => {
    return (
        <div className='loading'><span>LOADING</span><img className='loading__img' src={loadingIcon} alt='loading page' /></div>
    );
};

export {Loading};