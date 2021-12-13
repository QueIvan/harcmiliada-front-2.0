import React, { useEffect } from "react";
import Drawer from "../Miscellaneous/Drawer/Drawer";
import MoGameList from "./MoGameList";

export default function MoGames(props) {
	const { title, userId } = props;

	useEffect(() => {
		document.title = `Harcmilliada | ${title}`;
	}, [userId]); //eslint-disable-line

	return (
		<Drawer href="/games" header="Lista gier">
			<MoGameList userId={userId} />
		</Drawer>
	);
}
