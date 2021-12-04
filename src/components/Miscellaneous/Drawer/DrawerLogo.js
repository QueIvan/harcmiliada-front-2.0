import React from "react";
import { Grid, Typography } from "@mui/material";
import LogoImage from "../Placeholders/Logo/LogoImage";
import { styled } from "@mui/material/styles";

const LogoBackboard = styled(Grid)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	cursor: "pointer",
	"&>*, &>*>*": {
		transition: "color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	},
	"&:hover>*:first-of-type>*": { color: "#96A58D !important" },
	"&:hover>*:last-of-type": { color: "#ffffff" },
}));

const LogoText = styled(Typography)(({ theme }) => ({
	fontWeight: "bold",
	marginLeft: "0.75rem",
	height: "fit-content",
	color: "#e9e9e9",
	userSelect: "none",
}));

export default function DrawerLogo(props) {
	const { onClick } = props;

	return (
		<LogoBackboard container item onClick={onClick} xs="auto">
			<LogoImage boxProps={{ minHeight: "40px", minWidth: "50px" }} logoProps={{ fontSize: "2rem", color: "#707a69" }} />
			<LogoText variant="h6">Harcmiliada</LogoText>
		</LogoBackboard>
	);
}
