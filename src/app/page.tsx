
"use client";
import React, { useState, useEffect } from 'react';
import useDeck from '../hooks/useDeck';
import background from '../assets/images/10081437.jpg';
import WelcomeScreen from '../components/WelcomeScreen';
import GameBoard from '../components/GameBoard';
import GameControls from '../components/GameControls';
import GameResultOverlay from '../components/GameResultOverlay';
import Scoreboard from '../components/Scoreboard';

export default function Home() {
    const { playerCards, houseCards, drawCard, dealInitialCards, loading, showShuffleMessage } = useDeck();
    const [playerTotal, setPlayerTotal] = useState<number>(0);
    const [houseTotal, setHouseTotal] = useState<number>(0);
    const [gameOver, setGameOver] = useState(false);
    const [result, setResult] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    const [dealerHits, setDealerHits] = useState(false);
    const [dealerDrawing, setDealerDrawing] = useState(false);
    const [playerWins, setPlayerWins] = useState<number>(0);
    const [houseWins, setHouseWins] = useState<number>(0);
    const [playerName, setPlayerName] = useState<string>('Player');

    useEffect(() => {
        const newPlayerTotal = calculateHandTotal(playerCards);
        const newHouseTotal = calculateHandTotal(houseCards);
        setPlayerTotal(newPlayerTotal);
        setHouseTotal(newHouseTotal);

        if (newPlayerTotal === 21) {
            handleStand();
        } else if (newPlayerTotal > 21) {
            setGameOver(true);
            setResult('House Wins!');
            setHouseWins(houseWins + 1);
        }
    }, [playerCards, houseCards]);

    useEffect(() => {
        if (dealerDrawing && houseTotal < 17) {
            drawCard('house');
        } else if (dealerDrawing && houseTotal >= 17) {
            setDealerDrawing(false);
            finalizeGame();
        }
    }, [houseTotal, dealerDrawing]);

    const calculateHandTotal = (cards: any[]) => {
        let total = 0;
        let aces = 0;

        cards.forEach(card => {
            if (card.value === 'ACE') {
                aces += 1;
                total += 11;
            } else if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
                total += 10;
            } else {
                total += parseInt(card.value);
            }
        });

        while (total > 21 && aces > 0) {
            total -= 10;
            aces -= 1;
        }

        return total;
    };

    const handleHit = () => {
        if (!gameOver) {
            drawCard('player');
        }
    };

    const handleStand = () => {
        if (!gameOver) {
            if (dealerHits) {
                setDealerDrawing(true);
            } else {
                finalizeGame();
            }
        }
    };

    const finalizeGame = () => {
        const finalPlayerTotal = calculateHandTotal(playerCards);
        const finalHouseTotal = calculateHandTotal(houseCards);

        setGameOver(true);

        if (finalPlayerTotal > 21) {
            setResult('House Wins!');
            setHouseWins(houseWins + 1);
        } else if (finalPlayerTotal === 21) {
            if (finalHouseTotal !== 21) {
                setResult('You Win!');
                setPlayerWins(playerWins + 1);
            } else {
                setResult('It\'s a Tie!');
            }
        } else if (finalHouseTotal > 21) {
            setResult('You Win!');
            setPlayerWins(playerWins + 1);
        } else if (finalPlayerTotal > finalHouseTotal) {
            setResult('You Win!');
            setPlayerWins(playerWins + 1);
        } else if (finalHouseTotal > finalPlayerTotal) {
            setResult('House Wins!');
            setHouseWins(houseWins + 1);
        } else {
            setResult('It\'s a Tie!');
        }
    };

    const handleNewGame = () => {
        dealInitialCards();
        setGameOver(false);
        setResult('');
        setPlayerTotal(0);
        setHouseTotal(0);
        setDealerDrawing(false);
    };

    const handleStartGame = () => {
        if (!loading) {
            setGameStarted(true);
            dealInitialCards();
        }
    };

    const handleDealerHitsChange = () => {
        setDealerHits(!dealerHits);
    };

    return (
        <div
            className="relative min-h-screen text-white flex flex-col items-center justify-center"
            style={{
                backgroundImage: `url(${background.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {loading ? (
                <div className="text-2xl">Loading...</div>
            ) : (
                <>
                    <Scoreboard playerWins={playerWins} houseWins={houseWins} playerName={playerName} />
                    {showShuffleMessage && (
                        <div className="absolute top-4 right-4 bg-yellow-500 text-black p-2 rounded shadow-lg">
                            Deck shuffled!
                        </div>
                    )}
                    <WelcomeScreen
                        gameStarted={gameStarted}
                        dealerHits={dealerHits}
                        handleStartGame={handleStartGame}
                        handleDealerHitsChange={handleDealerHitsChange}
                        setPlayerName={setPlayerName}
                    />
                    {gameStarted && (
                        <>
                            <h1 className="text-4xl font-bold mb-8">Blackjack Game</h1>
                            <GameBoard
                                playerCards={playerCards}
                                houseCards={houseCards}
                                playerTotal={playerTotal}
                                houseTotal={houseTotal}
                                playerName={playerName}
                            />
                            <GameControls handleHit={handleHit} handleStand={handleStand} gameOver={gameOver} />
                            <GameResultOverlay
                                gameOver={gameOver}
                                result={result}
                                playerTotal={playerTotal}
                                houseTotal={houseTotal}
                                handleNewGame={handleNewGame}
                                playerName={playerName}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
}
