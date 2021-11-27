import React from "react";
import { Grid, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
	return (
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
				<Grid item sx={{ marginBottom: "15px" }}>
					<FontAwesomeIcon size="5x" icon={faCircleNotch} spin style={{ filter: "drop-shadow(0px 0px 10px #000000)" }} />
				</Grid>
				<Grid item>
					<Typography sx={{ fontSize: "1.45rem", fontWeight: "bold", textShadow: "0px 0px 10px #000000" }}>Poczekaj chwilę</Typography>
				</Grid>
				<Grid item>
					<Typography sx={{ fontSize: "1.45rem", fontWeight: "bold", textShadow: "0px 0px 10px #000000" }}>Trwa proces logowania</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
}
