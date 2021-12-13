import React, { useEffect } from "react";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";

export default function Support(props) {
	const { enqueueSnackbar } = useSnackbar();
	const { userId, title } = props;

	const createIssue = () => {
		fetch(`https://api.github.com/repos/QueIvan/harcmiliada-front-2.0/issues`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
			},
			body: JSON.stringify({
				title: userId,
			}),
		})
			.then((data) => console.log(data))
			.catch((err) => {
				enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 });
				console.error(err);
			});
	};

	useEffect(() => {
		document.title = `Harcmilliada | ${title}`;
	}, []); // eslint-disable-line

	return <Button onClick={createIssue}>Stwórz zapytanie</Button>;
}
