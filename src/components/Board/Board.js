import React from "react";
import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import Logo from "../Miscellaneous/Placeholders/Logo";

const BackContainer = styled(Grid)(({ theme }) => ({
	width: "100vw",
	height: "100vh",
	backgroundImage: theme.background.image,
}));

export default function Board() {
	return (
		<BackContainer container>
			<Logo />
		</BackContainer>
	);
}
