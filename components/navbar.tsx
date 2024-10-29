export default function Navbar() {
	return (
		<div className="absolute top-0 left-0 w-full p-8 flex items-center z-20">
			<div className="flex-1">
				<p className="text-sm font-medium text-[#6a6a6a] font-bricolage">
					<span className="font-bold text-white">Directory</span> by Devwithzain
				</p>
			</div>
			<div className="flex justify-center gap-4 flex-1">
				<p className="text-sm font-medium text-[#6a6a6a] font-bricolage">
					Home
				</p>
				<p className="text-sm font-medium text-[#6a6a6a] font-bricolage">
					Projects
				</p>
				<p className="text-sm font-medium text-[#6a6a6a] font-bricolage">
					Use Cases
				</p>
				<p className="text-sm font-medium text-[#6a6a6a] font-bricolage">
					Commitments
				</p>
			</div>
			<div className="flex justify-end flex-1">
				<p className="text-sm font-medium text-[#6a6a6a] font-bricolage">
					Contact
				</p>
			</div>
		</div>
	);
}
