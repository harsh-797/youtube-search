import { useRef, useState } from "react";
import * as React from "react";
import Body from "./Body";
import { Search as SearchIcon } from "react-feather";

function fetchData(url) {
	let status = "pending";
	let result = fetch(url)
		.then((res) => res.json())
		.then(
			(data) => {
				result = data;
				status = "resolved";
			},
			(err) => {
				result = err;
				status = "rejected";
			}
		);
	return {
		read() {
			if (status === "pending" || status === "rejected") throw result;
			if (status === "resolved") return result;
		},
	};
}
export default function Search() {
	const [query, setQuery] = useState();

	const inputRef = useRef();
	// AIzaSyCc_O6z8FsqURuYStMQp4FEDApVAI2jqYA
	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCc_O6z8FsqURuYStMQp4FEDApVAI2jqYA&type=video&maxResults=50&q=${query}`;
	let data;
	if (query) data = fetchData(url);

	function handleClick(e) {
		e.preventDefault();
		setQuery(inputRef.current.value);
	}
	return (
		<div className='search'>
			<div className='search-box'>
				<input
					className='search-bar'
					ref={inputRef}
					placeholder={"Type something here..."}></input>
				<button className='search-button' onClick={handleClick}>
					<SearchIcon className='search-logo' size={100} />
					{/* <img
						className='search-logo'
						src='https://media.istockphoto.com/id/924437708/vector/magnifying-glass-icon.jpg?s=612x612&w=0&k=20&c=VXDoaQ6Ns61N2v6CsMXX-vYlG5oUY3ufoUncvUp1zNY='
						alt='search'
					/> */}
					{/* Search */}
				</button>
			</div>
			{data ? (
				<React.Suspense fallback={<div>Searching...</div>}>
					<Body data={data} />
				</React.Suspense>
			) : (
				""
			)}
		</div>
	);
}
