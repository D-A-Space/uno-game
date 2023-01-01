import { createContext, useState, useEffect } from "react"

export const GameContext = createContext()
export function GameProvider({ children }) {
    const [ready, setReady] = useState(false)
    const [allCards, setAllCards] = useState([])
    const [playerOneCards, setPlayerOneCards] = useState()
    const [playerTwoCards, setPlayerTwoCards] = useState()
    const [ground, setGround] = useState()
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
        // setAllCards(cardsArray);
        // return true
    };
    // give each player their cards
    const spreadCards = (CardsArr) => {
        let theCards = CardsArr
        if (theCards.length > 0) {
            let arrayOne = []
            let arrayTwo = []
            for (let i = 0; i < 7; i++) {
                const randomIndex = Math.floor(Math.random() * theCards.length);
                // const newArray = [...theCards];
                const card = theCards.splice(randomIndex, 1);
                arrayOne.push(card[0])
                // setAllCards(newArray)
            }
            for (let i = 0; i < 7; i++) {
                const randomIndex = Math.floor(Math.random() * theCards.length);
                // const newArray = [...allCards];
                const card = theCards.splice(randomIndex, 1);
                arrayTwo.push(card[0])
                // setAllCards(newArray)
            }
            setPlayerOneCards(arrayOne);
            setPlayerTwoCards(arrayTwo);
            setAllCards(shuffle(theCards));


        }
        setReady(true)

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
    // spreadCards()
    // check for a move 
    // make the move 
    // check for a winner
    // give out card from the ground
    // check if there is a playable card
    const data = ""
    return (
        <>
            <GameContext.Provider value={{ playerOneCards, playerTwoCards, ready }} >
                {children}
            </GameContext.Provider>
        </>
    )
}