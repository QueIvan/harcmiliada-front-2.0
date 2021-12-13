import React, { useEffect } from "react";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useSnackbar } from "notistack";
import { sortAndSave } from "../../../utils/Sorter";
import MoTable from "../Miscellaneous/Table/MoTable";

export default function MoQuestionsList(props) {
	const [userQuestions, setUserQuestions] = React.useState(null);
	const [reload, setReload] = React.useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const { userId, dashboard } = props;

	const deleteQuestion = (questionId) => {
		fetch(`${process.env.REACT_APP_API_URL}/questions/${questionId}/${userId}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		})
			.then(() => setReload(!reload))
			.catch((err) => {
				enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 });
				console.error(err);
			});
	};

	const togglePublic = (questionId) => {
		fetch(`${process.env.REACT_APP_API_URL}/questions/${questionId}/status/${userId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
		})
			.then(() => setReload(!reload))
			.catch((err) => {
				enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 });
				console.error(err);
			});
	};

	const tableConfig = {
		cells: [
			{ id: "content", align: { header: "center", content: "left" }, length: false, disablePadding: true, label: "Treść pytania" },
			{
				id: "inPublicLib",
				align: { header: "right", content: "right" },
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
	};

	useEffect(() => {
		if (reload || userQuestions === null) {
			fetch(`${process.env.REACT_APP_API_URL}/questions/creator/${userId}/${userId}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			})
				.then((resp) => resp.json())
				.then((data) => sortAndSave(data, setUserQuestions, "createdAt"))
				.catch((err) => {
					enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 });
					console.error(err);
				});
			setReload(false);
		}
	}, [reload, userId]); // eslint-disable-line

	return (
		<MoTable
			{...props}
			creatorName="pytania"
			creatorPrompt="Podaj treść pytania"
			removeDeleteButton
			apiPath="questions"
			dashboard={dashboard}
			emptySize="63.25"
			tableConfig={tableConfig}
			loopOn={userQuestions}
		/>
	);
}
