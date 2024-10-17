import React from 'react';
import '../assets/css/Card.css'; // For perspective property or you can use inline styles

const FlipCards = () => {
    return (
        <div className="card">
            <div className="card-inner">
                <div className="card-front flex items-center justify-center bg-purple-700 text-white border-purple-700 border-4 rounded-lg p-5">
                    <p className="font-concert text-center text-2xl">A large and powerful computer
                        system used for critical applications
                        and large-scale data processing</p>
                </div>
                <div className="card-back flex items-center justify-center bg-orange-500 text-white border-orange-500 border-4 rounded-lg p-5">
                    <p className="font-concert text-center text-3xl">Mainframe</p>
                </div>
            </div>
        </div>
    );
};

export default FlipCards;
