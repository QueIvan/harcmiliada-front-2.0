import React from "react";
import { Grid, Typography } from "@mui/material";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EmptyPlaceholder(props) {
	const { small, header } = props;

	return (
		<Grid
			container
			item
			xs={12}
			sx={{
				flexDirection: "column",
				color: "#e1e1e1",
				"&>*": { display: "flex", justifyContent: "center" },
			}}
		>
			<Grid item xs="auto">
				<FontAwesomeIcon size={small ? "4x" : header ? "3x" : "5x"} style={{ filter: "drop-shadow(0px 0px 10px #000000)" }} icon={faFolderOpen} />
			</Grid>
			<Grid item xs="auto">
				<Typography sx={{ fontWeight: "bold", textShadow: "0px 0px 10px #000000" }} variant={small ? "h5" : header ? "h6" : "h4"}>
					Jak tu pusto...
				</Typography>
			</Grid>
			<Grid item xs="auto">
				<Typography sx={{ fontWeight: "bold", textShadow: "0px 0px 10px #000000" }} variant={small ? "h5" : header ? "h6" : "h4"}>
					Dodaj coś!
				</Typography>
			</Grid>
		</Grid>
	);
}
