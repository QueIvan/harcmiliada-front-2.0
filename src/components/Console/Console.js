import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { sortAndSave } from "../../utils/Sorter";
import Drawer from "../Miscellaneous/Drawer/Drawer";
import { useSnackbar } from "notistack";
import VisbilityButton from "./VisbilityButton";
import WrongAnswerBox from "./WrongAnswerBox";
import AnswerBox from "./AnswerBox";

const QuestionSelector = styled(TextField)(({ theme }) => ({
	width: "350px",
	"&>*, &>*>*>*": {
		color: "#e1e1e1 !important",
	},
	"&>*>fieldset": {
		borderColor: "#7A7A7A !important",
	},
}));

const CategoryHeader = styled(Typography, { shouldForwardProp: (props) => props !== "align" })(({ theme, align }) => ({
	fontWeight: "bold",
	color: "#ffffff",
	textShadow: "0px 0px 10px #000000",
	...(align && {
		textAlign: align,
	}),
}));

export default function Console(props) {
	const { title, userId } = props;
	const [visiblityStatus, setVisiblityStatus] = React.useState({ question: false, answers: false });
	const [answersVisibility, setAnswersVisibility] = React.useState(null);
	const [wrongAnswers, setWrongAnswers] = React.useState({ left: 0, right: 0 });
	const { enqueueSnackbar } = useSnackbar();
	const [currentGame, setCurrentGame] = React.useState(null);
	const [reload, setReload] = React.useState(false);
	const id = useParams().id;

	const changeCurrentQuestion = (v) => {
		setAnswersVisibility(null);
		fetch(`${process.env.REACT_APP_API_URL}/games/${id}/current/${v}/${userId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
		})
			.then(() => setReload(!reload))
			.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));
	};

	const changeWrongAnswersNumber = (side, action) => {
		let wrong = { ...wrongAnswers };
		console.log(action);
		if (action === "plus" && wrong[side] < 3) {
			wrong[side]++;
		} else if (action === "minus" && wrong[side] > 0) {
			wrong[side]--;
		}
		setWrongAnswers(wrong);
	};

	const changeAnswerVisibility = (id) => {
		let visibility = [...answersVisibility];
		let index = visibility.findIndex((v) => v.id === id);
		visibility[index] = { ...visibility[index], isVisible: !visibility[index].isVisible };
		setAnswersVisibility(visibility);
	};

	useEffect(() => {
		document.title = `Harcmilliada | ${title}`;
		fetch(`${process.env.REACT_APP_API_URL}/games/${id}/${userId}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((resp) => resp.json())
			.then((data) => sortAndSave(data, setCurrentGame, "createdAt", "questions", true))
			.then((data) => setAnswersVisibility(data.currentQuestion.answers.map((a) => ({ id: a.id, isVisible: false }))))
			.then(() => {
				setVisiblityStatus({ question: false, answers: false });
				setWrongAnswers({ left: 0, right: 0 });
			})
			.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));
	}, [userId, reload]); //eslint-disable-line

	return (
		<Drawer
			userId={userId}
			header={`Panel kontrolny`}
			headerOptions={
				<Autocomplete
					options={currentGame ? currentGame?.questions?.map((question) => ({ label: question.content, value: question.id })) : []}
					isOptionEqualToValue={(option, value) => option.label === value}
					value={currentGame && currentGame.currentQuestion ? currentGame.currentQuestion.content : null}
					onChange={(event, value) => changeCurrentQuestion(value.value)}
					disablePortal
					blurOnSelect
					disableClearable
					renderInput={(params) => <QuestionSelector {...params} label="Aktualne pytanie" />}
				/>
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
						onClick={() => setVisiblityStatus({ ...visiblityStatus, question: !visiblityStatus.question })}
					/>
					<VisbilityButton
						active={visiblityStatus.answers}
						show={currentGame}
						label="Wyświetl odpowiedź"
						onClick={() => setVisiblityStatus({ ...visiblityStatus, answers: !visiblityStatus.answers })}
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
					<Grid container item xs={10} sx={{ justifyContent: "center" }}>
						{currentGame ? (
							<React.Fragment>
								{answersVisibility &&
									currentGame?.currentQuestion?.answers.map((answer) => (
										<AnswerBox
											key={answer.id}
											data={answer}
											active={answersVisibility?.find((v) => v.id === answer.id).isVisible}
											onClick={() => changeAnswerVisibility(answer.id)}
										/>
									))}
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
