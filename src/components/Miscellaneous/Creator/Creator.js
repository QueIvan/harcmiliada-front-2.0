import React, { useEffect } from "react";
import { Dialog, Grid, Typography, Button, Paper as MuiPaper, TextField, Select, MenuItem, OutlinedInput } from "@mui/material";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderButton from "../Drawer/HeaderButton";
import { useSnackbar } from "notistack";
import { styled } from "@mui/material/styles";

const MenuProps = {
	PaperProps: {
		style: {
			backgroundColor: "#3C5344",
			color: "#f1f1f1",
		},
	},
};

const Paper = styled(MuiPaper)(({ theme }) => ({
	backgroundColor: "#304236",
	borderRadius: "10px",
}));

const PaginationButton = styled(Button)(({ theme }) => ({
	backgroundColor: "#455F4D",
	color: "#f1f1f1",
	padding: `${theme.spacing(0.75)} ${theme.spacing(3)}`,
	border: "1px solid #292929",
	"&:hover": { backgroundColor: "#334739" },
	"&.Mui-disabled": { backgroundColor: "#243128", color: "#666666" },
}));

export default function Creator(props) {
	const { componentName, componentPrompt, open, openHandler, saveHandler, userId } = props;
	const [content, setContent] = React.useState("");
	const [creator, setCreator] = React.useState(userId);
	const [userGroups, setUserGroups] = React.useState([]);
	const { enqueueSnackbar } = useSnackbar();

	const handleDatabaseCall = () => {
		fetch(`${process.env.REACT_APP_API_URL}/groups/${userId}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((resp) => resp.json())
			.then((data) => setUserGroups(data))
			.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));
	};

	const handleClose = () => {
		openHandler();
	};

	const createNew = () => {
		handleClose();
		saveHandler(content, creator);
	};

	const checkForEnter = (e) => {
		if (e.key === "Enter" && content !== "") {
			createNew();
		}
	};

	useEffect(() => {
		handleDatabaseCall();
		return () => {
			setCreator(null);
		};
	}, [userId]); //eslint-disable-line

	return (
		<Dialog PaperComponent={Paper} open={open}>
			<Grid
				container
				sx={{
					width: "550px",
					"&>*": {
						border: "1px solid #292929",
					},
				}}
			>
				<Grid container item xs={12} p={1} sx={{ color: "#e1e1e1", alignItems: "center" }}>
					<Grid item xs="auto" sx={{ marginLeft: "8px" }}>
						<Typography variant="h6" sx={{ fontWeight: "bold", textShadow: "0px 0px 10px #000000" }}>
							Kreator {componentName}
						</Typography>
					</Grid>
					<Grid item xs="auto" sx={{ marginLeft: "auto" }}>
						<HeaderButton
							sx={{ marginLeft: "auto", padding: "5px", minWidth: "45px" }}
							onClick={handleClose}
							tooltip="Zamknij kreator"
							placement="top"
							size="1x"
							icon={faTimes}
						/>
					</Grid>
				</Grid>
				<Grid container item xs={12} px={2} py={2} sx={{ backgroundColor: "#3C5344" }}>
					<TextField
						label={componentPrompt}
						autoFocus
						size="small"
						fullWidth
						sx={{
							color: "#ffffff",
							"&>*>fieldset": {
								borderColor: "#7A7A7A !important",
							},
							"&>*>*:last-child": { border: "2px solid #292929" },
						}}
						inputProps={{ style: { color: "#ffffff" } }}
						InputLabelProps={{ style: { color: "#e1e1e1" } }}
						onChange={(e) => {
							setContent(e.target.value);
						}}
						onKeyDown={checkForEnter}
					/>
				</Grid>
				<Grid container item xs={12} p={1} sx={{ alignItems: "center", color: "#e1e1e1" }}>
					{userGroups?.length > 0 && (
						<Grid item xs="auto">
							<Typography variant="span" sx={{ fontWeight: "bold", textShadow: "0px 0px 10px #000000" }}>
								Twórca:
							</Typography>
							<Select
								displayEmpty
								value={creator}
								onChange={(e) => {
									setCreator(e.target.value);
								}}
								sx={{
									marginLeft: "16px",
									minWidth: "150px",
									"&>*": {
										color: "#e1e1e1 !important",
									},
									"&>fieldset": {
										borderColor: "#7A7A7A !important",
									},
								}}
								inputProps={{ style: { color: "#e1e1e1" } }}
								input={<OutlinedInput size="small" />}
								MenuProps={MenuProps}
							>
								<MenuItem value={userId}>Użytkownik</MenuItem>
								{userGroups.map((group) => (
									<MenuItem key={group.id} value={group.id}>
										{group.name}
									</MenuItem>
								))}
							</Select>
						</Grid>
					)}
					<Grid item xs="auto" sx={{ marginLeft: "auto" }}>
						<PaginationButton onClick={createNew} className={content === "" ? `Mui-disabled` : ``}>
							<FontAwesomeIcon icon={faSave} />
						</PaginationButton>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
}
