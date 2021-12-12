import React, { useEffect } from "react";
import { styled } from "@mui/system";
import { Fade, Grid, Skeleton, Typography, Zoom } from "@mui/material";
import { sortAndSave } from "../../../utils/Sorter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar } from "notistack";
import Logo from "../Miscellaneous/Placeholders/Logo/Logo";
import { useParams } from "react-router";
import AnswerBox from "./AnswerBox";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";

const BackContainer = styled(Grid)(({ theme }) => ({
	width: "100vw",
	height: "100vh",
	position: "relative",
	backgroundImage: theme.background.image,
}));

const WrongBoxGrid = styled(Grid, { shouldForwardProp: (props) => props !== "active" })(({ theme, active }) => ({
	justifyContent: "center",
	transition: "border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	visibility: active ? "visible" : "hidden",
}));

const WrongBoxBackground = styled(Grid)(({ theme }) => ({
	border: "6px solid #d90429",
	borderRadius: theme.spacing(2),
	color: "#d90429",
	width: "clamp(90px, 90px, 90px) !important",
	height: "clamp(90px, 90px, 90px)",
	boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 90%), inset 0px 0px 5px 0px rgb(0 0 0 / 90%)",
	justifyContent: "center",
	alignItems: "center",
}));

const WrongBoxIcon = styled(FontAwesomeIcon)(({ theme }) => ({
	fontSize: "7rem",
	height: "fill-available",
	filter: "drop-shadow(0px 0px 5px rgb(0 0 0 / 90%))",
}));

export default function Board(props) {
	const [visiblityStatus, setVisiblityStatus] = React.useState({ question: false, answers: false });
	const [wrongBoxesStatus, setWrongBoxesStatus] = React.useState({ left: 3, right: 3 });
	const [currentQuestion, setCurrentQuestion] = React.useState(null);
	const [answersStatus, setAnswersStatus] = React.useState([]);
	const [idLabelZoom, setIdLabelZoom] = React.useState(false);
	const [reload, setReload] = React.useState(false);
	const [logoIn, setLogoIn] = React.useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const { userId, title } = props;
	const wrongAnswersLimit = 3;
	const id = useParams().id;

	const socket = io("https://harcmiliada-socket.herokuapp.com");

	const initiateSocket = (room, gameId) => {
		if (socket && room) socket.emit("join", room, gameId);
	};

	const disconnectSocket = () => {
		if (socket) socket.disconnect();
	};

	const listenForCommands = () => {
		socket.on("setVisibilityStatus", (data) => {
			setVisiblityStatus(data);
			if (data.answers) {
				setIdLabelZoom(true);
			}
		});
		socket.on("setAnswerVisibility", (data) => {
			setAnswersStatus(data);
		});
		socket.on("setWrongAnswersCount", (data) => {
			setWrongBoxesStatus(data);
		});
		socket.on("reloadBoard", () => {
			setReload(!reload);
		});
	};

	const createAnswerStatus = (data) => {
		setAnswersStatus(data.answers.map((answer) => ({ id: answer.id, status: false })));
	};

	const getAnswerStatus = (id) => {
		return answersStatus.find((answer) => answer.id === id)?.status;
	};

	useEffect(() => {
		document.title = `Harcmilliada | ${title}`;

		initiateSocket("board", id);

		setLogoIn(true);

		fetch(`${process.env.REACT_APP_API_URL}/games/${id}/current/${userId}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((resp) => resp.json())
			.then((data) => sortAndSave(data, setCurrentQuestion, "score", "answers", true))
			.then((data) => createAnswerStatus(data))
			.then(() => {
				setVisiblityStatus({ question: false, answers: false });
				setWrongBoxesStatus({ left: 0, right: 0 });
			})
			.then(() => {
				setTimeout(() => {
					setLogoIn(false);
				}, 1500);
			})
			.catch((err) => {
				enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 });
				console.error(err);
			});

		listenForCommands();

		return () => disconnectSocket();
	}, [reload]); //eslint-disable-line

	return (
		<BackContainer container>
			<Fade in={logoIn}>
				<Grid container sx={{ position: "absolute", width: "100vw", height: "100vh" }}>
					<Logo />
				</Grid>
			</Fade>
			<Fade in={!logoIn}>
				<Grid container item xs={12}>
					<Grid container item sx={{ alignItems: "center" }}>
						<Grid item xs={12}>
							<Grid
								item
								xs={6}
								sx={{
									marginLeft: "auto",
									marginRight: "auto",
									height: "fit-content",
									...(!visiblityStatus.question && { justifyContent: "center", display: "flex" }),
								}}
							>
								{visiblityStatus.question ? (
									<Fade in={true} timeout={750}>
										<Typography
											variant="h3"
											align="center"
											sx={{ fontWeight: "bold", color: "#ffffff", textShadow: "0px 0px 10px #000000", userSelect: "none" }}
										>
											{currentQuestion?.content}
										</Typography>
									</Fade>
								) : (
									<Skeleton variant="rectangle" width="85%" height="56px" />
								)}
							</Grid>
							<Grid item xs={12} sx={{ display: "flex", minHeight: "750px" }}>
								{Array.from(Array(2).keys()).map((i) => (
									<Grid container item xs={6} key={i} sx={{ height: "fit-content" }}>
										{currentQuestion?.content &&
											Array.from([...Array(5).keys()].map((k) => k + 5 * i)).map((el) => {
												return (
													<React.Fragment key={el}>
														{currentQuestion?.answers[el] && (
															<AnswerBox
																answer={currentQuestion?.answers[el]}
																active={getAnswerStatus(currentQuestion?.answers[el]?.id)}
																shown={visiblityStatus.answers}
																zoomStatus={idLabelZoom}
																showId={el + 1}
															/>
														)}
													</React.Fragment>
												);
											})}
									</Grid>
								))}
							</Grid>
						</Grid>
					</Grid>
					<Grid
						container
						item
						xs={12}
						sx={{
							position: "absolute",
							left: "25px",
							top: "25px",
							width: "calc(100% - 50px)",
							display: visiblityStatus.answers === true && visiblityStatus.question === true ? "flex" : "none",
							"&>*:last-of-type": { marginLeft: "auto", flexDirection: "row-reverse" },
						}}
					>
						{Object.keys(wrongBoxesStatus).map((el) => (
							<Grid key={el} container item xs={3}>
								{Array.from(Array(wrongAnswersLimit).keys()).map((i) => (
									<Zoom key={i} in={i < wrongBoxesStatus[el]}>
										<WrongBoxGrid key={i} active={i < wrongBoxesStatus[el]} container item xs={12 / wrongAnswersLimit}>
											<WrongBoxBackground container item>
												<WrongBoxIcon icon={faTimes} />
											</WrongBoxBackground>
										</WrongBoxGrid>
									</Zoom>
								))}
							</Grid>
						))}
					</Grid>
				</Grid>
			</Fade>
		</BackContainer>
	);
}
