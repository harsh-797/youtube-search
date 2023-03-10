import { useState } from "react";

import Content from "./Content";
import Actions from "./Actions";

export default function Body({ data }) {
	// const list = data.read().items;

	const [page, setPage] = useState(0);
	const videos = data.read().items;
	const firstVideoIndex = page * 5;
	const lastVideoIndex = firstVideoIndex + 5;
	const list = videos.slice(firstVideoIndex, lastVideoIndex + 1);

	function handleClick({ type }) {
		switch (type) {
			case "previous":
				if (page) setPage(page - 1);
				return;
			case "next":
				if (page !== 9) setPage(page + 1);
				return;
			default:
				throw Error("Whatt!!!");
		}
	}

	return (
		<>
			<div className='content'>
				{list.map((vid) => {
					const src = `http://www.youtube.com/embed/${vid.id.videoId}`;
					// return <h1>Hi</h1>;

					return (
						<iframe
							className='video'
							width='420'
							height='315'
							src={src}
							title={vid.snippet.title}
							allowFullScreen></iframe>
					);
				})}
			</div>
			<Actions page={page} onClick={handleClick} />
		</>
	);
}
