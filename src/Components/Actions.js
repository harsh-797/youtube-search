export default function Actions({ page, onClick }) {
	return (
		<div className='actions'>
			<button
				disabled={page === 0}
				onClick={() => onClick({ type: "previous" })}>
				previous
			</button>
			<p>{page}</p>
			<button disabled={page === 9} onClick={() => onClick({ type: "next" })}>
				next
			</button>
		</div>
	);
}
