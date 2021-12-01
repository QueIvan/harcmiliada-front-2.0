import React from "react";
import { Grid, Typography, Fade } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/system";
import LogoImage from "../Placeholders/LogoImage";
import { faFireAlt } from "@fortawesome/free-solid-svg-icons";

const BackContainer = styled(Grid)(({ theme }) => ({
	width: "100vw",
	height: "100vh",
	alignItems: "center",
	backgroundImage: theme.background.image,
}));

export default function NotFound() {
	return (
		<BackContainer container>
			<Fade in={true} timeout={850}>
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
					<Grid item sx={{ flexDirection: "column", alignItems: "center", marginBottom: "15px" }}>
						<LogoImage
							logoProps={{ opacity: 0.95, color: "#31392D" }}
							addObject={
								<FontAwesomeIcon
									icon={faFireAlt}
									size="7x"
									style={{
										position: "absolute",
										bottom: 0,
										left: "50%",
										transform: "translateX(-50%)",
										color: "#b76935",
										filter: "drop-shadow(0px 0px 10px #bb3e03)",
									}}
								/>
							}
							objectPlacement="before"
						/>
					</Grid>
					<Grid item>
						<Typography variant="h4">Coś poszło nie tak</Typography>
					</Grid>
					<Grid item>
						<Typography variant="h6">Pod tym adresem nie znajduje się żadna strona</Typography>
					</Grid>
				</Grid>
			</Fade>
		</BackContainer>
	);
}
