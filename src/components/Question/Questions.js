import React, { useEffect } from "react";
import Drawer from "../Miscellaneous/Drawer/Drawer";
import QuestionsList from "./QuestionsList";

export default function Questions(props) {
	const { title, loggedOut, userId, loading } = props;

	useEffect(() => {
		document.title = `Harcmilliada | ${title}`;
	}, [userId]); //eslint-disable-line

	return (
		<Drawer header="Lista pytań" loggedOut={loggedOut} loading={loading} userId={userId}>
			<QuestionsList userId={userId} />
		</Drawer>
	);
}
