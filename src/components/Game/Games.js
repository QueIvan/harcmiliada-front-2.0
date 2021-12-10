import React, { useEffect } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Selector from "../Miscellaneous/Drawer/Selector";
import Drawer from "../Miscellaneous/Drawer/Drawer";
import GamesList from "./GamesList";

export default function Games(props) {
	const [searchQuery, setSearchQuery] = React.useState("");
	const { title, userId } = props;

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	useEffect(() => {
		document.title = `Harcmilliada | ${title}`;
	}, [userId]); //eslint-disable-line

	return (
		<Drawer
			header="Lista gier"
			userId={userId}
			headerOptions={
				<Selector
					value={searchQuery}
					onChange={(e) => handleSearchChange(e)}
					label="Wyszukaj gre"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								{searchQuery && (
									<IconButton
										onClick={() => setSearchQuery("")}
										size="small"
										sx={{ marginRight: "4px", "&:hover>*": { color: "#e1e1e1 !important" } }}
									>
										<FontAwesomeIcon
											size="xs"
											style={{ transition: "color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", color: "#b1b1b1" }}
											icon={faTimes}
										/>
									</IconButton>
								)}
								<FontAwesomeIcon icon={faSearch} />
							</InputAdornment>
						),
					}}
				/>
			}
		>
			<GamesList userId={userId} searchQuery={searchQuery} />
		</Drawer>
	);
}
