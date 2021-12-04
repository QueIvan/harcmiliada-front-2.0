import React, { useEffect } from "react";
import { styled } from "@mui/system";
import { Fade, Grid, Skeleton, Typography, Zoom } from "@mui/material";
import { sortAndSave } from "../../utils/Sorter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar } from "notistack";
import Logo from "../Miscellaneous/Placeholders/Logo/Logo";
import { useParams } from "react-router";
import AnswerBox from "./AnswerBox";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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
	const [currentQuestion, setCurrentQuestion] = React.useState(null);
	const [wrongBoxesStatus, setWrongBoxesStatus] = React.useState({ left: 0, right: 0 });
	const [visiblityStatus, setVisiblityStatus] = React.useState({ question: true, answers: true }); //eslint-disable-line
	const [wrongAnswerIndicator, setWrongAnswerIndicator] = React.useState(false);
	const [idLabelZoom, setIdLabelZoom] = React.useState(true);
	const [answersStatus, setAnswersStatus] = React.useState([]);
	const [logoIn, setLogoIn] = React.useState(true);
	const { enqueueSnackbar } = useSnackbar();
	const id = useParams().id;
	const { userId } = props;

	const createAnswerStatus = (data) => {
		setAnswersStatus(data.answers.map((answer) => ({ id: answer.id, status: false })));
	};

	const getAnswerStatus = (id) => {
		return answersStatus.find((answer) => answer.id === id)?.status;
	};

	const changeWrongAnswersSide = (side, action) => {
		let wrong = { ...wrongBoxesStatus };
		if (wrong[side] < 3 && action === "plus") {
			wrong[side]++;
		} else if (action === "minus" && wrong[side] > 0) {
			wrong[side]--;
		}
		setWrongBoxesStatus(wrong);
	};

	// eslint-disable-next-line
	const changeWrongAnswersNumber = (side, action) => {
		if (wrongBoxesStatus[side] < 3 && action === "plus") {
			setWrongAnswerIndicator(true);
			setTimeout(() => {
				setWrongAnswerIndicator(false);
				changeWrongAnswersSide(side, action);
			}, 1000);
		} else if (action === "minus" && wrongBoxesStatus[side] > 0) {
			changeWrongAnswersSide(side, action);
		}
	};

	// eslint-disable-next-line
	const changeAnswersVisibility = () => {
		setVisiblityStatus({ ...visiblityStatus, answers: !visiblityStatus.answers });
		setTimeout(() => {
			setIdLabelZoom(true);
		}, 500);
	};

	// eslint-disable-next-line
	const changeAnswerStatus = (id) => {
		let status = [...answersStatus];
		status.find((answer) => answer.id === id).status = !status.find((answer) => answer.id === id).status;
		setAnswersStatus(status);
	};

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/games/${id}/current/${userId}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((resp) => resp.json())
			.then((data) => sortAndSave(data, setCurrentQuestion, "score", "answers", true))
			.then((data) => createAnswerStatus(data))
			.then(() => {
				setTimeout(() => {
					setLogoIn(false);
				}, 1500);
			})
			.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));
	}, []); //eslint-disable-line

	return (
		<BackContainer container>
			<Fade in={logoIn}>
				<Grid container sx={{ position: "absolute", width: "100vw", height: "100vh" }}>
					<Logo />
				</Grid>
			</Fade>
			<Fade in={!logoIn}>
				<Grid container item xs={12}>
					<Grid container item p={5} sx={{ alignItems: "center" }}>
						<Grid item xs={12}>
							<Grid item xs={12} sx={{ height: "fit-content", ...(!visiblityStatus.question && { justifyContent: "center", display: "flex" }) }}>
								{visiblityStatus.question ? (
									<Typography
										variant="h4"
										align="center"
										sx={{ fontWeight: "bold", color: "#ffffff", textShadow: "0px 0px 10px #000000", userSelect: "none" }}
									>
										{currentQuestion?.content}
									</Typography>
								) : (
									<Skeleton variant="rectangle" width="85%" height="45px" />
								)}
							</Grid>
							<Grid item xs={12} sx={{ display: "flex", minHeight: "750px" }}>
								{Array.from(Array(2).keys()).map((i) => (
									<Grid container item xs={6} key={i}>
										{currentQuestion?.content &&
											Array.from([...Array(5).keys()].map((k) => k + 5 * i)).map((el) => {
												return (
													<React.Fragment key={el}>
														{currentQuestion?.answers[el] ? (
															<AnswerBox
																answer={currentQuestion?.answers[el]}
																active={getAnswerStatus(currentQuestion?.answers[el]?.id)}
																shown={visiblityStatus.answers}
																zoomStatus={idLabelZoom}
																showId={el + 1}
															/>
														) : (
															<AnswerBox empty shown={visiblityStatus.answers} />
														)}
													</React.Fragment>
												);
											})}
									</Grid>
								))}
							</Grid>
						</Grid>
					</Grid>
					<Grid container item xs={3} sx={{ position: "absolute", left: "25px", top: "25px" }}>
						{Array.from(Array(3).keys()).map((i, index, arr) => (
							<Zoom key={i} in={i < wrongBoxesStatus.left}>
								<WrongBoxGrid key={i} active={i < wrongBoxesStatus.left} container item xs={12 / arr.length}>
									<WrongBoxBackground sx={{}} container item>
										<WrongBoxIcon icon={faTimes} />
									</WrongBoxBackground>
								</WrongBoxGrid>
							</Zoom>
						))}
					</Grid>
					<Grid container item xs={3} sx={{ position: "absolute", right: "25px", top: "25px", flexDirection: "row-reverse" }}>
						{Array.from(Array(3).keys()).map((i, index, arr) => (
							<Zoom key={i} in={i < wrongBoxesStatus.right}>
								<WrongBoxGrid key={i} active={i < wrongBoxesStatus.right} container item xs={12 / arr.length}>
									<WrongBoxBackground container item>
										<WrongBoxIcon icon={faTimes} />
									</WrongBoxBackground>
								</WrongBoxGrid>
							</Zoom>
						))}
					</Grid>
					<Grid container item xs="auto" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
						<Zoom in={wrongAnswerIndicator}>
							<WrongBoxGrid active={true} container>
								<WrongBoxBackground
									sx={{
										width: "clamp(250px, 250px, 250px) !important",
										height: "clamp(250px, 250px, 250px)",
										borderWidth: "1.5rem",
										"&>*": { fontSize: "15rem" },
									}}
									container
									item
								>
									<WrongBoxIcon icon={faTimes} />
								</WrongBoxBackground>
							</WrongBoxGrid>
						</Zoom>
					</Grid>
				</Grid>
			</Fade>
		</BackContainer>
	);
}
