import React from 'react';

interface CardProps {
    image: string;
    code: string;
}

const Card: React.FC<CardProps> = ({ image, code }) => {
    return (
        <div>
            <img src={image} alt={code} className="w-24 h-auto" />
        </div>
    );
};

export default Card;
