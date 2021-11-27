import React from "react";
import { Collapse as MuiCollapse, Grid, Grid as MuiGrid, Typography, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/material/styles";
import { moveToLink } from "../../../utils/Anchors";
import { useMatch, useNavigate, useResolvedPath } from "react-router";

const MenuItemGrid = styled(MuiGrid, { shouldForwardProp: (props) => props !== "active" && props !== "loggedOut" })(({ theme, active, loggedOut }) => ({
	width: "100%",
	height: "fit-content",
	backgroundColor: active ? "#304236" : "transparent",
	borderRadius: "8px",
	alignItems: "center",
	marginBottom: "8px",
	cursor: loggedOut ? "default" : "pointer",
	transition:
		"background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, width 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, margin 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	"&>*": { color: "#ffffff" },
	...(!loggedOut && {
		"&:hover": { backgroundColor: "#304236" },
	}),
}));

const MenuItemCollapse = styled(MuiCollapse)(({ theme }) => ({
	flex: 1,
	"&>.MuiCollapse-wrapper>.MuiCollapse-wrapperInner": { display: "flex", flex: 1, alignItems: "center" },
}));

const CorrectionIcon = styled(FontAwesomeIcon, { shouldForwardProp: (props) => props !== "correction" })(({ theme, correction }) => ({
	marginLeft: correction ? correction : "0px",
}));

export default function MenuItem(props) {
	const { icon, label, open, correction, href, loggedOut } = props;
	const nav = useNavigate();
	let resolvedPath = useResolvedPath(href);
	let match = useMatch(`${resolvedPath.pathname !== "/dashboard" ? `${resolvedPath.pathname}/*` : resolvedPath.pathname}`);

	return (
		<Tooltip disableInteractive={true} title={!open && !loggedOut ? label : ""} arrow placement="right">
			<MenuItemGrid active={loggedOut ? false : match} loggedOut={loggedOut} container item onClick={loggedOut ? null : () => moveToLink(href, nav)}>
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
