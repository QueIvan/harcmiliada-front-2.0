import React, { useEffect } from "react";
import {
	Grid as MuiGrid,
	Menu,
	MenuItem,
	TableHead as MuiTableHead,
	Typography,
	Typography as MuiTypography,
	Paper,
	ListItemIcon,
	TableContainer as MuiTableContainer,
	Table as MuiTable,
	TableBody,
	Checkbox,
	TableRow,
	TableCell as MuiTableCell,
	TablePagination as MuiTablePagination,
	Skeleton as MuiSkeleton,
} from "@mui/material";
import Pagination from "./Pagination";
import Row from "./Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import { faCheckSquare, faSquare, faMinusSquare } from "@fortawesome/free-regular-svg-icons";
import { moveToLink } from "../../../utils/Anchors";
import EmptyPlaceholder from "./EmptyPlaceholder";

const HeaderSkeleton = styled(MuiSkeleton, { shouldForwardProp: (props) => props !== "headerPlacement" })(({ theme, headerPlacement }) => ({
	width: "35%",
	height: "55px",
	marginTop: theme.spacing(1),
	...(headerPlacement === "right" ? { marginLeft: "auto", marginRight: theme.spacing(5) } : { marginLeft: theme.spacing(5) }),
	borderTopLeftRadius: "8px",
	borderTopRightRadius: "8px",
}));

const TableSkeleton = styled(MuiSkeleton, { shouldForwardProp: (props) => props !== "header" && props !== "editor" })(({ theme, header, editor }) => ({
	width: "100%",
	height: editor ? "475px" : header ? "402px" : "698px",
	marginBottom: theme.spacing(2),
	borderRadius: "8px",
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
	...theme.menu,
}));

const ComponentGrid = styled(MuiGrid)(({ theme }) => ({
	padding: theme.spacing(1),
}));

const TableHeader = styled(MuiTypography, { shouldForwardProp: (props) => props !== "headerPlacement" })(({ theme, headerPlacement }) => ({
	padding: `${theme.spacing(1)} ${theme.spacing(12)}`,
	marginTop: theme.spacing(1),
	...(headerPlacement === "right" ? { marginLeft: "auto", marginRight: theme.spacing(5) } : { marginLeft: theme.spacing(5) }),
	height: "fit-content",
	fontSize: "1.35rem",
	fontWeight: "bold",
	color: "#ffffff",
	textShadow: "0px 0px 10px #000000",
	backgroundColor: "#304236",
	borderTopLeftRadius: "8px",
	borderTopRightRadius: "8px",
	border: "1px solid #292929",
	borderBottom: "none",
}));

const TablePaper = styled(Paper)(({ theme }) => ({
	width: "100%",
	marginBottom: theme.spacing(2),
	backgroundColor: "#3C5344",
	borderRadius: "8px",
	border: "1px solid #292929",
}));

const TableContainer = styled(MuiTableContainer)(({ theme }) => ({
	borderTopLeftRadius: "8px",
	borderTopRightRadius: "8px",
	...theme.scroll,
}));

const TablePagination = styled(MuiTablePagination)(({ theme }) => ({
	color: "#ffffff",
	backgroundColor: "#304236",
	borderBottomLeftRadius: "8px",
	borderBottomRightRadius: "8px",
}));

const TableComponent = styled(MuiTable)(({ theme }) => ({
	minWidth: 700,
}));

const TableHead = styled(MuiTableHead)(({ theme }) => ({
	backgroundColor: "#304236",
}));

const TableCell = styled(MuiTableCell)(({ theme }) => ({
	color: "#ffffff",
	borderBottom: "1px solid #292929",
	fontSize: "1rem",
}));

const TextTableCell = styled(TableCell, { shouldForwardProp: (props) => props !== "disablePadding" })(({ theme, disablePadding }) => ({
	fontSize: "1.1rem",
	padding: disablePadding ? "none" : "normal",
	textShadow: "0px 0px 10px #000000",
}));

