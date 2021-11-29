import React, { useEffect } from "react";
import Drawer from "../Miscellaneous/Drawer/Drawer";
import GamesList from "./GamesList";

export default function Games(props) {
	const { title, userId } = props;

	useEffect(() => {
		document.title = `Harcmilliada | ${title}`;
	}, [userId]); //eslint-disable-line

	return (
		<Drawer header="Lista gier" userId={userId}>
			<GamesList userId={userId} />
		</Drawer>
	);
}
