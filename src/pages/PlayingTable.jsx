import React, { useContext } from 'react'
import Card from '../components/Card'
import { GameContext } from '../context/GameContext'
export default function PlayingTable() {
    const { playerOneCards, playerTwoCards, ready } = useContext(GameContext)
    return (
        <>
            <div className='h-screen items-center flex flex-col   '>
                <div className='flex scale-50'>
                    {
                        ready &&
                        playerOneCards?.map(card => {

                            return <Card card={card} />
                        })
                    }

                </div>
                <div className='scale-50 h-fit '>
                    <Card card={'b8'} />
                </div>
                <div className='flex scale-50'>
                    {
                        ready &&
                        playerTwoCards?.map(card => {

                            return <Card card={card} />
                        })
                    }

                </div>

            </div>
        </>
    )
}
