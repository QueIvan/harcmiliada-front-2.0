import { Autocomplete, Grid, Typography } from "@mui/material";
import { LoadingButton as MuiLoadingButton } from "@mui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChalkboard, faChild, faMale} from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/system";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { sortAndSave, sorting } from "../../../utils/Sorter";
import Drawer from "../Miscellaneous/Drawer/Drawer";
import { useSnackbar } from "notistack";
import VisbilityButton from "./VisbilityButton";
import WrongAnswerBox from "./WrongAnswerBox";
import AnswerBox from "./AnswerBox";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import HeaderButton from "../Miscellaneous/Drawer/HeaderButton";
import { moveToLink } from "../../../utils/Anchors";
import correct from "../../../resources/Correct.mp3";
import error from "../../../resources/Error.mp3";
import Selector from "../Miscellaneous/Drawer/Selector";
import {faArrowAltCircleRight, faArrowAltCircleLeft} from "@fortawesome/free-regular-svg-icons";

const CategoryHeader = styled(Typography, { shouldForwardProp: (props) => props !== "align" })(({ theme, align }) => ({
	fontWeight: "bold",
	color: "#ffffff",
	textShadow: "0px 0px 10px #000000",
	...(align && {
		textAlign: align,
	}),
}));

const LoadingButton = styled(MuiLoadingButton)(({ theme }) => ({
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

export default function Console(props) {
	// eslint-disable-next-line no-unused-vars
	const audios = { error: new Audio(error), correct: new Audio(correct) };
	const [visiblityStatus, setVisiblityStatus] = React.useState({ question: false, answers: false });
	const [wrongAnswers, setWrongAnswers] = React.useState({ left: 0, right: 0 });
	const [answersVisibility, setAnswersVisibility] = React.useState(null);
	const [currentAnswerer, setCurrentAnswerer] = React.useState(null);
	const [currentGame, setCurrentGame] = React.useState(null);
	const [reload, setReload] = React.useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const { title, userId } = props;
	const nav = useNavigate();
	const id = useParams().id;

	const target = { presenter: `presenter-&${id}`, board: `board-&${id}` };
	const socket = io("https://harcmiliada-socket.herokuapp.com");

	const initiateSocket = (room, gameId) => {
		if (socket && room) socket.emit("join", room, gameId);
	};

	const disconnectSocket = () => {
		if (socket) socket.disconnect();
	};

	const changeCurrentQuestion = (v) => {
		setAnswersVisibility(null);
		fetch(`${process.env.REACT_APP_API_URL}/games/${id}/current/${v}/${userId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
		})
			.then(() => setReload(!reload))
			.then(() => {
				socket.emit("reloadBoard", target.board);
				socket.emit("reloadBoard", target.presenter);
			})
			.catch((err) => {
				enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 });
				console.error(err);
			});
	};

	const changeWrongAnswersNumber = (side, action) => {
		let wrong = { ...wrongAnswers };
		if (action === "plus" && wrong[side] < 3) {
			wrong[side]++;
			audios.error.play();
		} else if (action === "minus" && wrong[side] > 0) wrong[side]--;
		setWrongAnswers(wrong);
		socket.emit("setWrongAnswersCount", target.board, wrong);
	};

	const changeAnswerVisibility = (id) => {
		let visibility = [...answersVisibility];
		let index = visibility.findIndex((v) => v.id === id);
		visibility[index] = { ...visibility[index], status: !visibility[index].status };
		if (visibility[index].status) audios.correct.play();
		setAnswersVisibility(visibility);
		socket.emit("setAnswerVisibility", target.board, visibility);
	};

	const changeVisibilityStatus = (part) => {
		setVisiblityStatus({ ...visiblityStatus, [part]: !visiblityStatus[part] });
		socket.emit("setVisibilityStatus", target.board, { ...visiblityStatus, [part]: !visiblityStatus[part] });
	};

	const openBoard = () => {
		moveToLink(`/games/${id}/board`, nav, "_blank");
	};

	const copyURL = (side) => {
		navigator.clipboard.writeText(`https://harcmiliada.pl/games/${id}/answerer/${side}`)
		enqueueSnackbar(`Skopiowano link dla strony: ${side}`, { variant: "info", autoHideDuration: 1500 });
	}

	const listenForCommand = () => {
		socket.on("setAnswerer", (side) => {
			setCurrentAnswerer(side);
			setTimeout(() => {
				setCurrentAnswerer(null);
			}, 5000);
		});
	};

	useEffect(() => {
		document.title = `Harcmilliada | ${title}`;

		initiateSocket("console", id);

		fetch(`${process.env.REACT_APP_API_URL}/games/${id}/${userId}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((resp) => resp.json())
			.then((data) => {
				sortAndSave(data, setCurrentGame, "createdAt", "questions");
				setCurrentGame({ ...data, currentQuestion: { ...data.currentQuestion, answers: sorting(data.currentQuestion.answers, "score") } });
				if (data.currentQuestion) setAnswersVisibility(data.currentQuestion.answers.map((a) => ({ id: a.id, status: false })));
			})
			.then(() => {
				setVisiblityStatus({ question: false, answers: false });
				setWrongAnswers({ left: 0, right: 0 });
			})
			.catch((err) => {
				enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 });
				console.error(err);
			});

		listenForCommand();

		return () => disconnectSocket();
	}, [userId, reload]); //eslint-disable-line

	return (
		<Drawer
			userId={userId}
			header={`Panel kontrolny`}
			headerOptions={
				<React.Fragment>
					<HeaderButton onClick={() => copyURL("left")} tooltip="Skopiuj link dla opowiadającego drużyny lewej" placement="bottom" size="lg" icon={faArrowAltCircleLeft} />
					<HeaderButton onClick={() => copyURL("right")} tooltip="Skopiuj link dla opowiadającego drużyny prawej" placement="bottom" size="lg" icon={faArrowAltCircleRight} />
					<HeaderButton onClick={openBoard} tooltip="Otwórz tablicę" placement="bottom" size="lg" icon={faChalkboard} />
					<LoadingButton startIcon={<FontAwesomeIcon size="lg" icon={currentAnswerer ? faChild : faMale} />} loadingPosition="center" variant="contained">
						{`Obecnie ${currentAnswerer ? `odpowiada ${currentAnswerer === "left" ? "lewa" : "prawa"} strona` : "nikt nie odpowiada"}`}
					</LoadingButton>
					<Autocomplete
						options={currentGame ? currentGame?.questions?.map((question) => ({ label: question.content, value: question.id })) : []}
						isOptionEqualToValue={(option, value) => option.label === value}
						value={currentGame && currentGame.currentQuestion ? currentGame.currentQuestion.content : null}
						onChange={(event, value) => changeCurrentQuestion(value.value)}
						disablePortal
						blurOnSelect
						disableClearable
						renderInput={(params) => <Selector {...params} label="Aktualne pytanie" />}
					/>
				</React.Fragment>
			}
		>
			<Grid container>
				<Grid container item xs={6} p={2}>
					<Grid item xs="auto">
						<CategoryHeader variant="h5">Zawartość strony</CategoryHeader>
					</Grid>
					<VisbilityButton
						active={visiblityStatus.question}
						label="Wyświetl pytanie"
						show={currentGame}
						onClick={() => changeVisibilityStatus("question")}
					/>
					<VisbilityButton
						active={visiblityStatus.answers}
						show={currentGame}
						label="Wyświetl odpowiedź"
						onClick={() => changeVisibilityStatus("answers")}
					/>
				</Grid>
				<Grid container item xs={6} p={2}>
					<Grid item xs={12}>
						<CategoryHeader variant="h5" align="right">
							Wyświetlenie blędów
						</CategoryHeader>
					</Grid>
					<Grid item xs={12} sx={{ textAlign: "center" }}>
						<CategoryHeader>Drużyna po lewej stronie</CategoryHeader>
					</Grid>
					<WrongAnswerBox show={currentGame} quantity={wrongAnswers.left} onClick={(action) => changeWrongAnswersNumber("left", action)} />
					<Grid item xs={12} sx={{ textAlign: "center" }}>
						<CategoryHeader>Drużyna po prawej stronie</CategoryHeader>
					</Grid>
					<WrongAnswerBox show={currentGame} quantity={wrongAnswers.right} onClick={(action) => changeWrongAnswersNumber("right", action)} />
				</Grid>
			</Grid>
			<Grid container mt={2}>
				<Grid item xs={12}>
					<CategoryHeader align="center" variant="h5">
						Wyświetlenie odpowiedzi
					</CategoryHeader>
				</Grid>
				<Grid container item xs={12} p={2} sx={{ justifyContent: "center" }}>
					<Grid container item xs={12} sx={{ justifyContent: "center" }}>
						{currentGame ? (
							<React.Fragment>
								{currentGame?.currentQuestion ? (
									<React.Fragment>
										{answersVisibility && (
											<React.Fragment>
												{currentGame?.currentQuestion?.answers?.length > 0 ? (
													<React.Fragment>
														{currentGame?.currentQuestion?.answers.map((answer) => (
															<AnswerBox
																key={answer.id}
																data={answer}
																active={answersVisibility?.find((v) => v.id === answer.id).status}
																onClick={() => changeAnswerVisibility(answer.id)}
															/>
														))}
													</React.Fragment>
												) : (
													<Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
														<AnswerBox removeHover data={{ content: "Brak odpowiedzi" }} />
													</Grid>
												)}
											</React.Fragment>
										)}
									</React.Fragment>
								) : (
									<Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
										<AnswerBox removeHover data={{ content: "Wybierz aktywne pytanie" }} />
									</Grid>
								)}
							</React.Fragment>
						) : (
							<React.Fragment>
								{Array.from(Array(10).keys()).map((i) => (
									<AnswerBox key={i} showSkeleton />
								))}
							</React.Fragment>
						)}
					</Grid>
				</Grid>
			</Grid>
		</Drawer>
	);
}
