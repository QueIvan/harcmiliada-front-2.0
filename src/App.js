import { CssBaseline, Slide } from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Dashboard from "./components/Dashboard/Dashboard";
import Games from "./components/Game/Games";
import GameEditor from "./components/Game/GameEditor";
import Questions from "./components/Question/Questions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamation, faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/system";
import QuestionEditor from "./components/Question/QuestionEditor";
import Console from "./components/Console/Console";
import { useAuth0 } from "@auth0/auth0-react";

const SnackBarIcon = styled(FontAwesomeIcon)(({ theme }) => ({ marginRight: "16px" }));

function App() {
	const theme = useTheme();
	const myTheme = createTheme(theme, {
		palette: {
			primary: { main: "#3f51b5" },
		},
		scroll: {
			"&::-webkit-scrollbar": {
				width: "12px",
			},

			"&::-webkit-scrollbar-track": {
				background: "transparent",
			},

			"&::-webkit-scrollbar-thumb": {
				background: "#304236",
				borderRadius: "8px",
				border: "1px solid",
				borderColor: "#292929",
			},

			"&::-webkit-scrollbar-thumb:hover": {
				background: "#3a5041",
			},
		},
		menu: {
			"&>.MuiPaper-root>ul>.MuiMenuItem-root:not(:last-of-type)": { borderBottom: "1px solid #292929" },
			"&>.MuiPaper-root>ul>.MuiMenuItem-root>.MuiListItemIcon-root": { color: "#E0E0E0" },
			"&>.MuiPaper-root>ul>.MuiMenuItem-root:hover": { backgroundColor: "#334739" },
			"&>.MuiPaper-root>ul": { padding: 0 },
			"&>.MuiPaper-root": { backgroundColor: "#2B3B30", color: "#E0E0E0", border: "1px solid #3C5344", borderRadius: "8px" },
		},
		drawer: {
			open: {
				width: "250px",
				transition: theme.transitions.create("width", {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen,
				}),
				overflowX: "hidden",
			},
			closed: {
				transition: theme.transitions.create("width", {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
				overflowX: "hidden",
				width: "70px",
				[theme.breakpoints.up("sm")]: {
					width: "70px",
				},
			},
		},
	});
	const { user, isAuthenticated, isLoading } = useAuth0();

	return (
		<ThemeProvider theme={myTheme}>
			<SnackbarProvider
				sx={{
					"&>.SnackbarContent-root": {
						paddingLeft: "16px",
					},
					"&>.SnackbarItem-variantSuccess": {
						backgroundColor: "#227F10",
					},
					"&>.SnackbarItem-variantError": {
						backgroundColor: "#E00000",
					},
					"&>.SnackbarItem-variantWarning": {
						backgroundColor: "#F9C80E",
					},
					"&>.SnackbarItem-variantInfo": {
						backgroundColor: "#5DA9E9",
					},
				}}
				maxSnack={6}
				preventDuplicate
				iconVariant={{
					success: <SnackBarIcon icon={faCheckCircle} />,
					error: <SnackBarIcon icon={faTimes} />,
					warning: <SnackBarIcon icon={faExclamationTriangle} />,
					info: <SnackBarIcon icon={faExclamation} />,
				}}
				TransitionComponent={Slide}
			>
				<CssBaseline />
				<Router>
					<Routes>
						<Route exact path="/" element={<Dashboard loggedOut={!isAuthenticated} loading={isLoading} userId={user?.sub} title="Pulpit" />} />
						<Route
							exact
							path="/questions"
							element={<Questions loggedOut={!isAuthenticated} loading={isLoading} userId={user?.sub} title="Pytania" />}
						/>
						<Route
							path="/questions/:id"
							element={<QuestionEditor loggedOut={!isAuthenticated} loading={isLoading} userId={user?.sub} title="Edytor pytań" />}
						/>
						<Route exact path="/games" element={<Games loggedOut={!isAuthenticated} loading={isLoading} userId={user?.sub} title="Gry" />} />
						<Route
							path="/games/:id"
							element={<GameEditor loggedOut={!isAuthenticated} loading={isLoading} userId={user?.sub} title="Edytor gier" />}
						/>
						<Route
							exact
							path="/games/:id/console"
							element={<Console loggedOut={!isAuthenticated} loading={isLoading} userId={user?.sub} title="Konsola gry" />}
						/>
					</Routes>
				</Router>
			</SnackbarProvider>
		</ThemeProvider>
	);
}

export default App;
