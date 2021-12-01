import { CssBaseline, Slide } from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import LoggedOut from "./components/Miscellaneous/Placeholders/LoggedOut";
import React, { useEffect } from "react";
import Loading from "./components/Miscellaneous/Placeholders/Loading";
import Board from "./components/Board/Board";
import NotFound from "./components/Miscellaneous/ErrorPages/NotFound";

const SnackBarIcon = styled(FontAwesomeIcon)(({ theme }) => ({ marginRight: "16px" }));

function App() {
	const theme = useTheme();
	const myTheme = createTheme(theme, {
		palette: {
			primary: { main: "#3f51b5" },
		},
		background: {
			image: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1920' height='1080' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1022%26quot%3b)' fill='none'%3e%3crect width='1920' height='1080' x='0' y='0' fill='url(%23SvgjsLinearGradient1023)'%3e%3c/rect%3e%3cpath d='M1920 0L1506.85 0L1920 377.43z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M1506.85 0L1920 377.43L1920 562.02L1044.37 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M1044.37 0L1920 562.02L1920 672.0699999999999L929.5199999999999 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M929.52 0L1920 672.0699999999999L1920 695.8299999999999L755.12 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 1080L580.05 1080L0 641.78z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 641.78L580.05 1080L1316.82 1080L0 579.01z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 579.01L1316.82 1080L1343.03 1080L0 444.65z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 444.65L1343.03 1080L1445.56 1080L0 150.34999999999997z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1022'%3e%3crect width='1920' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='10.94%25' y1='-19.44%25' x2='89.06%25' y2='119.44%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1023'%3e%3cstop stop-color='rgba(60%2c 83%2c 68%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(60%2c 83%2c 68%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e\")",
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

	useEffect(() => {
		console.log(isAuthenticated, isLoading);
	}, []);

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
						{isAuthenticated && (
							<React.Fragment>
								<Route exact path="/" element={<Dashboard userId={user?.sub} title="Pulpit" />} />
								<Route exact path="/questions" element={<Questions userId={user?.sub} title="Pytania" />} />
								<Route path="/questions/:id" element={<QuestionEditor userId={user?.sub} title="Edytor pytań" />} />
								<Route exact path="/games" element={<Games userId={user?.sub} title="Gry" />} />
								<Route path="/games/:id" element={<GameEditor userId={user?.sub} title="Edytor gier" />} />
								<Route exact path="/games/:id/console" element={<Console userId={user?.sub} title="Konsola gry" />} />
								<Route path="/board/:id" element={<Board userId={user?.sub} title="Tablica" />} />
							</React.Fragment>
						)}
						{!isAuthenticated && !isLoading && <Route exact path="/" element={<LoggedOut />} />}
						{isLoading ? <Route path="*" element={<Loading />} /> : <Route path="*" element={<NotFound />} />}
					</Routes>
				</Router>
			</SnackbarProvider>
		</ThemeProvider>
	);
}

export default App;
