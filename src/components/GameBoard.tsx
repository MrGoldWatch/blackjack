import React from 'react';
import Card from './Card';

interface GameBoardProps {
    playerCards: any[];
    houseCards: any[];
    playerTotal: number;
    houseTotal: number;
    playerName: string;
}

const GameBoard: React.FC<GameBoardProps> = ({ playerCards, houseCards, playerTotal, houseTotal, playerName }) => {
    return (
        <div className="text-center">
            {/* Dealer's Hand */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Dealer's Hand ({houseTotal})</h2>
                <div className="flex justify-center">
                    {houseCards.map(card => (
                        card ? (
                            <div key={card.code} className="mx-2">
                                <Card image={card.image} code={card.code} />
                            </div>
                        ) : null
                    ))}
                </div>
            </div>

            {/* Player's Hand */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{playerName}'s Hand ({playerTotal})</h2>
                <div className="flex justify-center">
                    {playerCards.map(card => (
                        card ? (
                            <div key={card.code} className="mx-2">
                                <Card image={card.image} code={card.code} />
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameBoard;
