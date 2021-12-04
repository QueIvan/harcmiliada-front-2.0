import React from "react";
import { Collapse as MuiCollapse, Grid, Grid as MuiGrid, Typography, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/material/styles";
import { moveToLink } from "../../../utils/Anchors";
import { useMatch, useNavigate, useResolvedPath } from "react-router";

const MenuItemGrid = styled(MuiGrid, { shouldForwardProp: (props) => props !== "active" })(({ theme, active }) => ({
	width: "100%",
	height: "fit-content",
	backgroundColor: active ? "#304236" : "transparent",
	borderRadius: "8px",
	alignItems: "center",
	marginBottom: "8px",
	cursor: "pointer",
	transition:
		"background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, width 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, margin 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	"&>*": { color: "#ffffff" },
	"&:hover": { backgroundColor: "#304236" },
}));

const MenuItemCollapse = styled(MuiCollapse)(({ theme }) => ({
	flex: 1,
	"&>.MuiCollapse-wrapper>.MuiCollapse-wrapperInner": { display: "flex", flex: 1, alignItems: "center" },
}));

const CorrectionIcon = styled(FontAwesomeIcon, { shouldForwardProp: (props) => props !== "correction" })(({ theme, correction }) => ({
	marginLeft: correction ? correction : "0px",
}));

export default function MenuItem(props) {
	const { icon, label, open, correction, href } = props;
	const nav = useNavigate();
	let resolvedPath = useResolvedPath(href);
	let match = useMatch(`${resolvedPath.pathname !== "/" ? `${resolvedPath.pathname}/*` : resolvedPath.pathname}`);

	return (
		<Tooltip disableInteractive={true} title={!open ? label : ""} arrow placement="right">
			<MenuItemGrid
				active={match}
				container
				item
				onMouseUp={(e) => {
					if (e.button === 1) {
						moveToLink(href, nav, "_blank");
					} else if (e.button === 0) {
						moveToLink(href, nav);
					}
				}}
			>
				<Grid item p={2}>
					<CorrectionIcon correction={correction} icon={icon} />
				</Grid>
				<MenuItemCollapse timeout={175} orientation="horizontal" in={open}>
					<Grid item>
						<Typography>{label}</Typography>
					</Grid>
				</MenuItemCollapse>
			</MenuItemGrid>
		</Tooltip>
	);
}
