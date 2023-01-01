import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function FlippedCard() {
	const { drawCard } = useContext(GameContext);
	return (
		<div onClick={drawCard} className="card ring-1 ring-black w-32 h-52  rounded-lg p-4 bg-slate-100 cursor-pointer ">
			<div
				className={`bg-black overflow-hidden rounded-lg h-full flex flex-col px-2 justify-center`}
			>
				<div className="self-center bg-red-500 -rotate-45 rounded-full p-7">
					<p className="self-center text-extrabold font-extrabold text-5xl relative ">
						UNO
						<span className=" text-yellow-200 text-5xl font-bold absolute top-1 -right-1">
							UNO
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}
