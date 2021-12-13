import React, { useEffect } from "react";
import { faEdit, faNetworkWired, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { moveToLink } from "../../../utils/Anchors";
import { sortAndSave } from "../../../utils/Sorter";
import MoTable from "../Miscellaneous/Table/MoTable";

export default function MoGameList(props) {
	const [userGames, setUserGames] = React.useState(null);
	const { enqueueSnackbar } = useSnackbar();
	const nav = useNavigate();
	const { userId, dashboard } = props;

	const openConsole = (gameId) => {
		moveToLink(`/games/${gameId}/console`, nav);
	};

	const deleteGame = (gameId) => {
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
			{ id: "name", align: { header: "center", content: "left" }, length: false, disablePadding: true, label: "Tytuł gry" },
			{ id: "questions", align: "right", length: true, disablePadding: false, label: "Ilość pytań" },
			{
				id: "options",
				align: "right",
				length: false,
				disablePadding: false,
				label: "Opcje",
				options: [
					{ id: "console", label: "Otwórz konsole", icon: faNetworkWired, handle: openConsole },
					{ id: "edit", label: "Edytuj", icon: faEdit, editorPath: "games" },
					{ id: "delete", label: "Usuń", icon: faTrashAlt, handle: deleteGame },
				],
			},
		],
	};

	useEffect(() => {
		if (userGames === null) {
			fetch(`${process.env.REACT_APP_API_URL}/games/owner/${userId}/${userId}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			})
				.then((resp) => resp.json())
				.then((data) => sortAndSave(data, setUserGames, "createdAt"))
				.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));
		}
	}, [userId]); // eslint-disable-line

	return <MoTable {...props} removeDeleteButton emptySize="57" apiPath="games" dashboard={dashboard} tableConfig={tableConfig} loopOn={userGames} />;
}
