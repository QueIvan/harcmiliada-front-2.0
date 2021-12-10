import React, { useEffect } from "react";
import Table from "../Miscellaneous/Table/Table";
import { faChalkboard, faChalkboardTeacher, faEdit, faNetworkWired, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { sortAndSave } from "../../utils/Sorter";
import { moveToLink } from "../../utils/Anchors";

export default function GamesList(props) {
	const [userGames, setUserGames] = React.useState(null);
	const { enqueueSnackbar } = useSnackbar();
	const { hrefHeader, userId } = props;
	const nav = useNavigate();

	const openConsole = (e, gameId) => {
		e.preventDefault();
		if (e.button === 1) {
			moveToLink(`/games/${gameId}/console`, nav, "_blank");
		} else if (e.button === 0) {
			moveToLink(`/games/${gameId}/console`, nav);
		}
	};

	const openBoard = (e, gameId) => {
		e.preventDefault();
		if (e.button === 1) {
			moveToLink(`/games/${gameId}/board`, nav, "_blank");
		} else if (e.button === 0) {
			moveToLink(`/games/${gameId}/board`, nav);
		}
	};

	const openPresenter = (e, gameId) => {
		e.preventDefault();
		if (e.button === 1) {
			moveToLink(`/games/${gameId}/presenter`, nav, "_blank");
		} else if (e.button === 0) {
			moveToLink(`/games/${gameId}/presenter`, nav);
		}
	};

	const deleteGame = (e, gameId) => {
		fetch(`${process.env.REACT_APP_API_URL}/games/${gameId}/${userId}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		})
			.then(() => nav(0))
			.catch((err) => {
				enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 });
				console.error(err);
			});
	};

	const tableConfig = {
		cells: [
			{
				id: "name",
				align: {
					header: "center",
					content: "left",
				},
				length: false,
				disablePadding: true,
				label: "Tytuł gry",
			},
			{
				id: "questions",
				align: "right",
				length: true,
				disablePadding: false,
				label: "Ilość pytań",
			},
			{
				id: "createdAt",
				align: "right",
				length: false,
				disablePadding: false,
				label: "Data stworzenia",
			},
			{
				id: "options",
				align: "right",
				length: false,
				disablePadding: false,
				label: "Opcje",
				options: [
					{ id: "board", label: "Przejdź do tablicy", icon: faChalkboard, handle: openBoard },
					{ id: "presenter", label: "Otwórz panel prowadzącego", icon: faChalkboardTeacher, handle: openPresenter },
					{ id: "console", label: "Otwórz konsole", icon: faNetworkWired, handle: openConsole },
					{ id: "edit", label: "Edytuj", icon: faEdit, editorPath: "games" },
					{ id: "delete", label: "Usuń", icon: faTrashAlt, handle: deleteGame },
				],
			},
		],
	};

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/games/owner/${userId}/${userId}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((resp) => resp.json())
			.then((data) => sortAndSave(data, setUserGames, "createdAt"))
			.catch((err) => {
				enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 });
				console.error(err);
			});
	}, [userId]); //eslint-disable-line

	return (
		<Table
			{...props}
			userId={userId}
			emptySize="58.75"
			apiPath="games"
			hrefHeader={hrefHeader}
			tableConfig={tableConfig}
			loopOn={userGames}
			creatorName="gry"
			creatorPrompt="Podaj nazwę gry"
			addTooltip="Stwórz nową grę"
			deleteTooltip="Usuń zaznaczone gry"
		/>
	);
}
