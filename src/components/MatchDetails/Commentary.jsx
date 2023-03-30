import React from 'react';
import { getImagesForCommentaries } from '../../services/utilities';

const Commentary = ({comment}) => {
    const { url, name } = getImagesForCommentaries(comment);
    return (
        <li className='matchdetails__narration narration'>
            <span className='narration__minute'>{comment.momentAction}'</span>
            {url && <img className='narration__image' src={url} alt={`image of ${name}`} />}
            <span className='narration__comment'>{comment.commentary}</span>
        </li>
    );
};

export { Commentary };