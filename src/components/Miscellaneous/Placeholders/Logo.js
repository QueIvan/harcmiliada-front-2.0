import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree } from "@fortawesome/free-solid-svg-icons";

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
				<Box sx={{ position: "relative", minHeight: "80px", minWidth: "100px", "&>*": { position: "absolute" } }}>
					<FontAwesomeIcon size="5x" icon={faTree} style={{ color: "#96A58D", filter: "drop-shadow(0px 0px 10px #000000)" }} />
					<FontAwesomeIcon size="5x" icon={faTree} style={{ right: 0, color: "#96A58D", filter: "drop-shadow(0px 0px 10px #000000)" }} />
					<FontAwesomeIcon
						size="5x"
						icon={faTree}
						style={{
							left: "50%",
							transform: "translateX(-50%)",
							top: "8px",
							color: "#96A58D",
							filter: "drop-shadow(0px 0px 10px #000000)",
						}}
					/>
				</Box>
			</Grid>
			<Grid item sx={{ marginBottom: "15px" }}>
				<Typography variant="h1">Harcmiliada</Typography>
			</Grid>
		</Grid>
	);
}