const ColoredIcon = styled(FontAwesomeIcon, { shouldForwardProp: (props) => props !== "whiten" })(({ theme, whiten }) => ({
	color: whiten ? "#ffffff" : "#ACC3B4",
}));

export default function Table(props) {
	const { enqueueSnackbar } = useSnackbar();
	const {
		tableHeader,
		loopOn,
		small,
		header,
		headerPlacement,
		move,
		moveData,
		emptySize,
		addTooltip,
		apiPath,
		creatorName,
		handleRowRemoval,
		tableValueHandler,
		addHandler,
		creatorPrompt,
		deleteTooltip,
		emptyPlaceholder,
		removeDelete,
		removeEmpty,
		handleRowClick,
		removeCreate,
		onSave,
		onDiscard,
		userId,
	} = props;
	const [contextMenu, setContextMenu] = React.useState(null);
	const [contextId, setContextId] = React.useState(null);
	const [selectedRows, setSelectedRows] = React.useState([]);
	const [emptyRows, setEmptyRows] = React.useState(0);
	const [page, setPage] = React.useState(0);
	const tableCells = props.tableConfig.cells || [];
	const menu = props.tableConfig.contextMenu || null;
	const rowsPerPage = small ? 7 : header ? 5 : 10;
	const nav = useNavigate();

	const handleContextMenu = (event) => {
		let checks = [event.target.classList.contains("MuiTableCell-root"), !event.target.classList.contains("MuiTableCell-head")];
		if (!menu.config.includeEmpty) {
			checks.push(!event.target.attributes.emptyRow);
		}
		if (checks.every((check) => check === true)) {
			event.preventDefault();
			setContextId(!menu.config.includeEmpty ? event.target.parentElement.attributes["data-id"].value : null);
			setContextMenu(contextMenu === null ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 } : null);
		}
	};

	const deleteHandler = () => {
		fetch(`${process.env.REACT_APP_API_URL}/${apiPath}/multiple/${userId}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(selectedRows),
		})
			.then(() => nav(0))
			.catch((err) => enqueueSnackbar("Wystąpił błąd podczas pobierania danych z bazy", { variant: "error", autoHideDuration: 1500 }));
	};

	const removeSelectedRows = () => {
		handleRowRemoval(selectedRows);
		setSelectedRows([]);
	};

	const handleSelectedRows = (e, id) => {
		setSelectedRows(e.target.checked ? [...selectedRows, id] : selectedRows.filter((item) => item !== id));
	};

	const handleSelectAllRows = () => {
		setSelectedRows(selectedRows.length === loopOn.length ? [] : loopOn.map((item) => item.id));
	};

	const handleClose = () => {
		setContextMenu(null);
		setContextId(null);
	};

	const preparePageForLoad = (data) => {
		setEmptyRows(Math.max(0, (1 + page) * rowsPerPage - data.length));
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		setEmptyRows(Math.max(0, (1 + newPage) * rowsPerPage - loopOn.length));
	};

	const correction = () => {
		let loop = [...loopOn];
		let other, moving;

		if (selectedRows.length > 0) {
			other = move.direction === "active" ? [...move.variable.active] : [...move.variable.lib];

			moving = loop.filter((item) => selectedRows.includes(item.id));

			loop = loop.filter((item) => !selectedRows.includes(item.id));
			other = other.concat(moving);

			move.handler.active(move.direction === "active" ? other : loop);
			move.handler.lib(move.direction === "active" ? loop : other);

			setSelectedRows([]);
		}

		handleClose();
	};

	useEffect(() => {
		if (typeof moveData !== "undefined") {
			correction();
		}
		if (loopOn) {
			preparePageForLoad(loopOn);
		}
	}, [loopOn, moveData, userId]); //eslint-disable-line

	return (
		<ComponentGrid container item xs={small ? 5 : 12}>
			{!loopOn ? (
				<React.Fragment>
					{header ? <HeaderSkeleton headerPlacement={headerPlacement} variant="rectangular" animation="wave" /> : null}
					<TableSkeleton header={header} editor={small} variant="rectangular" animation="wave" />
				</React.Fragment>
			) : (
				<React.Fragment>
					{header ? <TableHeader headerPlacement={headerPlacement}>{tableHeader}</TableHeader> : null}
					<TablePaper>
						<div onContextMenu={menu ? handleContextMenu : null}>
							<TableContainer>
								<TableComponent aria-labelledby="tableTitle">
									<TableHead>
										<TableRow>
											<TableCell padding="checkbox" align="center">
												<Checkbox
													onClick={handleSelectAllRows}
													checked={selectedRows.length === loopOn.length && loopOn.length > 0}
													indeterminate={selectedRows.length > 0 && selectedRows.length < loopOn.length}
													icon={loopOn.length > 0 ? <ColoredIcon whiten="true" icon={faSquare} /> : <div />}
													checkedIcon={<ColoredIcon icon={faCheckSquare} />}
													indeterminateIcon={<ColoredIcon icon={faMinusSquare} />}
												/>
											</TableCell>
											{tableCells.map((cell) => (
												<TextTableCell
													key={cell.id}
													align={typeof cell.align === "object" ? cell.align.header : cell.align}
													disablePadding={cell.disablePadding}
												>
													{cell.label}
												</TextTableCell>
											))}
										</TableRow>
									</TableHead>

									<TableBody sx={{ position: "relative" }}>
										{loopOn.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
											return !(row.type && row.type === "empty") ? (
												<Row
													selected={selectedRows.includes(row.id)}
													onSelect={handleSelectedRows}
													contextId={contextId}
													onRowClick={handleRowClick}
													key={row.id}
													data={row}
													navigation={nav}
													config={tableCells}
												/>
											) : (
												<Row
													type="editor"
													defaultValue={{ content: row?.content, score: row?.score }}
													valueHandler={(e, target) => {
														tableValueHandler(e, target);
													}}
													key={row.id}
													visible={row.id}
													onSave={onSave}
													onDiscard={onDiscard}
													config={tableCells}
													emptySize={emptySize}
												/>
											);
										})}
										{emptyRows > 0 && !removeEmpty && (
											<TableRow
												style={{
													height: emptySize * emptyRows,
												}}
											>
												<TableCell emptyrow="true" colSpan={tableCells.length + 1}>
													{loopOn.length === 0 && !emptyPlaceholder && <EmptyPlaceholder small={small} header={header} />}
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</TableComponent>
							</TableContainer>
							{menu ? (
								<StyledMenu
									open={contextMenu !== null}
									onClose={handleClose}
									anchorReference="anchorPosition"
									anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
								>
									{menu.buttons.map((item) => (
										<MenuItem
											key={item.id}
											onClick={
												item.editorPath
													? () => moveToLink(`/dashboard/${item.editorPath}/${contextId}`, nav)
													: item.id === "delete"
													? () => item.handle(contextId)
													: item.id === "move"
													? () => correction()
													: null
											}
										>
											<ListItemIcon>
												<FontAwesomeIcon size="sm" icon={item.icon} />
											</ListItemIcon>
											<Typography variant="inherit">{item.label}</Typography>
										</MenuItem>
									))}
								</StyledMenu>
							) : null}
						</div>
						<TablePagination
							rowsPerPageOptions={[]}
							component="div"
							count={loopOn.length}
							labelDisplayedRows={({ from, to, count }) => (loopOn.length <= rowsPerPage ? "" : `${from}-${to} z ${count}`)}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							ActionsComponent={(props) => (
								<Pagination
									{...props}
									userId={userId}
									addTooltip={addTooltip}
									addHandler={addHandler}
									deleteTooltip={deleteTooltip}
									deleteHandler={handleRowRemoval ? removeSelectedRows : deleteHandler}
									apiPath={apiPath}
									nav={nav}
									deleteCondition={selectedRows.length > 0}
									creatorName={creatorName}
									creatorPrompt={creatorPrompt}
									removeDelete={removeDelete}
									removeCreate={removeCreate}
								/>
							)}
						/>
					</TablePaper>
				</React.Fragment>
			)}
			{props.children ? props.children : null}
		</ComponentGrid>
	);
}
