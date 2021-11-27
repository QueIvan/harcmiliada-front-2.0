import React, { useState, useRef, useEffect } from "react";
import { useSnackbar } from "notistack";
import {
	Grid,
	Tooltip,
	Grid as MuiGrid,
	IconButton,
	Menu,
	MenuItem as MuiMenuItem,
	ListItemIcon,
	Typography,
	Typography as MuiTypography,
	Skeleton as MuiSkeleton,
	Paper as MuiPaper,
	TextField,
	Dialog,
	DialogTitle as MuiDialogTitle,
	DialogContent as MuiDialogContent,
	DialogActions as MuiDialogActions,
	DialogContentText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faTachometerAlt,
	faClipboardList,
	faGamepad,
	faSignOutAlt,
	faUserShield,
	faUser,
	faPencilAlt,
	faSignInAlt,
	faUsers,
	faPlus,
	faCopy,
	faTimes,
	faTrashAlt,
	faEdit,
	faUserMinus,
	faUserPlus,
	faUserSlash,
	faSave,
	faUsersSlash,
} from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";
import Cookies from "universal-cookie";
import MenuItem from "./MenuItem";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";
import Loading from "./Loading";
import HeaderButton from "./HeaderButton";

const ContentContainer = styled(MuiGrid)(({ theme }) => ({
	padding: theme.spacing(3),
	paddingRight: theme.spacing(2),
	margin: theme.spacing(1),
	marginLeft: theme.spacing(0),
	marginBottom: theme.spacing(0),
	flex: 1,
	maxHeight: "calc(100vh - 63px)",
	overflow: "auto",
	height: "fit-content",
	justifyContent: "center",
	...theme.scroll,
}));

const DrawerContainer = styled(MuiGrid)(({ theme }) => ({
	height: "100vh",
	width: "100vw",
	backgroundColor: "#345B4F",
}));

const NavBar = styled(MuiGrid)(({ theme }) => ({
	height: "55px",
	backgroundColor: "#3C4338",
	boxShadow: "0px 1px 10px #000",
	zIndex: 2,
}));

const SideDrawer = styled(MuiGrid, { shouldForwardProp: (props) => props !== "open" })(({ theme, open }) => ({
	backgroundColor: "#231F1A",
	padding: theme.spacing(1),
	boxShadow: "1px 0px 10px #000",
	height: "calc(100vh - 55px)",
	...(open && { ...theme.drawer.open }),
	...(!open && { ...theme.drawer.closed }),
}));

const MenuContainer = styled(MuiGrid)(({ theme }) => ({
	flexDirection: "column",
	alignItems: "center",
}));

const HamburgerContainer = styled(MuiGrid)(({ theme }) => ({
	width: "70px",
	justifyContent: "center",
	"&>*": { color: "#fff !important" },
}));

const AccountContainer = styled(MuiGrid)(({ theme }) => ({
	marginLeft: "auto",
	width: "43px",
	height: "32px",
}));

const AccountStyling = styled(MuiGrid)(({ theme }) => ({
	height: "100%",
	width: "32px",
	backgroundColor: "#0D4440",
	border: "2px solid #c1c1c1",
	borderRadius: "50%",
	color: "#e1e1e1",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	"&:hover": {
		backgroundColor: "#146761",
		borderColor: "#727272",
	},
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
	...theme.menu,
}));

const OptionHeader = styled(MuiTypography, { shouldForwardProp: (props) => props !== "removeMargin" })(({ theme, removeMargin }) => ({
	fontWeight: "bold",
	color: "#ffffff",
	marginLeft: removeMargin ? 0 : theme.spacing(2),
	textShadow: "0px 0px 10px #000000",
}));

const HeaderContainer = styled(MuiGrid)(({ theme }) => ({
	paddingBottom: theme.spacing(2),
	alignItems: "center",
	borderBottom: "3px solid #7A7A7A",
}));

const NameSkeleton = styled(MuiSkeleton)(({ theme }) => ({
	height: "42px",
	width: "275px",
}));

