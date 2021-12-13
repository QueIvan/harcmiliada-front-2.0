import React, { useEffect, useState } from "react";
import {
	Dialog,
	Grid,
	Typography,
	Button,
	Paper as MuiPaper,
	OutlinedInput,
	Menu,
	MenuItem,
	IconButton,
	FormControl,
	InputLabel,
	InputAdornment,
} from "@mui/material";
import { faAngleDown, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar } from "notistack";
import { styled } from "@mui/material/styles";
import { LoadingButton as MuiLoadingButton } from "@mui/lab";

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

const StyledButton = styled(MuiLoadingButton)(({ theme }) => ({
	height: "fit-content",
	backgroundColor: "#455F4D",
	color: "#f1f1f1",
	padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
	border: "1px solid #292929",
	"&>.MuiLoadingButton-loadingIndicator": { color: "#666666" },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
	"&>.MuiPaper-root>ul>.MuiMenuItem-root:not(:last-of-type)": { borderBottom: "1px solid #292929" },
	"&>.MuiPaper-root>ul>.MuiMenuItem-root>.MuiListItemIcon-root": { color: "#E0E0E0" },
	"&>.MuiPaper-root>ul>.MuiMenuItem-root:hover": { backgroundColor: "#334739" },
	"&>.MuiPaper-root>ul": { padding: 0 },
	"&>.MuiPaper-root": { backgroundColor: "#2B3B30", color: "#E0E0E0", border: "1px solid #3C5344", borderRadius: "8px" },
}));

export default function Creator(props) {
	const { componentName, componentPrompt, open, openHandler, saveHandler, userId } = props;
	const [content, setContent] = useState("");
	const [creator, setCreator] = useState(null);
	const [userGroups, setUserGroups] = useState([]);
	const [menuAnchor, setMenuAnchor] = useState(null);
	const openMenu = Boolean(menuAnchor);
	const { enqueueSnackbar } = useSnackbar();

	const handleDatabaseCall = () => {
		fetch(`${process.env.REACT_APP_API_URL}/groups/${userId}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((resp) => resp.json())
			.then((data) => setUserGroups(data))
			.catch((err) => {
				enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 });
				console.error(err);
			});
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

	const closeAccountMenu = () => {
		setMenuAnchor(null);
	};

	useEffect(() => {
		handleDatabaseCall();
		if (userId) setCreator({ label: "Użytkownik", id: userId });
		return () => setCreator(null);
	}, [userId]); //eslint-disable-line

	return (
		<Dialog PaperComponent={Paper} open={open}>
			<Grid
				container
				sx={{
					"&>*": {
						border: "1px solid #292929",
					},
				}}
			>
				<Grid container item xs={12} p={1} sx={{ color: "#e1e1e1", alignItems: "center" }}>
					<Grid item xs="auto" sx={{ marginLeft: "8px" }}>
						<Typography variant="span" sx={{ fontWeight: "bold", textShadow: "0px 0px 10px #000000" }}>
							Kreator {componentName}
						</Typography>
					</Grid>
					<Grid item xs="auto" sx={{ marginLeft: "auto" }}>
						<StyledButton
							sx={{ marginLeft: "auto", padding: "5px", minWidth: "45px" }}
							onClick={handleClose}
							size="sm"
							loadingPosition="center"
							variant="contained"
						>
							<FontAwesomeIcon size="1x" icon={faTimes} />
						</StyledButton>
					</Grid>
				</Grid>
				<Grid container item xs={12} px={2} py={2} sx={{ backgroundColor: "#3C5344" }}>
					<FormControl size="small" sx={{ width: "100%" }}>
						<InputLabel sx={{ color: "#e1e1e1 !important" }} htmlFor="outlined-adornment-password">
							{componentPrompt}
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							autoFocus
							size="small"
							fullWidth
							autoComplete="off"
							sx={{
								color: "#ffffff",
								"&>*": { color: "#e1e1e1 !important" },
								"&>*>button": { color: "#c1c1c1 !important" },
								"&>fieldset": { borderColor: "#7A7A7A !important" },
							}}
							inputProps={{ style: { color: "#ffffff" } }}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										size="small"
										onClick={(e) => {
											e.preventDefault();
											setMenuAnchor(e.target);
										}}
										edge="end"
									>
										<FontAwesomeIcon size="1x" icon={faAngleDown} />
									</IconButton>
								</InputAdornment>
							}
							onChange={(e) => setContent(e.target.value)}
							onKeyDown={checkForEnter}
							label={componentPrompt}
						/>
					</FormControl>
					<StyledMenu
						open={openMenu}
						anchorEl={menuAnchor}
						onClose={closeAccountMenu}
						onClick={closeAccountMenu}
						transformOrigin={{ horizontal: "right", vertical: "top" }}
						anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
						PaperProps={{ style: { maxHeight: 48 * 4, width: "20ch" } }}
					>
						<MenuItem onClick={() => setCreator({ label: "Użytkownik", id: userId })} sx={{ whiteSpace: "nowrap", overflow: "auto" }}>
							Użytkownik
						</MenuItem>
						{userGroups.map((group) => (
							<MenuItem
								key={group.id}
								onClick={() => setCreator({ label: group.name, id: group.id })}
								sx={{ whiteSpace: "nowrap", overflow: "auto" }}
							>
								{group.name}
							</MenuItem>
						))}
					</StyledMenu>
				</Grid>
				<Grid container item xs={12} p={1} sx={{ alignItems: "center", color: "#e1e1e1" }}>
					<Grid item xs="auto" sx={{ marginLeft: "8px", "&>*": { fontSize: "0.85rem", fontWeight: "bold", textShadow: "0px 0px 10px #000000" } }}>
						<Typography variant="span">Twórca:</Typography>
					</Grid>
					<Grid
						item
						xs="auto"
						sx={{
							flex: "1",
							whiteSpace: "nowrap",
							overflow: "auto",
							margin: "0 8px",
							"&>*": { fontSize: "0.85rem", fontWeight: "bold", textShadow: "0px 0px 10px #000000" },
						}}
					>
						<Typography variant="span">{creator?.id === userId ? "Użytkownik" : creator ? creator?.label : "Nieznany"}</Typography>
					</Grid>
					<Grid item xs="auto">
						<PaginationButton onClick={createNew} className={content === "" ? `Mui-disabled` : ``}>
							<FontAwesomeIcon icon={faSave} />
						</PaginationButton>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
}
