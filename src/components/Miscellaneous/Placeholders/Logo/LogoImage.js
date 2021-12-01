import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";

export default function LogoImage(props) {
	const { addObject, logoProps, boxProps } = props;
	const objectPlacement = props.objectPlacement || "after";

	return (
		<Box
			sx={{
				position: "relative",
				minHeight: "80px",
				minWidth: "100px",
				...boxProps,
				"&>*": { position: "absolute", filter: "drop-shadow(0px 0px 10px #000000)" },
			}}
		>
			{objectPlacement === "before" && addObject}
			<FontAwesomeIcon icon={faTree} style={{ ...logoProps }} />
			<FontAwesomeIcon icon={faTree} style={{ right: 0, ...logoProps }} />
			<FontAwesomeIcon
				icon={faTree}
				style={{
					left: "50%",
					transform: "translateX(-50%)",
					top: "8px",
					...logoProps,
				}}
			/>
			{objectPlacement === "after" && addObject}
		</Box>
	);
}
