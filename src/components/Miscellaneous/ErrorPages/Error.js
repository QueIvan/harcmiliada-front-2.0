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

const FireIcon = styled(FontAwesomeIcon, { shouldForwardProp: (props) => props !== "mode" })(({ theme, mode }) => ({
	fontSize: mode ? "7.5rem" : "10rem",
	position: "absolute",
	bottom: 0,
	left: "50%",
	transform: "translateX(-50%)",
	color: "#b76935",
	filter: `drop-shadow(0px 0px ${mode ? "10px" : "10px"} #bb3e03) !important`,
}));

const InfoContainer = styled(Grid, { shouldForwardProp: (props) => props !== "mode" })(({ theme, mode }) => ({
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	...(mode && { position: "fixed", top: "50%", transform: "translateY(-50%)" }),
	"&>*>*": { fontWeight: "bold", color: "#f1f1f1", textShadow: "0px 0px 10px #000000" },
}));

const ClickableTypography = styled(Typography, { shouldForwardProp: (props) => props !== "mode" })(({ theme, mode }) => ({
	cursor: "pointer",
	transition: "color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	color: `#${mode ? "a1a1a1" : "d1d1d1"} !important`,
	"&:hover": { color: "#e1e1e1" },
}));

const ImageBackground = styled(Grid)(({ theme }) => ({
	marginBottom: "15px",
}));

export default function Error(props) {
	const { mobileMode } = props;
	const nav = useNavigate();
	const boxProps = { minWidth: mobileMode ? "110px" : "148px", minHeight: mobileMode ? "90px" : "120px" };
	const logoProps = { fontSize: mobileMode ? "5.5rem" : "7.5rem", color: "#31392D" };

	useEffect(() => {
		document.title = "Harcmiliada | Ups...";
	}, []);

	return (
		<BackContainer container sx={{ ...(!mobileMode && { alignItems: "center" }) }}>
			<Fade in={true} timeout={850}>
				<InfoContainer container item xs={12} mode={mobileMode}>
					<ImageBackground item>
						<LogoImage
							boxProps={boxProps}
							logoProps={logoProps}
							addObject={<FireIcon mode={mobileMode} icon={faFireAlt} />}
							objectPlacement="before"
						/>
					</ImageBackground>
					<Grid item>
						<Typography variant={mobileMode ? "h5" : "h4"}>Coś poszło nie tak</Typography>
					</Grid>
					<Grid item>
						<ClickableTypography mode={mobileMode} onClick={() => nav("/")} variant={mobileMode ? "span" : "h6"}>
							Kliknij tutaj, aby wrócić na stronę startową
						</ClickableTypography>
					</Grid>
				</InfoContainer>
			</Fade>
		</BackContainer>
	);
}
