import MoTable from "../Miscellaneous/Table/MoTable";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import Drawer from "../Miscellaneous/Drawer/Drawer";
import { faRandom, faSave, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useSnackbar } from "notistack";
import { Grid } from "@mui/material";
import { LoadingButton as MuiLoadingButton } from "@mui/lab";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";
import { sortAndSave } from "../../../utils/Sorter";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledButton = styled(MuiLoadingButton)(({ theme }) => ({
	height: "fit-content",
	backgroundColor: "#455F4D",
	color: "#f1f1f1",
	padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
	border: "1px solid #292929",
	"&>.MuiLoadingButton-loadingIndicator": { color: "#666666" },
}));

const OptionHeader = styled(Typography)(({ theme }) => ({
	fontWeight: "bold",
	color: "#ffffff",
	textShadow: "0px 0px 10px #000000",
}));

const tableConfig = {
	cells: [
		{
			id: "content",
			align: "center",
			length: false,
			disablePadding: true,
			label: "Treść odpowiedzi",
		},
		{
			id: "score",
			align: "right",
			length: false,
			disablePadding: false,
			label: "Ilość punktów",
		},
		{
			id: "options",
			align: "right",
			length: false,
			disablePadding: false,
			label: "Opcje",
			options: [{ id: "edit", label: "Edytuj", icon: faEdit, editorPath: "questions" }],
		},
	],
};

export default function MoQuestionEditor(props) {
	const [currentQuestion, setCurrentQuestion] = React.useState(null);
	const [backupData, setBackupData] = React.useState(null);
	const [saving, setSaving] = React.useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const { title, userId } = props;
	const questionId = useParams();
	const nav = useNavigate();

	useEffect(() => {
		document.title = `Harcmilliada | ${title}`;
		fetch(`${process.env.REACT_APP_API_URL}/questions/${questionId.id}/${userId}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((resp) => resp.json())
			.then((data) => sortAndSave(data, setCurrentQuestion, "score", "answers"))
			.catch((err) => {
				enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 });
				console.error(err);
			});
	}, [userId]); // eslint-disable-line
	return (
		<Drawer
			userId={userId}
			href="/questions"
			header="Edytuj pytanie"
			replaceHeader={
				<React.Fragment>
					<Grid container item xs={12} sx={{ padding: "0 8px", marginBottom: "8px" }}>
						<OptionHeader variant="h6">{title}</OptionHeader>
						<StyledButton sx={{ marginLeft: "auto" }} size="sm" loadingPosition="center" variant="contained">
							<FontAwesomeIcon size="sm" icon={faRandom} />
						</StyledButton>
						<StyledButton sx={{ marginLeft: "10px" }} size="sm" loadingPosition="center" variant="contained">
							<FontAwesomeIcon size="sm" icon={faSave} />
						</StyledButton>
					</Grid>
					<Grid container item xs={12}>
						<OptionHeader variant="h4" sx={{ width: "100%", textAlign: "center" }}>
							{currentQuestion?.content}
						</OptionHeader>
					</Grid>
				</React.Fragment>
			}
		>
			<MoTable
				userId={userId}
				apiPath="questions"
				tableConfig={tableConfig}
				emptySize="57"
				removeDeleteButton
				removeEmpty={currentQuestion?.answers?.length > 0}
				loopOn={currentQuestion ? currentQuestion.answers : null}
			/>
		</Drawer>
	);
}
