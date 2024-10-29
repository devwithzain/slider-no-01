"use client";

import gsap from "gsap";
import dynamic from "next/dynamic";
import { videos } from "@/constants";
import React, { useEffect, useState, useRef } from "react";

const ReactPlayer = dynamic(() => import("react-player"), {
	ssr: false,
});

export default function Slider() {
	const [isClient, setIsClient] = useState(false);
	const sliderRef = useRef<HTMLDivElement | null>(null);
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (isClient && sliderRef.current) {
			initializeCards();
		}
	}, [isClient]);

	const initializeCards = () => {
		if (!sliderRef.current) return;
		const cards = Array.from(
			sliderRef.current.querySelectorAll("#card"),
		) as HTMLDivElement[];
		gsap.to(cards, {
			y: (i) => 0 + 20 * i + "%",
			z: (i) => 15 * i,
			duration: 1,
			ease: "power3.out",
			stagger: -0.1,
		});
	};

	const handleClick = () => {
		if (isAnimating) return;
		setIsAnimating(true);

		const slider = sliderRef.current;
		if (!slider) return;
		const cards = Array.from(
			slider.querySelectorAll("#card"),
		) as HTMLDivElement[];
		const lastCard = cards.pop();
		if (!lastCard) return;

		gsap.to(lastCard, {
			y: "+=150%",
			duration: 0.75,
			ease: "power3.inOut",
			onStart: () => {
				setTimeout(() => {
					slider.prepend(lastCard);
					initializeCards();
					setTimeout(() => {
						setIsAnimating(false);
					}, 1000);
				}, 300);
			},
		});
	};

	return (
		<div
			className="relative w-full h-screen overflow-hidden bg-black"
			onClick={handleClick}>
			<div
				className="absolute top-[5vh] w-full h-screen overflow-hidden"
				style={{
					perspectiveOrigin: "50% 100%",
					perspective: "180px",
				}}
				ref={sliderRef}>
				{videos.map((video) => (
					<div
						className="absolute top-1/2 left-1/2 w-[65%] h-[500px] bg-black border-r border-[#303030] rounded-md overflow-hidden flex flex-col after:content-'' after:absolute after:top-0 after:left-0 after:w-full after:h-full after:border after:border-[#303030] after:rounded-md after:z-20"
						id="card"
						style={{
							transform: "translate3d(-50%, -50%, 0px)",
						}}
						key={video.id}>
						<div className="w-full flex items-center bg-black z-20 px-3 py-2">
							<div className="flex-1">
								<p className="text-[7px] text-[#6a6a6a] font-bricolage">
									{video.date}
								</p>
							</div>
							<div className="flex-1">
								<p className="text-[10px] text-white text-center font-semibold font-bricolage">
									{video.title}
								</p>
							</div>
							<div className="flex-1">
								<p className="text-[7px] text-[#6a6a6a] font-bricolage text-right">
									{video.category}
								</p>
							</div>
						</div>

						<div className="w-full h-full overflow-hidden relative scale-[1.5]">
							<ReactPlayer
								url={`https://vimeo.com/${video.id}`}
								controls={false}
								autoPlay={true}
								loop={true}
								playing
								muted
								width="100%"
								height="100%"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
