import React from "react";
import { LoadingButton as MuiLoadingButton } from "@mui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/material/styles";
import { Tooltip } from "@mui/material";

const StyledButton = styled(MuiLoadingButton, { shouldForwardProp: (props) => props !== "row" })(({ theme, row }) => ({
	height: "fit-content",
	backgroundColor: "#455F4D",
	color: "#f1f1f1",
	padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
	border: "1px solid #292929",
	"&:hover": { backgroundColor: "#334739" },
	"&>.MuiLoadingButton-loadingIndicator": { color: "#666666" },
	...(row && {
		"&:last-child": {
			marginLeft: theme.spacing(3),
		},
	}),
}));

export default function HeaderButton(props) {
	const { onClick, loading, size, icon, row, tooltip, placement, sx } = props;

	return (
		<Tooltip title={tooltip ? tooltip : ""} placement={placement ? placement : "right"} arrow disableInteractive={true}>
			<StyledButton onClick={onClick} sx={{ ...sx }} loading={loading} row={row} loadingPosition="center" variant="contained">
				<FontAwesomeIcon size={size ? size : "1x"} icon={icon} />
			</StyledButton>
		</Tooltip>
	);
}
