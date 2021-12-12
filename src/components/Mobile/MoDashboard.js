import React, { useEffect } from "react";

export default function MoDashboard(props) {
	const { title, userId } = props;

	useEffect(() => {
		document.title = `Harcmilliada | ${title}`;
	}, [userId]); //eslint-disable-line

	return <div>{title}</div>;
}
