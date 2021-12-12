import React from "react";
import { Grid, Typography } from "@mui/material";
import LogoImage from "./LogoImage";

export default function Logo() {
	return (
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
				<LogoImage logoProps={{ fontSize: "5rem", color: "#96A58D" }} />
			</Grid>
			<Grid item sx={{ marginBottom: "15px" }}>
				<Typography variant="h1">Harcmiliada</Typography>
			</Grid>
		</Grid>
	);
}
