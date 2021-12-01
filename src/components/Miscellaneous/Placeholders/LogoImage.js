import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";

export default function LogoImage(props) {
	const { addObject, objectPlacement, logoProps } = props;

	return (
		<Box
			sx={{
				position: "relative",
				minHeight: "80px",
				minWidth: "100px",
				"&>*": { position: "absolute", color: "#96A58D", filter: "drop-shadow(0px 0px 10px #000000)", ...logoProps },
			}}
		>
			{objectPlacement === "before" && addObject}
			<FontAwesomeIcon size="5x" icon={faTree} />
			<FontAwesomeIcon size="5x" icon={faTree} style={{ right: 0 }} />
			<FontAwesomeIcon
				size="5x"
				icon={faTree}
				style={{
					left: "50%",
					transform: "translateX(-50%)",
					top: "8px",
				}}
			/>
			{objectPlacement === "after" && addObject}
		</Box>
	);
}
