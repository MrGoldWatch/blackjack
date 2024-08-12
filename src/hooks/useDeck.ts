
import { useState, useEffect } from 'react';
import axios from 'axios';

const useDeck = () => {
    const [deck, setDeck] = useState<any[]>([]);
    const [playerCards, setPlayerCards] = useState<any[]>([]);
    const [houseCards, setHouseCards] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showShuffleMessage, setShowShuffleMessage] = useState(false);

    const initializeDeck = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            const deckId = response.data.deck_id;
            const deckResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`);
            setDeck(deckResponse.data.cards);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching the deck of cards:", error);
            setLoading(false);
        }
    };

    const shuffleDeck = async () => {
        setShowShuffleMessage(true);
        try {
            const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            const deckId = response.data.deck_id;
            const deckResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`);
            setDeck(deckResponse.data.cards);
            setTimeout(() => setShowShuffleMessage(false), 2000); // Hide message after 2 seconds
        } catch (error) {
            console.error("Error shuffling the deck:", error);
        }
    };

    const dealInitialCards = () => {
        if (deck.length < 4) {
            shuffleDeck();
            //     .then(r => {
            //     const playerStartingCards = [deck.pop(), deck.pop()];
            //     const houseStartingCards = [deck.pop(), deck.pop()];
            //     setPlayerCards(playerStartingCards);
            //     setHouseCards(houseStartingCards);
            //     setDeck([...deck]);
            // });
        } else {
            const playerStartingCards = [deck.pop(), deck.pop()];
            const houseStartingCards = [deck.pop(), deck.pop()];
            setPlayerCards(playerStartingCards);
            setHouseCards(houseStartingCards);
            setDeck([...deck]);
        }
    };

    const drawCard = (player: 'player' | 'house') => {
        if (deck.length === 0) {
            shuffleDeck().then(() => {
                if (deck.length > 0) {
                    const card = deck.pop();
                    setDeck([...deck]);

                    if (player === 'player') {
                        setPlayerCards([...playerCards, card]);
                    } else {
                        setHouseCards([...houseCards, card]);
                    }
                }
            });
        } else {
            const card = deck.pop();
            setDeck([...deck]);

            if (player === 'player') {
                setPlayerCards([...playerCards, card]);
            } else {
                setHouseCards([...houseCards, card]);
            }
        }
    };

    useEffect(() => {
        initializeDeck();
    }, []);

    return {
        playerCards,
        houseCards,
        drawCard,
        dealInitialCards,
        loading,
        showShuffleMessage,
    };
};

export default useDeck;
