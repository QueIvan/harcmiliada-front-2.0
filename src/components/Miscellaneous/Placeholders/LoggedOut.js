import React from "react";
import { Grid, Typography, Fade } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "@mui/system";
import Logo from "./Logo";

const BackContainer = styled(Grid)(({ theme }) => ({
	width: "100vw",
	height: "100vh",
	alignItems: "center",
	backgroundImage: theme.background.image,
}));

export default function LoggedOut() {
	const { loginWithPopup } = useAuth0();

	return (
		<BackContainer container>
			<Fade in={true} timeout={1000}>
				<Grid container sx={{ height: "fit-content" }}>
					<Logo />
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
								variant="h5"
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
		</BackContainer>
	);
}
