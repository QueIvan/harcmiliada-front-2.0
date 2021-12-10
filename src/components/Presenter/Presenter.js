import React, { useEffect } from "react";
import { LoadingButton as MuiLoadingButton } from "@mui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useSnackbar } from "notistack";
import io from "socket.io-client";
import { faChild, faMale } from "@fortawesome/free-solid-svg-icons";

const BackContainer = styled(Grid)(({ theme }) => ({
	width: "100vw",
	height: "100vh",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundImage: theme.background.image,
}));

const ButtonText = styled(Typography, { shouldForwardProp: (props) => props !== "smallHeader" })(({ theme, smallHeader }) => ({
	...(!smallHeader && { fontWeight: "bold", padding: theme.spacing(2) }),
	...(smallHeader && { width: "100%", display: "block" }),
	textAlign: "center",
	userSelect: "none",
	color: "#ffffff",
	transition: "border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	textShadow: "0px 0px 10px #000000",
}));

const LoadingButton = styled(MuiLoadingButton)(({ theme, row }) => ({
	height: "fit-content",
	backgroundColor: "#455F4D",
	color: "#f1f1f1",
	padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
	border: "1px solid #292929",
	pointerEvents: "none",
	"&>*:first-of-type": {
		marginRight: theme.spacing(2),
	},
}));

export default function Presenter(props) {
	const { userId, title } = props;
	const [currentQuestion, setCurrentQuestion] = React.useState(null);
	const [currentAnswerer, setCurrentAnswerer] = React.useState(null);
	const [reload, setReload] = React.useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const id = useParams().id;

	const socket = io("https://harcmiliada-socket.herokuapp.com");

	const initiateSocket = (room, gameId) => {
		if (socket && room) socket.emit("join", room, gameId);
	};

	const disconnectSocket = () => {
		if (socket) socket.disconnect();
	};

	const listenForCommands = () => {
		socket.on("reloadBoard", () => {
			setReload(!reload);
		});
		socket.on("setAnswerer", (side) => {
			setCurrentAnswerer(side);
		});
	};

	useEffect(() => {
		document.title = `Harcmilliada | ${title}`;

		initiateSocket("presenter", id);

		fetch(`${process.env.REACT_APP_API_URL}/games/${id}/current/${userId}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => setCurrentQuestion(data))
			.catch((err) => {
				enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 });
				console.error(err);
			});

		listenForCommands();

		return () => disconnectSocket();
	}, [reload]); // eslint-disable-line

	return (
		<BackContainer container>
			<Grid container item xs={11}>
				<Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
					<LoadingButton
						startIcon={<FontAwesomeIcon size="lg" icon={currentAnswerer ? faChild : faMale} />}
						loadingPosition="center"
						variant="contained"
					>
						{`Obecnie ${currentAnswerer ? `odpowiada ${currentAnswerer === "left" ? "lewa" : "prawa"} strona` : "nikt nie odpowiada"}`}
					</LoadingButton>
				</Grid>
				<Grid item xs={12}>
					<ButtonText variant="h1" align="center">
						{currentQuestion?.content}
					</ButtonText>
				</Grid>
				<Grid item xs={12}>
					<ButtonText variant="h5" align="center" smallHeader>
						Ilość odpowiedzi: {currentQuestion?.answers?.length}
					</ButtonText>
				</Grid>
			</Grid>
		</BackContainer>
	);
}
