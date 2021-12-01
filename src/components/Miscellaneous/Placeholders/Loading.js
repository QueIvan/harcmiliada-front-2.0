import React from "react";
import { Grid, Typography, Fade } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/system";
import LogoImage from "./Logo/LogoImage";

const BackContainer = styled(Grid)(({ theme }) => ({
	width: "100vw",
	height: "100vh",
	backgroundImage: theme.background.image,
}));

export default function Loading() {
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
							"&>*": { color: "#f1f1f1" },
						}}
					>
						<Grid item sx={{ marginBottom: "15px", display: "flex", flexDirection: "column", alignItems: "center" }}>
							<Grid item sx={{ marginBottom: "23px" }}>
								<LogoImage logoProps={{ fontSize: "5rem", color: "#96A58D" }} />
							</Grid>
							<FontAwesomeIcon size="5x" icon={faCircleNotch} spin style={{ filter: "drop-shadow(0px 0px 10px #000000)" }} />
						</Grid>
						<Grid item>
							<Typography sx={{ fontSize: "1.45rem", fontWeight: "bold", textShadow: "0px 0px 10px #000000" }}>Poczekaj chwilę</Typography>
						</Grid>
						<Grid item>
							<Typography sx={{ fontSize: "1.45rem", fontWeight: "bold", textShadow: "0px 0px 10px #000000" }}>Sprawdzamy twój status</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Fade>
		</BackContainer>
	);
}
