import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import Creator from "../Creator/Creator";
import React from "react";

const PaginationContainer = styled(Grid)(({ theme }) => ({
	width: "fit-content",
	flexWrap: "nowrap",
	marginLeft: theme.spacing(2.5),
	marginRight: theme.spacing(1.5),
	gap: "10px",
}));

const PaginationIconButton = styled(IconButton)(({ theme }) => ({
	color: "#f1f1f1",
	"&.Mui-disabled": { color: "#8e8e8e" },
}));

const PaginationButton = styled(LoadingButton)(({ theme }) => ({
	backgroundColor: "#455F4D",
	"&:hover": { backgroundColor: "#334739" },
	"&.Mui-disabled": { backgroundColor: "#243128", color: "#666666" },
	"&>.MuiLoadingButton-loadingIndicator": { color: "#666666" },
}));

export default function Pagination(props) {
	const { enqueueSnackbar } = useSnackbar();
	const {
		apiPath,
		count,
		page,
		deleteCondition,
		rowsPerPage,
		onPageChange,
		nav,
		addTooltip,
		deleteTooltip,
		deleteHandler,
		addHandler,
		creatorName,
		creatorPrompt,
		removeDelete,
		removeCreate,
		userId,
	} = props;
	const [loading, setLoading] = React.useState({
		delete: false,
		create: false,
	});
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(!open);
		setLoading({ ...loading, create: false });
	};

	const setCurrentlyLoading = (loadingType) => {
		setLoading({ ...loading, [loadingType]: !loading[loadingType] });
		if (loadingType === "delete") {
			deleteHandler();
		} else {
			setOpen(true);
		}
	};

	const saveData = (data, creator) => {
		let correctData;
		console.log(data);
		console.log(creator);
		if (apiPath === "games") {
			correctData = { name: data, ownerId: creator ? creator : userId };
		} else {
			correctData = { content: data, creatorId: creator ? creator : userId, answers: [] };
		}
		fetch(`${process.env.REACT_APP_API_URL}/${apiPath}/${userId}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(correctData),
		})
			.then((resp) => resp.json())
			.then((json) => {
				nav(`/${apiPath}/${json.id}`);
			})
			.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));
	};

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<PaginationContainer container>
			{count <= rowsPerPage ? null : (
				<React.Fragment>
					<PaginationIconButton size="small" onClick={handleFirstPageButtonClick} disabled={page === 0}>
						<FontAwesomeIcon icon={faAngleDoubleLeft} />
					</PaginationIconButton>
					<PaginationIconButton size="small" onClick={handleBackButtonClick} disabled={page === 0}>
						<FontAwesomeIcon icon={faAngleLeft} />
					</PaginationIconButton>
					<PaginationIconButton size="small" onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
						<FontAwesomeIcon icon={faAngleRight} />
					</PaginationIconButton>
					<PaginationIconButton size="small" onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
						<FontAwesomeIcon icon={faAngleDoubleRight} />
					</PaginationIconButton>
				</React.Fragment>
			)}
			<React.Fragment>
				{!removeDelete && (
					<Tooltip disableInteractive={true} title={deleteTooltip ? deleteTooltip : "Usuń zaznaczone obiekty"} arrow placement="bottom">
						<span>
							<PaginationButton
								onClick={() => {
									setCurrentlyLoading("delete");
								}}
								loading={loading.delete}
								loadingPosition="center"
								variant="contained"
								className={!deleteCondition ? `Mui-disabled` : ``}
							>
								{!loading.delete ? <FontAwesomeIcon icon={faTrashAlt} /> : null}
							</PaginationButton>
						</span>
					</Tooltip>
				)}

				{!removeCreate && (
					<Tooltip disableInteractive={true} title={addTooltip ? addTooltip : "Stwórz obiekt"} arrow placement="bottom">
						<PaginationButton
							onClick={
								addHandler
									? addHandler
									: (e) => {
											e.target.blur();
											setCurrentlyLoading("create");
									  }
							}
							loading={loading.create}
							loadingPosition="center"
							variant="contained"
						>
							{!loading.create ? <FontAwesomeIcon icon={faPlus} /> : null}
						</PaginationButton>
					</Tooltip>
				)}
			</React.Fragment>
			<Creator
				componentName={creatorName}
				componentPrompt={creatorPrompt}
				open={open}
				openHandler={handleOpen}
				userId={userId}
				saveHandler={saveData}
				loadingHandler={() => setCurrentlyLoading("create")}
			/>
		</PaginationContainer>
	);
}
