import React, { useEffect } from "react";
import { Grid, Typography, Fade } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "@mui/system";
import Logo from "./Logo/Logo";

const BackContainer = styled(Grid)(({ theme }) => ({
	width: "100vw",
	height: "100vh",
	overflow: "hidden",
	backgroundImage: theme.background.image,
}));

export default function LoggedOut(props) {
	const [popOut, setPopOut] = React.useState(true);
	const { mobileMode } = props;
	const { loginWithPopup } = useAuth0();

	useEffect(() => {
		if (mobileMode) {
			setTimeout(() => {
				setPopOut(false);
			}, 3500);
		}
	}, []); // eslint-disable-line

	return (
		<BackContainer container sx={{ ...(!mobileMode && { alignItems: "center" }) }}>
			<Fade in={true} timeout={1000}>
				<Grid container sx={{ height: "fit-content", ...(mobileMode && { position: "fixed", top: "50%", transform: "translateY(-50%)" }) }}>
					<Logo mobileMode={mobileMode} />
					<Grid
						container
						item
						xs={12}
						sx={{
							flexDirection: "column",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							"&>*>*": { fontWeight: "bold", color: "#f1f1f1", textShadow: "0px 0px 10px #000000" },
						}}
					>
						<Grid item>
							<Typography
								onClick={loginWithPopup}
								variant={mobileMode ? "span" : "h5"}
								sx={{
									color: "#a1a1a1",
									cursor: "pointer",
									transition: "color 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
									"&:hover": {
										color: "#ffffff",
									},
								}}
							>
								Zaloguj się, aby kontynuować
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Fade>
			{mobileMode && (
				<Fade in={popOut} timeout={1500} appear={false}>
					<Grid container p={1} sx={{ position: "absolute", bottom: "16px" }}>
						<Grid
							container
							item
							p={1}
							xs={12}
							sx={{
								background: "#96a58d60",
								flexDirection: "column",
								display: "flex",
								borderRadius: "8px",
								border: "1px solid #292929",
								boxShadow: "0px 0px 2px 0px rgb(0 0 0 / 90%)",
								alignItems: "center",
								justifyContent: "center",
								"&>*>*": { fontWeight: "bold", color: "#f1f1f1", textShadow: "0px 0px 10px #000000" },
							}}
						>
							<Grid item>
								<Typography
									variant="span"
									sx={{
										textAlign: "center",
										width: "100%",
										display: "block",
										fontSize: "0.75rem",
										cursor: "pointer",
										transition: "color 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
									}}
								>
									Wersja mobilna Harcmiliady jest obecnie we wczesnej wersji alfa. Posimy o cierpliwość i dziękujemy za wyrozumiałość
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Fade>
			)}
		</BackContainer>
	);
}
