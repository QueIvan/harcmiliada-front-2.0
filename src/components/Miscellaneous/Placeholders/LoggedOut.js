import React from "react";
import { Grid, Typography, Box, Fade } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "@mui/system";

const BackContainer = styled(Grid)(({ theme }) => ({
	width: "100vw",
	height: "100vh",
	backgroundImage: theme.background.image,
}));

export default function LoggedOut() {
	const { loginWithPopup } = useAuth0();

	return (
		<BackContainer container>
			<Fade in={true} timeout={1000}>
				<Grid container>
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
							<Box sx={{ position: "relative", minHeight: "80px", minWidth: "100px", "&>*": { position: "absolute" } }}>
								<FontAwesomeIcon size="5x" icon={faTree} style={{ color: "#96A58D", filter: "drop-shadow(0px 0px 10px #000000)" }} />
								<FontAwesomeIcon size="5x" icon={faTree} style={{ right: 0, color: "#96A58D", filter: "drop-shadow(0px 0px 10px #000000)" }} />
								<FontAwesomeIcon
									size="5x"
									icon={faTree}
									style={{
										left: "50%",
										transform: "translateX(-50%)",
										top: "8px",
										color: "#96A58D",
										filter: "drop-shadow(0px 0px 10px #000000)",
									}}
								/>
							</Box>
						</Grid>
						<Grid item sx={{ marginBottom: "15px" }}>
							<Typography variant="h1">Harcmiliada</Typography>
						</Grid>
						<Grid item>
							<Typography
								onClick={loginWithPopup}
								variant="h5"
								sx={{
									color: "#cdcdcd",
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
