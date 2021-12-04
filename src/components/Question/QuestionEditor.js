import Table from "../Miscellaneous/Table/Table";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import Drawer from "../Miscellaneous/Drawer/Drawer";
import { faRandom, faSave } from "@fortawesome/free-solid-svg-icons";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";
import { sortAndSave } from "../../utils/Sorter";
import HeaderButton from "../Miscellaneous/Drawer/HeaderButton";

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
			id: "createdAt",
			align: "right",
			length: false,
			disablePadding: false,
			label: "Data stworzenia",
		},
	],
};

export default function QuestionEditor(props) {
	const { enqueueSnackbar } = useSnackbar();
	const questionId = useParams();
	const [currentQuestion, setCurrentQuestion] = React.useState(null);
	const [backupData, setBackupData] = React.useState(null);
	const [saving, setSaving] = React.useState(false);
	const nav = useNavigate();
	const { title, userId } = props;

	const setCurrentQuestionContent = (e, target) => {
		if (currentQuestion.answers.find((answer) => answer?.type === "empty")) {
			let question = { ...currentQuestion };
			let index = question.answers.findIndex((q) => q.type === "empty");
			question.answers[index][target] = e.target.value;
			setCurrentQuestion(question);
		}
	};

	const setRandomValues = () => {
		let n = currentQuestion.answers.length;
		let sum = 100;
		let randomNumbers = [];
		while (n > 0) {
			let random = Math.floor(Math.random() * (sum / n));
			randomNumbers.push(n === 1 ? sum : random);
			sum -= random;
			n--;
		}
		randomNumbers.sort((a, b) => b - a);
		let question = { ...currentQuestion };
		question.answers.forEach((answer, index) => {
			answer.score = randomNumbers[index];
		});
		setCurrentQuestion(question);
	};

	const setQuestionContent = (e, id) => {
		if (!currentQuestion.answers.find((answer) => answer?.type === "empty") && e.target.localName !== "input" && currentQuestion.answers.length < 10) {
			let question = { ...currentQuestion };
			if (id) {
				setBackupData(question.answers.find((answer) => answer.id === id));
				question.answers.find((answer) => answer.id === id).type = "empty";
			} else {
				question.answers.push({ type: "empty" });
			}
			setCurrentQuestion(question);
		}
	};

	const onEditableRowSave = (e) => {
		let question = { ...currentQuestion };
		let index = question.answers.findIndex((answer) => answer?.type === "empty");
		if (question.answers[index].content && question.answers[index].score) {
			delete question.answers[index].type;
			if (!question.answers[index].id) {
				question.answers[index].id = uuidv4();
			}
			setCurrentQuestion(question);
		}
	};

	const removeFromList = (selected) => {
		let question = { ...currentQuestion };
		question.answers = question.answers.filter((answer) => selected.indexOf(answer.id) === -1);
		setCurrentQuestion(question);
	};

	const onEditableRowCancel = (e) => {
		let question = { ...currentQuestion };
		let index = question.answers.findIndex((answer) => answer?.type === "empty");
		if (question.answers[index].createdAt) {
			question.answers[index].content = backupData?.content;
			question.answers[index].score = backupData?.score;
			delete question.answers[index].type;
		} else {
			question.answers.pop();
		}
		setCurrentQuestion(question);
	};

	const changeQuestionContent = (data) => {
		setCurrentQuestion({ ...currentQuestion, content: data });
	};

	const checkStatus = () => {
		setSaving(true);
		fetch(`${process.env.REACT_APP_API_URL}/questions/${userId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(currentQuestion),
		})
			.then((resp) => resp.json())
			.then(() => nav("/questions"))
			.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));
	};

	useEffect(() => {
		document.title = `Harcmilliada | ${title}`;
		fetch(`${process.env.REACT_APP_API_URL}/questions/${questionId.id}/${userId}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((resp) => resp.json())
			.then((data) => sortAndSave(data, setCurrentQuestion, "score", "answers"))
			.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));
	}, [userId]); // eslint-disable-line

	return (
		<Drawer
			userId={userId}
			header="Edytuj pytanie"
			editor={{ name: currentQuestion?.content, handler: changeQuestionContent }}
			headerOptions={
				<React.Fragment>
					<HeaderButton onClick={setRandomValues} tooltip="Przelosuj wartość odpowiedzi" placement="bottom" size="lg" icon={faRandom} />
					<HeaderButton onClick={checkStatus} tooltip="Zapisz pytanie" placement="bottom" loading={saving} size="lg" icon={faSave} />
				</React.Fragment>
			}
		>
			<Table
				userId={userId}
				addTooltip="Dodaj odpowiedź"
				apiPath="questions"
				addHandler={setQuestionContent}
				tableValueHandler={setCurrentQuestionContent}
				tableConfig={tableConfig}
				onSave={onEditableRowSave}
				onDiscard={onEditableRowCancel}
				handleRowClick={(e, id) => setQuestionContent(e, id)}
				handleRowRemoval={(selected) => removeFromList(selected)}
				emptySize="57"
				removeEmpty={currentQuestion?.answers?.length > 0}
				loopOn={currentQuestion ? currentQuestion.answers : null}
			/>
		</Drawer>
	);
}
