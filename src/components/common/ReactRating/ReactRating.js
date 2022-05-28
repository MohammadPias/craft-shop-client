import React from 'react';
import Rating from 'react-rating';

const ReactRating = ({ change, rating }) => {
    return (
        <Rating
            {...(change && { readonly: true })}
            initialRating={rating}
            emptySymbol="fa fa-star-o fa-1x text-amber-500"
            fullSymbol="fa fa-star fa-1x text-amber-500"
        />
    );
};

export default ReactRating;