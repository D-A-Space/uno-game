
import React, { useContext } from "react";
import Card from "../components/Card";
import FlippedCard from "../components/FlippedCard";
import { GameContext } from "../context/GameContext";
export default function PlayingTable() {
    const { playerOneCards, playerTwoCards, ready, ground, drawCard } = useContext(GameContext);
    return (
        <>
            <div className="h-screen items-center flex flex-col  justify-between ">
                <div className="flex ">
                    {ready &&
                        playerTwoCards?.map((card) => {
                            return <Card player={'two'} card={card} />;
                        })}
                </div>
                <div className=" h-fit flex justify-between px-10 w-full ">
                    <FlippedCard />
                    {
                        ready &&
                        <Card ground={true} card={ground[ground?.length - 1]} />
                    }
                    <div></div>
                </div>
                <div className="flex ">
                    {ready &&
                        playerOneCards?.map((card) => {
                            return <Card player={'one'} card={card} />;
                        })}
                </div>
            </div>
        </>
    );

}
