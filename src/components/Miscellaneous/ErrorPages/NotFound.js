import React, { useEffect } from "react";
import { Grid, Typography, Fade } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/system";
import LogoImage from "../Placeholders/Logo/LogoImage";
import { faFireAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

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

const InfoContainer = styled(Grid)(({ theme }) => ({
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	"&>*>*": { fontWeight: "bold", color: "#f1f1f1", textShadow: "0px 0px 10px #000000" },
}));

const ClickableTypography = styled(Typography)(({ theme }) => ({
	cursor: "pointer",
	transition: "color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	color: "#d1d1d1",
	"&:hover": { color: "#e1e1e1" },
}));

const ImageBackground = styled(Grid)(({ theme }) => ({
	marginBottom: "15px",
}));

export default function NotFound() {
	const nav = useNavigate();
	const boxProps = { minWidth: "148px", minHeight: "120px" };
	const logoProps = { fontSize: "7.5rem", color: "#31392D" };

	useEffect(() => {
		document.title = "Harcmiliada | Ups...";
	}, []);

	return (
		<BackContainer container>
			<Fade in={true} timeout={850}>
				<InfoContainer container item xs={12}>
					<ImageBackground item>
						<LogoImage boxProps={boxProps} logoProps={logoProps} addObject={<FireIcon icon={faFireAlt} />} objectPlacement="before" />
					</ImageBackground>
					<Grid item>
						<Typography variant="h4">Coś poszło nie tak</Typography>
					</Grid>
					<Grid item>
						<ClickableTypography onClick={() => nav("/")} variant="h6">
							Kliknij tutaj, aby wrócić na stronę startową
						</ClickableTypography>
					</Grid>
				</InfoContainer>
			</Fade>
		</BackContainer>
	);
}
