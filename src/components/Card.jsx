import React, { useEffect } from "react";

export default function Card({ card }) {
	const num = card[1];
	let color;
	switch (card[0]) {
		case "b":
			color = "bg-blue-700";
			break;
		case "g":
			color = "bg-green-500";
			break;
		case "r":
			color = "bg-red-700";
			break;
		case "y":
			color = "bg-yellow-300";
			break;
	}
	useEffect(() => {
		console.log(card);
	}, [card])
	return (
		<div className="card ring-1 ring-black w-52 h-80  rounded-lg p-4 bg-slate-100 hover:-translate-y-4">
			<div className={`${color} rounded-lg h-full flex flex-col px-2`}>
				<p className="text-black font-extrabold text-6xl relative w-fit">
					{num}
					<span className="text-white text-5xl font-bold absolute top-1 -right-1">
						{num}
					</span>
				</p>
				<div className="self-center rounded-full p-10 ring-8 rotate-45 ring-white">
					<p className="self-center -rotate-45 text-extrabold font-extrabold text-8xl relative ">
						{num}
						<span className="text-white text-8xl font-bold absolute top-1 -right-1">
							{num}
						</span>
					</p>
				</div>

				<p className="self-end rotate-180 text-black font-extrabold text-6xl relative w-fit">
					{num}
					<span className="text-white text-5xl font-bold absolute top-1 -right-1">
						{num}
					</span>
				</p>
			</div>
		</div>
	);
}
