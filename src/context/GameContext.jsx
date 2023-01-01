import { createContext, useState, useEffect } from "react"
import swal from 'sweetalert';
export const GameContext = createContext()
export function GameProvider({ children }) {
    const [ready, setReady] = useState(false)
    const [allCards, setAllCards] = useState([])
    const [playerOneCards, setPlayerOneCards] = useState()
    const [playerTwoCards, setPlayerTwoCards] = useState()
    const [ground, setGround] = useState([])
    const [turn, setTurn] = useState('one')
    // a function to shuffle an array 
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    // a function to shuffle an array 
    const buildCards = () => {
        let cardsArray = [];
        for (let i = 0; i < 10; i++) {
            if (i === 0) {

                cardsArray.push('b' + i);
                cardsArray.push('r' + i);
                cardsArray.push('g' + i);
                cardsArray.push('y' + i);
            } else {
                cardsArray.push('b' + i);
                cardsArray.push('r' + i);
                cardsArray.push('g' + i);
                cardsArray.push('y' + i);
                cardsArray.push('b' + i);
                cardsArray.push('r' + i);
                cardsArray.push('g' + i);
                cardsArray.push('y' + i);

            }
        }
        spreadCards(cardsArray)
    };
    // give each player their cards
    const spreadCards = (CardsArr) => {
        let theCards = CardsArr
        if (theCards.length > 0) {
            let arrayOne = []
            let arrayTwo = []
            for (let i = 0; i < 7; i++) {
                const randomIndex = Math.floor(Math.random() * theCards.length);
                const card = theCards.splice(randomIndex, 1);
                arrayOne.push(card[0])
            }
            for (let i = 0; i < 7; i++) {
                const randomIndex = Math.floor(Math.random() * theCards.length);
                const card = theCards.splice(randomIndex, 1);
                arrayTwo.push(card[0])
            }
            setPlayerOneCards(arrayOne);
            setPlayerTwoCards(arrayTwo);
            const randomIndex = Math.floor(Math.random() * theCards.length);
            const card = theCards.splice(randomIndex, 1);
            setGround([...ground, card[0]])
            setAllCards(shuffle(theCards));
            setReady(true)
        }
    }

    useEffect(() => {
        buildCards()

    }, [])
    useEffect(() => {
        if (ready) {
            console.log('allCards');
            console.log(allCards);
            console.log('playerOneCards');
            console.log(playerOneCards);
            console.log('playerTwoCards');
            console.log(playerTwoCards);
        }
    }, [ready])
    // check for a move
    // make the move 
    const playCard = (card, player) => {
        console.log('lmaaaao');
        console.log(card);
        if (player === turn) {
            let playerCards = player === 'one' ? playerOneCards : playerTwoCards
            if (ground[ground.length - 1][0] === card[0] || ground[ground.length - 1][1] === card[1]) {
                // const cardIndex = playerCards.indexOf(card)
                const playedCard = playerCards.splice(playerCards.indexOf(card), 1);
                setGround([...ground, playedCard[0]])
                if (player === 'one') {
                    setPlayerOneCards([...playerCards])
                    setTurn('two')
                } else {
                    setPlayerTwoCards([...playerCards])
                    setTurn('one')
                }
                checkForWinner()
            } else {
                swal('you cant play this card')
            }
        } else {
            swal("It's not your turn")
        }
    }
    // check for a winner
    const checkForWinner = () => {
        if (playerOneCards.length === 0) {
            swal('Player One WON!')
        } else if (playerTwoCards.length === 0) {
            swal('Player Two WON!')
        }
    }
    // give out card from the ground
    const drawCard = () => {
        let cardsCopy = allCards;
        const randomIndex = Math.floor(Math.random() * cardsCopy.length);
        const card = cardsCopy.splice(randomIndex, 1);
        if (turn === 'one') {
            if (checkPlayableCards()) {
                setTurn('two')
            }


            if (card[0][0] !== ground[ground.length - 1][0] && card[0][1] !== ground[ground.length - 1][1]) {
                setTurn('two')
            }
            const newCards = [...playerOneCards, card[0]];
            setPlayerOneCards(newCards)

        } else {
            if (checkPlayableCards()) {
                setTurn('one')
            }


            if (card[0][0] !== ground[ground.length - 1][0] && card[0][1] !== ground[ground.length - 1][1]) {
                setTurn('one')
            }
            const newCards = [...playerOneCards, card[0]];
            setPlayerTwoCards([...playerTwoCards, card[0]])
        }
    }

    const checkPlayableCards = () => {
        let playerCards = turn === 'one' ? playerOneCards : playerTwoCards
        const playableCards = playerCards.filter(card => {
            if (card[0] === ground[ground.length - 1][0] || card[1] === ground[ground.length - 1][1]) {
                return card
            }

        })
        if (playableCards.length > 0) {
            return true
        } else {
            return false
        }
    }

    return (
        <>
            <GameContext.Provider value={{ playerOneCards, playerTwoCards, ready, ground, playCard, drawCard }} >
                {children}
            </GameContext.Provider>
        </>
    )
}