const Paper = styled(MuiPaper)(({ theme }) => ({
	backgroundColor: "#3C5344",
	border: "1px solid #292929",
	color: "#f1f1f1",
	borderRadius: "10px",
	minWidth: "750px",
}));

const DialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
	borderBottom: "1px solid #292929",
	display: "flex",
	backgroundColor: "#304236",
	padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
}));

const DialogContent = styled(MuiDialogContent)(({ theme }) => ({
	padding: `0px`,
	margin: `${theme.spacing(0)} ${theme.spacing(3)}`,
	...theme.scroll,
}));

const DialogActions = styled(MuiDialogActions)(({ theme }) => ({
	backgroundColor: "#304236",
	borderTop: "1px solid #292929",
}));

export default function Drawer(props) {
	const { enqueueSnackbar } = useSnackbar();
	const cookies = new Cookies();
	const [drawerOpen, setDrawerOpen] = useState(Boolean(cookies.get("drawerOpen")));
	const { loginWithPopup, logout } = useAuth0();
	const [toggleEditor, setToggleEditor] = useState(false);
	const [userGroups, setUserGroups] = useState(null);
	const [menuAnchor, setMenuAnchor] = useState(null);
	const [groupOpen, setGroupOpen] = useState(false);
	const [inputDialog, setInputDialog] = useState(false);
	const inputRef = useRef(null);
	const openMenu = Boolean(menuAnchor);
	const { header, headerOptions, editor, loggedOut, loading, userId } = props;
	const nav = useNavigate();

	const createGroupConfig = {
		title: "Podaj nazwę grupy",
		tooltip: "Stwórz grupę",
		handler: {
			save: (value) => handleGroupCreation(value),
			close: () => setInputDialog(false),
		},
	};

	const addConfig = {
		title: "Podaj id użytkownika",
		tooltip: "Dodaj użytkownika",
		handler: {
			save: (e, group) => handleAddUser(e, group),
			close: () => setInputDialog(false),
		},
	};

	const editConfig = {
		title: "Podaj nową nazwę",
		tooltip: "Zapisz nazwę",
		handler: {
			save: (e, group) => handleGroupNameChange(e, group),
			close: () => setInputDialog(false),
		},
	};

	const delConfig = {
		title: "Podaj id użytkownika",
		tooltip: "Usuń użytkownika",
		handler: {
			save: (e, group) => handleRemoveUser(e, group),
			close: () => setInputDialog(false),
		},
	};

	const adminConifg = {
		title: "Podaj id użytkownika",
		tooltip: "Zmień administratora",
		handler: {
			save: (e, group) => handleAdminChange(e, group),
			close: () => setInputDialog(false),
		},
	};

	const handleDatabaseCall = (url, method, body, reload) => {
		fetch(url, {
			method: method ? method : "GET",
			headers: { "Content-Type": "application/json" },
			...(body && { body: JSON.stringify(body) }),
		})
			.then(() => fetchGroups())
			.then(() => setInputDialog(false))
			.then(() => reload && nav(0))
			.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));
	};

	const handleGroupDelete = (id) => {
		handleDatabaseCall(`${process.env.REACT_APP_API_URL}/groups/${id}/${userId}`, "DELETE", undefined, true);
	};

	const handleGroupCreation = () => {
		let group = { name: inputRef.current.value, creator: userId, users: [userId] };
		handleDatabaseCall(`${process.env.REACT_APP_API_URL}/groups/${userId}`, "POST", group, true);
	};

	const handleGroupNameChange = (e, old) => {
		let group = { ...old, name: inputRef.current.value };
		handleDatabaseCall(`${process.env.REACT_APP_API_URL}/groups/${userId}`, "PUT", group);
	};

	const handleAddUser = (e, old) => {
		let group = { ...old, users: [...old.users, inputRef.current.value] };
		handleDatabaseCall(`${process.env.REACT_APP_API_URL}/groups/${userId}`, "PUT", group);
	};

	const handleRemoveUser = (e, old, removeValue) => {
		let group = { ...old, users: old?.users.filter((user) => user !== (removeValue ? removeValue : inputRef.current.value)) };
		handleDatabaseCall(`${process.env.REACT_APP_API_URL}/groups/${userId}`, "PUT", group, removeValue || inputRef.current.value === userId ? true : false);
	};

	const handleAdminChange = (e, old) => {
		let group = { ...old, creator: inputRef.current.value };
		handleDatabaseCall(`${process.env.REACT_APP_API_URL}/groups/${userId}`, "PUT", group);
	};

	const copyMyId = () => {
		navigator.clipboard.writeText(userId);
		enqueueSnackbar("Skopiowano id do schowka", { variant: "info", autoHideDuration: 1500 });
	};

	const toggleDrawerStatus = () => {
		setDrawerOpen(!drawerOpen);
		cookies.set("drawerOpen", true, { maxAge: !drawerOpen ? 7200 : 0 });
	};

	const toggleAccountMenu = (event) => {
		setMenuAnchor(event.currentTarget);
	};

	const closeAccountMenu = () => {
		setMenuAnchor(null);
	};

	const changeToggleEditor = () => {
		setToggleEditor(!toggleEditor);
	};

	const saveName = (event, change) => {
		editor.handler(event.target.value);
		if (!change) {
			changeToggleEditor();
		}
	};

	const checkForEnter = (e) => {
		if (e.key === "Enter") {
			changeToggleEditor();
		}
	};

	const handleClose = () => {
		setGroupOpen(false);
	};

	const fetchGroups = () => {
		fetch(`${process.env.REACT_APP_API_URL}/groups/${userId}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => setUserGroups(data))
			.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));
	};

	useEffect(() => {
		if (!loggedOut && !loading) {
			fetchGroups();
		}
	}, [loggedOut, loading, userId]); //eslint-disable-line

	return (
		<DrawerContainer container>
			<NavBar container item xs={12} sx={{ alignItems: "center" }}>
				<HamburgerContainer container item xs="auto">
					<IconButton onClick={toggleDrawerStatus} disabled={loggedOut}>
						<FontAwesomeIcon size="xs" icon={faBars} />
					</IconButton>
				</HamburgerContainer>
				<AccountContainer container item xs="auto" onClick={loggedOut ? loginWithPopup : toggleAccountMenu}>
					<Tooltip disableInteractive={true} title={loggedOut ? "Zaloguj się" : "Opcje użytkownika"} arrow placement="bottom">
						<AccountStyling container item xs="auto">
							<FontAwesomeIcon size="sm" icon={loggedOut ? faSignInAlt : faUser} />
						</AccountStyling>
					</Tooltip>
				</AccountContainer>
			</NavBar>
			<Grid container item xs={12}>
				<SideDrawer open={loggedOut ? false : drawerOpen} container item>
					<MenuContainer container item>
						<MenuItem loggedOut={loggedOut} icon={faTachometerAlt} label="Pulpit" open={drawerOpen} href="/dashboard" />
						<MenuItem loggedOut={loggedOut} icon={faGamepad} label="Gry" open={drawerOpen} href="/dashboard/games" />
						<MenuItem loggedOut={loggedOut} icon={faClipboardList} label="Pytania" correction="3px" open={drawerOpen} href="/dashboard/questions" />
					</MenuContainer>
				</SideDrawer>
				<ContentContainer container item sx={{ height: loading ? "100%" : "fit-content" }}>
					{!loggedOut && (
						<React.Fragment>
							<HeaderContainer container item xs={12}>
								<OptionHeader removeMargin={editor} variant={editor ? "h5" : "h4"}>
									{header}
								</OptionHeader>
								{headerOptions && (
									<Grid item sx={{ marginLeft: "auto", display: "flex", gap: "15px" }}>
										{headerOptions}
									</Grid>
								)}
								{editor && (
									<Grid container item xs={12} sx={{ alignItems: "center", marginTop: "16px" }}>
										{typeof editor.name !== undefined ? (
											!toggleEditor ? (
												<Grid
													container
													item
													xs="auto"
													sx={{ alignItems: "center", height: "42px", cursor: "pointer" }}
													onClick={changeToggleEditor}
												>
													<OptionHeader variant="h4" sx={{ lineHeight: 0 }}>
														{editor.name}
													</OptionHeader>
													<Grid item pl={2} pr={1}>
														<FontAwesomeIcon
															style={{ color: "#e1e1e1", filter: "drop-shadow(0px 0px 10px #000000)" }}
															icon={faPencilAlt}
														/>
													</Grid>
												</Grid>
											) : (
												<TextField
													hiddenLabel
													autoFocus
													variant="standard"
													sx={{
														marginLeft: "8px",
														boxSizing: "border-box",
														"&>.Mui-focused:after": {
															borderColor: "#7A7A7A",
														},
														"&>*>*:last-child": { border: "none", height: "42px", top: 0 },
													}}
													defaultValue={editor.name}
													inputProps={{
														style: {
															margin: 0,
															fontFamily: "`Roboto`,`Helvetica`,`Arial`,sans-serif",
															fontSize: "2.125rem",
															lineHeight: 1.235,
															marginLeft: "8px",
															letterSpacing: "0.00735em",
															fontWeight: 700,
															height: "42px",
															width: "50vw",
															padding: 0,
															color: "#ffffff",
															textShadow: "0px 0px 10px #000000",
														},
													}}
													onKeyDown={checkForEnter}
													onChange={(e) => saveName(e, true)}
													onBlur={saveName}
												/>
											)
										) : (
											<NameSkeleton variant="rectangular" animation="wave" />
										)}
									</Grid>
								)}
							</HeaderContainer>
							{props.children}
						</React.Fragment>
					)}
					{loading && <Loading />}
				</ContentContainer>
			</Grid>
			<StyledMenu
				open={openMenu}
				anchorEl={menuAnchor}
				onClose={closeAccountMenu}
				onClick={closeAccountMenu}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<MuiMenuItem onClick={() => setGroupOpen(true)}>
					<ListItemIcon>
						<FontAwesomeIcon size="xs" icon={faUsers} />
					</ListItemIcon>
					<Typography variant="inherit">Grupy</Typography>
				</MuiMenuItem>
				<MuiMenuItem onClick={() => logout({ returnTo: `${window.location.origin}/dashboard` })}>
					<ListItemIcon>
						<FontAwesomeIcon size="xs" icon={faSignOutAlt} />
					</ListItemIcon>
					<Typography variant="inherit">Wyloguj</Typography>
				</MuiMenuItem>
			</StyledMenu>
			<Dialog open={groupOpen} PaperComponent={Paper} scroll="paper">
				<DialogTitle sx={{ display: "flex", alignItems: "center" }}>
					Grupy
					<HeaderButton
						sx={{ marginLeft: "auto", marginRight: "5px", padding: "5px", minWidth: "45px" }}
						onClick={copyMyId}
						tooltip="Skopiuj do schowka swoje ID"
						placement="top"
						size="xs"
						icon={faCopy}
					/>
					<HeaderButton
						sx={{ padding: "5px", minWidth: "45px" }}
						tooltip="Zamknij okno"
						placement="top"
						onClick={handleClose}
						size="xs"
						icon={faTimes}
					/>
				</DialogTitle>
				<DialogContent
					tabIndex={-1}
					sx={{
						...(userGroups?.length === 0 && {
							display: "flex",
							alignItems: "center",
						}),
						minHeight: "192px",
					}}
				>
					{userGroups && userGroups?.length > 0 ? (
						userGroups.map((group, index) => (
							<Grid container sx={{ borderBottom: "1px solid #292929", padding: "16px" }}>
								<Grid item xs="auto" sx={{ display: "flex", alignItems: "center" }}>
									<Typography key={group.id} variant="h6" sx={{ color: "#ffffff", fontWeight: "bold", textShadow: "0px 0px 10px #000000" }}>
										{group.name}
									</Typography>
								</Grid>
								<Grid
									item
									xs="auto"
									sx={{
										display: "flex",
										marginLeft: "auto",
										gap: "8px",
									}}
								>
									<HeaderButton
										sx={{ padding: "8px", minWidth: "45px" }}
										tooltip="Dodaj użytkownika"
										onClick={() => setInputDialog({ ...addConfig, currentGroup: group })}
										placement="top"
										size="sm"
										icon={faUserPlus}
									/>
									{group.creator === userId && (
										<React.Fragment>
											<HeaderButton
												sx={{ padding: "8px", minWidth: "45px" }}
												tooltip="Usuń użytkownika"
												onClick={() => setInputDialog({ ...delConfig, currentGroup: group })}
												placement="top"
												size="sm"
												icon={faUserMinus}
											/>
											<HeaderButton
												sx={{ padding: "8px", minWidth: "45px" }}
												tooltip="Edytuj nazwę"
												onClick={() => setInputDialog({ ...editConfig, defaultValue: group.name, currentGroup: group })}
												placement="top"
												size="sm"
												icon={faEdit}
											/>
										</React.Fragment>
									)}
									<HeaderButton
										sx={{ padding: "8px", minWidth: "45px" }}
										tooltip={group.creator === userId ? "Usuń grupę" : "Opuść grupę"}
										placement="top"
										onClick={group.creator === userId ? () => handleGroupDelete(group.id) : (e) => handleRemoveUser(e, group, userId)}
										size="sm"
										icon={group.creator === userId ? faTrashAlt : faUserSlash}
									/>
									{group.creator === userId && (
										<HeaderButton
											sx={{ padding: "8px", minWidth: "45px" }}
											tooltip="Zmień właściciela"
											onClick={() => setInputDialog({ ...adminConifg, currentGroup: group })}
											placement="top"
											size="sm"
											icon={faUserShield}
										/>
									)}
								</Grid>
							</Grid>
						))
					) : (
						<Grid
							container
							item
							xs={12}
							sx={{
								flexDirection: "column",
								color: "#e1e1e1",
								"&>*": { display: "flex", justifyContent: "center" },
							}}
						>
							<Grid item xs="auto">
								<FontAwesomeIcon size="2x" style={{ filter: "drop-shadow(0px 0px 10px #000000)", marginBottom: "15px" }} icon={faUsersSlash} />
							</Grid>
							<Grid item xs="auto">
								<Typography sx={{ fontWeight: "bold", textShadow: "0px 0px 10px #000000" }}>Nie należysz jeszcze do żadnej grupy...</Typography>
							</Grid>
						</Grid>
					)}
				</DialogContent>
				<DialogActions>
					<HeaderButton onClick={() => setInputDialog(createGroupConfig)} tooltip="Stwórz nową grupę" placement="bottom" size="1x" icon={faPlus} />
				</DialogActions>
			</Dialog>
			<Dialog open={inputDialog} PaperComponent={Paper} scroll="paper" PaperProps={{ style: { minWidth: "450px" } }}>
				<DialogTitle>
					{inputDialog?.title}
					<HeaderButton
						sx={{ marginLeft: "auto", padding: "8px", minWidth: "45px" }}
						onClick={inputDialog?.handler?.close}
						tooltip="Zamknij okno"
						placement="bottom"
						size="1x"
						icon={faTimes}
					/>
				</DialogTitle>
				<DialogContent sx={{ padding: "16px 0 !important", margin: "0 16px" }}>
					<DialogContentText>
						<TextField
							autoFocus
							sx={{
								color: "#ffffff",
								"&>*>fieldset": {
									borderColor: "#7A7A7A !important",
								},
							}}
							inputProps={{ style: { color: "#ffffff" } }}
							InputLabelProps={{ style: { color: "#e1e1e1" } }}
							size="small"
							hiddenLabel
							variant="outlined"
							defaultValue={inputDialog?.defaultValue}
							fullWidth
							inputRef={inputRef}
						/>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<HeaderButton
						onClick={(e) => inputDialog?.handler?.save(e, inputDialog?.currentGroup)}
						tooltip={inputDialog?.tooltip}
						placement="bottom"
						size="1x"
						icon={faSave}
					/>
				</DialogActions>
			</Dialog>
		</DrawerContainer>
	);
}
