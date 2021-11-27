import { faExchangeAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { Grid, Grid as MuiGrid, IconButton as MuiIconButton, Tooltip } from "@mui/material";
import { useParams } from "react-router";
import { useSnackbar } from "notistack";
import Drawer from "../Miscellaneous/Drawer/Drawer";
import Table from "../Miscellaneous/Table/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { sortAndSave } from "../../utils/Sorter";
import HeaderButton from "../Miscellaneous/Drawer/HeaderButton";

const StyledButton = styled(MuiIconButton)(({ theme }) => ({
	borderRadius: theme.spacing(2),
	padding: theme.spacing(2),
	backgroundColor: "#3C5344",
	color: "#f1f1f1",
	border: "1px solid #292929",
	transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
	"&:hover": {
		backgroundColor: "#334739",
	},
}));

const MoveContainer = styled(MuiGrid)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

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
	],
};

export default function GameEditor(props) {
	const { enqueueSnackbar } = useSnackbar();
	const gameId = useParams();
	const [activeData, setActiveData] = React.useState(null);
	const [libData, setLibData] = React.useState(null);
	const [moveData, setMoveData] = React.useState();
	const [saving, setSaving] = React.useState(false);
	const nav = useNavigate();
	const { title, loggedOut, userId } = props;

	const checkStatus = () => {
		setSaving(true);
		fetch(`${process.env.REACT_APP_API_URL}/games/${userId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(activeData),
		})
			.then((resp) => resp.json())
			.then(() => nav("/games"))
			.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));
	};

	const changeActiveData = (data) => {
		setActiveData({ ...activeData, questions: data });
	};

	const changeLibData = (data) => {
		setLibData(data);
	};

	const changeMoveData = () => {
		setMoveData(!moveData);
	};

	const changeGameName = (name) => {
		setActiveData({ ...activeData, name: name });
	};

	const tableMoveConfig = {
		variable: {
			active: activeData ? [...activeData.questions] : null,
			lib: libData ? [...libData] : null,
		},
		handler: {
			active: changeActiveData,
			lib: changeLibData,
		},
	};

	useEffect(() => {
		document.title = `Harcmilliada | ${title}`;
		if (activeData === null && libData === null && userId) {
			fetch(`${process.env.REACT_APP_API_URL}/games/${gameId.id}/${userId}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			})
				.then((resp) => resp.json())
				.then((data) => sortAndSave(data, setActiveData, "createdAt", "questions"))
				.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));
			fetch(`${process.env.REACT_APP_API_URL}/questions/notin/${gameId.id}/${userId}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			})
				.then((resp) => resp.json())
				.then((data) => sortAndSave(data, setLibData, "createdAt"))
				.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));
		}
	}, [activeData, libData, userId]); // eslint-disable-line

	return (
		<Drawer
			loggedOut={loggedOut}
			userId={userId}
			header={`Edytuj grę`}
			editor={{ name: activeData?.name, handler: changeGameName }}
			headerOptions={<HeaderButton onClick={() => checkStatus()} loading={saving} size="lg" icon={faSave} />}
		>
			<Table
				small
				header
				userId={userId}
				tableHeader="Aktualne pytania"
				apiPath="questions"
				tableConfig={tableConfig}
				emptySize="57"
				loopOn={activeData ? activeData.questions : null}
				moveData={moveData}
				removeDelete
				removeCreate
				move={{
					...tableMoveConfig,
					direction: "lib",
				}}
			/>
			<Grid container item xs={1}>
				<MoveContainer item xs={12}>
					<Tooltip disableInteractive={true} title="Przenieś pytania" arrow placement="bottom">
						<StyledButton onClick={changeMoveData}>
							<FontAwesomeIcon size="sm" icon={faExchangeAlt} />
						</StyledButton>
					</Tooltip>
				</MoveContainer>
			</Grid>
			<Table
				small
				header
				userId={userId}
				headerPlacement="right"
				tableHeader="Biblioteka"
				apiPath="questions"
				tableConfig={tableConfig}
				emptySize="57"
				emptyPlaceholder={true}
				loopOn={libData}
				moveData={moveData}
				removeDelete
				removeCreate
				move={{
					...tableMoveConfig,
					direction: "active",
				}}
			/>
		</Drawer>
	);
}
