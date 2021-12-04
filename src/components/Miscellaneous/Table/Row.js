import { TableRow, Checkbox, TableCell, IconButton, Tooltip, TextField, Typography, Collapse, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { convertDate } from "../../../utils/Date";
import React, { useEffect } from "react";
import { faCheck, faSave, faStarOfLife, faTimes, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { moveToLink } from "../../../utils/Anchors";
import HeaderButton from "../Drawer/HeaderButton";

export default function Row(props) {
	const { type, visible, config, name, defaultValue, valueHandler, selected, onSelect, data, navigation, onDiscard, onSave, onRowClick } = props;
	const [expanded, setExpanded] = React.useState(false);

	useEffect(() => {
		if (!visible) {
			setExpanded(true);
		} else {
			setTimeout(() => {
				setExpanded(true);
			}, 100);
		}
	}, []); // eslint-disable-line

	return (
		<React.Fragment>
			{type !== "editor" ? (
				<TableRow
					data-id={`${data.id}`}
					hover
					tabIndex={-1}
					key={name}
					onClick={
						onRowClick
							? (e) => {
									onRowClick(e, data.id);
							  }
							: null
					}
					sx={{
						"&>.MuiTableCell-root": { color: "#f1f1f1", borderBottom: "1px solid #292929" },
					}}
				>
					<TableCell align="center" padding="checkbox">
						<Checkbox
							checked={selected}
							onClick={(e) => onSelect(e, data.id)}
							icon={<FontAwesomeIcon icon={faSquare} />}
							checkedIcon={<FontAwesomeIcon style={{ color: "#ACC3B4" }} icon={faCheckSquare} />}
							sx={{ color: "#f1f1f1", fontSize: "1rem" }}
						/>
					</TableCell>
					{config.map((cell) => (
						<TableCell
							key={cell.id}
							align={typeof cell.align === "object" ? cell.align.content : cell.align}
							padding={cell.disablePadding ? "none" : "normal"}
							sx={{ boxSizing: "border-box", paddingLeft: typeof cell.align === "object" ? 1.5 : 0 }}
						>
							{cell.length ? (
								<Typography>{data[cell.id].length}</Typography>
							) : cell.id === "createdAt" ? (
								<Typography>{convertDate(data[cell.id])}</Typography>
							) : cell.id === "inPublicLib" ? (
								<HeaderButton onClick={() => cell.handler(data.id)} size="sm" icon={data[cell.id] ? faCheck : faTimes} />
							) : cell.options ? (
								cell.options.map((option) => (
									<Tooltip disableInteractive={true} arrow placement="top" key={option.id} title={option.label}>
										<span>
											<IconButton
												size="small"
												disabled={option.disabled}
												onClick={
													option.editorPath
														? () => {
																moveToLink(`/${option.editorPath}/${data.id}`, navigation);
														  }
														: option.id === "delete"
														? () => option.handle(data.id)
														: option.id === "console"
														? () => option.handle(data.id)
														: null
												}
												sx={{ "&.Mui-disabled>*": { color: "#c1c1c1 !important" } }}
											>
												<FontAwesomeIcon size="sm" style={{ color: "f1f1f1" }} icon={option.icon} />
											</IconButton>
										</span>
									</Tooltip>
								))
							) : (
								<Typography>{data[cell.id]}</Typography>
							)}
						</TableCell>
					))}
				</TableRow>
			) : (
				<TableRow key="empty">
					<TableCell colSpan={config.length + 1} align="center" padding="none" sx={{ border: "none" }}>
						<Collapse in={expanded} sx={{ width: "100%", "&>*": { color: "#f1f1f1", borderBottom: "1px solid #292929" } }}>
							<Grid container sx={{ alignItems: "center" }}>
								<Grid item xs="auto" p={2.4}>
									<FontAwesomeIcon icon={faStarOfLife} />
								</Grid>
								<Grid container item sx={{ flex: 1 }}>
									<Grid item xs={6}>
										<TextField
											sx={{
												color: "#ffffff",
												width: "75%",
												"&>*>fieldset": {
													borderColor: "#7A7A7A !important",
												},
												"&>*>*:last-child": { border: "2px solid #292929" },
											}}
											defaultValue={defaultValue?.content}
											onChange={(e) => valueHandler(e, "content")}
											label="Treść pytania"
											InputLabelProps={{ style: { color: "#e1e1e1" } }}
											inputProps={{ style: { color: "#ffffff" } }}
											size="small"
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											sx={{
												color: "#ffffff",
												width: "75%",
												"&>*>fieldset": {
													borderColor: "#7A7A7A !important",
												},
												"&>*>*:last-child": { border: "2px solid #292929" },
											}}
											label="Ilość punktów"
											defaultValue={defaultValue?.score}
											onChange={(e) => valueHandler(e, "score")}
											InputLabelProps={{ style: { color: "#e1e1e1" } }}
											inputProps={{ style: { color: "#ffffff", textAlign: "right" } }}
											size="small"
										/>
									</Grid>
								</Grid>
								<Grid item xs="auto" sx={{ marginLeft: "auto" }} px={3}>
									<HeaderButton onClick={onDiscard} row icon={faTrashAlt} />
									<HeaderButton onClick={onSave} row icon={faSave} />
								</Grid>
							</Grid>
						</Collapse>
					</TableCell>
				</TableRow>
			)}
		</React.Fragment>
	);
}
