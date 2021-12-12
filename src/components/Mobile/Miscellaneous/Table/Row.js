import React from "react";
import { TableRow, TableCell, Typography, IconButton } from "@mui/material";
import { LoadingButton as MuiLoadingButton } from "@mui/lab";
import { moveToLink } from "../../../../utils/Anchors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/system";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const StyledButton = styled(MuiLoadingButton)(({ theme }) => ({
	height: "fit-content",
	backgroundColor: "#455F4D",
	color: "#f1f1f1",
	padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
	border: "1px solid #292929",
	"&>.MuiLoadingButton-loadingIndicator": { color: "#666666" },
}));

export default function Row(props) {
	const { config, data, navigation } = props;
	return (
		<TableRow
			data-id={`${data.id}`}
			hover
			tabIndex={-1}
			sx={{
				"&>.MuiTableCell-root": { color: "#f1f1f1", borderBottom: "1px solid #292929" },
			}}
		>
			{config.map((cell) => (
				<TableCell
					key={cell.id}
					align={typeof cell.align === "object" ? cell.align.content : cell.align}
					padding={cell.disablePadding ? "none" : "normal"}
					sx={{
						...((cell.id === "name" || cell.id === "content") && { maxWidth: "35vw" }),
						boxSizing: "border-box",
						paddingLeft: typeof cell.align === "object" ? 1.5 : 0,
					}}
				>
					{cell.length ? (
						<Typography sx={{ ...(data[cell.id].length === 0 && { fontWeight: "bold", color: "#ee0000", textShadow: "0px 0px 10px #000000" }) }}>
							{data[cell.id].length}
						</Typography>
					) : cell.id === "inPublicLib" ? (
						<StyledButton onClick={() => cell.handler(data.id)} size="sm" loadingPosition="center" variant="contained">
							<FontAwesomeIcon size="sm" icon={data[cell.id] ? faCheck : faTimes} />
						</StyledButton>
					) : cell.options ? (
						cell.options.map((option) => (
							<IconButton
								size="small"
								disabled={option.disabled}
								onMouseUp={
									option.editorPath
										? () => moveToLink(`/${option.editorPath}/${data.id}`, navigation)
										: option.id === "console" || option.id === "delete"
										? () => option.handle(data.id)
										: null
								}
								sx={{ "&.Mui-disabled>*": { color: "#c1c1c1 !important" } }}
							>
								<FontAwesomeIcon size="sm" style={{ color: "f1f1f1" }} icon={option.icon} />
							</IconButton>
						))
					) : (
						<Typography sx={{ whiteSpace: "nowrap", overflow: "auto" }}>{data[cell.id]}</Typography>
					)}
				</TableCell>
			))}
		</TableRow>
	);
}
