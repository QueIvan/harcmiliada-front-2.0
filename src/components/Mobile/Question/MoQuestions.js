import React, { useEffect } from "react";
import Drawer from "../Miscellaneous/Drawer/Drawer";
import MoQuestionsList from "./MoQuestionsList";

export default function MoQuestions(props) {
	const { title, userId } = props;

	useEffect(() => {
		document.title = `Harcmilliada | ${title}`;
	}, [userId]); //eslint-disable-line
	return (
		<Drawer href="/questions" header="Lista pytań">
			<MoQuestionsList userId={userId} />
		</Drawer>
	);
}
