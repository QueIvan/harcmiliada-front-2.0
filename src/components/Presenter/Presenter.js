import React, { useEffect } from "react";
import { styled } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useSnackbar } from "notistack";
import io from "socket.io-client";

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

export default function Presenter(props) {
	const { userId, title } = props;
	const [currentQuestion, setCurrentQuestion] = React.useState(null);
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
			.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));

		listenForCommands();

		return () => disconnectSocket();
	}, [reload]); // eslint-disable-line

	return (
		<BackContainer container>
			<Grid item xs="auto">
				<ButtonText variant="h4" align="center">
					{currentQuestion?.content}
				</ButtonText>
				<ButtonText variant="span" align="center" smallHeader>
					Ilość odpowiedzi: {currentQuestion?.answers?.length}
				</ButtonText>
			</Grid>
		</BackContainer>
	);
}
