import React, { useEffect } from "react";
import MoGameList from "../Game/MoGameList";
import Drawer from "../Miscellaneous/Drawer/Drawer";
import MoQuestionsList from "../Question/MoQuestionsList";

export default function MoDashboard(props) {
	const { title, userId } = props;

	useEffect(() => {
		document.title = `Harcmilliada | ${title}`;
	}, [userId]); //eslint-disable-line

	return (
		<Drawer href="/" header="Pulpit">
			<MoGameList header removeButtons inList tableHeader="Gry" userId={userId} dashboard />
			<MoQuestionsList header removeButtons inList tableHeader="Pytania" userId={userId} dashboard />
		</Drawer>
	);
}
