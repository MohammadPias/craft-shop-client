import React, { useState } from 'react';
import Rating from 'react-rating';

const ReactRating = ({ change, rating, setFormData, formData }) => {

    return (
        <Rating
            {...(!change && { readonly: true })}
            initialRating={rating ? rating : formData?.rating}
            onChange={(value) => setFormData({ ...formData, rating: value })}
            emptySymbol={`fa fa-star-o ${change ? 'fa-2x' : 'fa-1x'} text-amber-500`}
            fullSymbol={`fa fa-star ${change ? 'fa-2x' : 'fa-1x'} text-amber-500`}
        />
    );
};

export default ReactRating;