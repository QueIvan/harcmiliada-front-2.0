import React, { useEffect } from "react";
import {
	Grid as MuiGrid,
	TableHead as MuiTableHead,
	Paper,
	TableContainer as MuiTableContainer,
	Table as MuiTable,
	TableBody,
	TableRow,
	TableCell as MuiTableCell,
	TablePagination as MuiTablePagination,
	Skeleton,
	Typography,
} from "@mui/material";
import Pagination from "./Pagination";
import Row from "./Row";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import EmptyPlaceholder from "../../../Miscellaneous/Placeholders/EmptyPlaceholder";

const TableSkeleton = styled(Skeleton, { shouldForwardProp: (props) => props !== "list" })(({ theme, list }) => ({
	width: "100%",
	height: list ? "358px" : "569px",
	marginBottom: theme.spacing(2),
	borderRadius: "8px",
}));

const ComponentGrid = styled(MuiGrid)(({ theme }) => ({
	height: "fit-content",
	padding: theme.spacing(1),
}));

const TablePaper = styled(Paper)(({ theme }) => ({
	width: "100%",
	maxWidth: "100vw",
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
	maxWidth: "100vw",
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

const TableHeader = styled(Typography)(({ theme }) => ({
	padding: `${theme.spacing(0.5)} ${theme.spacing(8)}`,
	marginLeft: "auto",
	marginRight: "auto",
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

export default function MoTable(props) {
	const { enqueueSnackbar } = useSnackbar(); //eslint-disable-line
	const {
		userId,
		creatorName,
		creatorPrompt,
		header,
		tableConfig,
		tableHeader,
		dashboard,
		loopOn,
		emptySize,
		apiPath,
		inList,
		removeButtons,
		removeCreateButton,
		removeDeleteButton,
	} = props; //eslint-disable-line
	const [emptyRows, setEmptyRows] = React.useState(0);
	const [page, setPage] = React.useState(0);
	const tableCells = tableConfig.cells || [];
	const rowsPerPage = dashboard ? 4 : 7;
	const nav = useNavigate();

	const preparePageForLoad = (data) => {
		setEmptyRows(Math.max(0, (1 + page) * rowsPerPage - data.length));
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		setEmptyRows(Math.max(0, (1 + newPage) * rowsPerPage - loopOn.length));
	};

	useEffect(() => {
		if (loopOn) {
			preparePageForLoad(loopOn);
		}
	}, [loopOn, userId]); //eslint-disable-line

	return (
		<ComponentGrid container item xs={12}>
			{!loopOn ? (
				<React.Fragment>
					{header ? (
						<Skeleton sx={{ borderRadius: "8px", margin: "0 auto" }} variant="rectangular" animation="wave">
							<TableHeader>{tableHeader}</TableHeader>
						</Skeleton>
					) : null}
					<TableSkeleton list={inList} variant="rectangular" animation="wave" />
				</React.Fragment>
			) : (
				<React.Fragment>
					{header ? <TableHeader>{tableHeader}</TableHeader> : null}
					<TablePaper>
						<TableContainer>
							<TableComponent aria-labelledby="tableTitle">
								<TableHead>
									<TableRow>
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
									{loopOn?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
										<Row key={row?.id} data={row} navigation={nav} config={tableCells} />
									))}
									{emptyRows > 0 && (
										<TableRow
											style={{
												height: emptySize * emptyRows,
											}}
										>
											<TableCell emptyrow="true" colSpan={tableCells.length + 1}>
												{loopOn?.length === 0 && <EmptyPlaceholder />}
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</TableComponent>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[]}
							component="div"
							count={loopOn?.length}
							labelDisplayedRows={({ from, to, count }) => (loopOn?.length <= rowsPerPage ? "" : `${from}-${to} z ${count}`)}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							ActionsComponent={(props) => (
								<Pagination
									{...props}
									userId={userId}
									apiPath={apiPath}
									nav={nav}
									creatorName={creatorName ? creatorName : null}
									creatorPrompt={creatorPrompt}
									removeCreateButton={removeCreateButton}
									removeDeleteButton={removeDeleteButton}
									removeButtons={removeButtons}
								/>
							)}
						/>
					</TablePaper>
				</React.Fragment>
			)}
		</ComponentGrid>
	);
}
