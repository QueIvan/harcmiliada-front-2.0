import React, { useEffect } from "react";
import { Grid, Typography, Fade } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/system";
import LogoImage from "../Placeholders/Logo/LogoImage";
import { faFireAlt } from "@fortawesome/free-solid-svg-icons";

const BackContainer = styled(Grid)(({ theme }) => ({
	width: "100vw",
	height: "100vh",
	alignItems: "center",
	backgroundImage: theme.background.image,
}));

const FireIcon = styled(FontAwesomeIcon)(({ theme }) => ({
	fontSize: "10rem",
	position: "absolute",
	bottom: 0,
	left: "50%",
	transform: "translateX(-50%)",
	color: "#b76935",
	filter: "drop-shadow(0px 0px 10px #bb3e03)",
}));

export default function NotFound() {
	useEffect(() => {
		document.title = "Harcmiliada | Błąd 404";
	}, []);

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
							boxProps={{ minWidth: "148px", minHeight: "120px" }}
							logoProps={{ fontSize: "7.5rem", color: "#31392D" }}
							addObject={<FireIcon icon={faFireAlt} />}
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
