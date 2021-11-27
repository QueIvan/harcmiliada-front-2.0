import React, { useEffect } from "react";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { sortAndSave } from "../../utils/Sorter";
import { useSnackbar } from "notistack";
import Table from "../Miscellaneous/Table/Table";

export default function QuestionsList(props) {
	const { enqueueSnackbar } = useSnackbar();
	const userId = props.userId;
	const [userQuestions, setUserQuestions] = React.useState(null);
	const [reload, setReload] = React.useState(false);

	const deleteQuestion = (questionId) => {
		fetch(`${process.env.REACT_APP_API_URL}/questions/${questionId}/${userId}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		})
			.then(() => setReload(!reload))
			.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));
	};

	const togglePublic = (questionId) => {
		fetch(`${process.env.REACT_APP_API_URL}/questions/${questionId}/status/${userId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
		})
			.then(() => setReload(!reload))
			.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));
	};

	const tableConfig = {
		cells: [
			{
				id: "content",
				align: {
					header: "center",
					content: "left",
				},
				length: false,
				disablePadding: true,
				label: "Treść pytania",
			},
			{
				id: "answers",
				align: "right",
				length: true,
				disablePadding: false,
				label: "Ilość odpowiedzi",
			},
			{
				id: "createdAt",
				align: "right",
				length: false,
				disablePadding: false,
				label: "Data stworzenia",
			},
			{
				id: "inPublicLib",
				align: {
					header: "right",
					content: "right",
				},
				length: false,
				disablePadding: false,
				label: "Udostępnione publicznie",
				handler: togglePublic,
			},
			{
				id: "options",
				align: "right",
				length: false,
				disablePadding: false,
				label: "Opcje",
				options: [
					{ id: "edit", label: "Edytuj", icon: faEdit, editorPath: "questions" },
					{ id: "delete", label: "Usuń", icon: faTrashAlt, handle: deleteQuestion },
				],
			},
		],
		contextMenu: {
			config: { includeEmpty: false },
			buttons: [
				{ id: "edit", label: "Edytuj", icon: faEdit, editorPath: "questions" },
				{ id: "delete", label: "Usuń", icon: faTrashAlt, handle: deleteQuestion },
			],
		},
	};

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/questions/creator/${userId}/${userId}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((resp) => resp.json())
			.then((data) => sortAndSave(data, setUserQuestions, "createdAt"))
			.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));
	}, [reload, userId]); //eslint-disable-line

	return (
		<Table
			{...props}
			userId={userId}
			emptySize="58.75"
			tableHeader="Pytania"
			apiPath="questions"
			tableConfig={tableConfig}
			loopOn={userQuestions}
			creatorName="pytania"
			creatorPrompt="Podaj treść pytania"
			addTooltip="Stwórz nowe pytanie"
			deleteTooltip="Usuń zaznaczone pytania"
		/>
	);
}
