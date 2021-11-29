import React, { useEffect } from "react";
import GamesList from "../Game/GamesList";
import Drawer from "../Miscellaneous/Drawer/Drawer";
import QuestionsList from "../Question/QuestionsList";

export default function Dashboard(props) {
	const { title, userId } = props;

	useEffect(() => {
		document.title = `Harcmilliada | ${title}`;
	}, [userId]); //eslint-disable-line

	return (
		<Drawer header="Pulpit" userId={userId}>
			<GamesList header userId={userId} tableHeader="Gry" />
			<QuestionsList header userId={userId} tableHeader="Pytania" />
		</Drawer>
	);
}
