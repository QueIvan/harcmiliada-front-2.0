import React from "react";
import { styled } from "@mui/system";
import { TextField } from "@mui/material";

const QuestionSelector = styled(TextField)(({ theme }) => ({
	width: "350px",
	"&>*, &>*>*>*": {
		color: "#e1e1e1 !important",
	},
	"&>*>fieldset": {
		borderColor: "#7A7A7A !important",
	},
}));

export default function Selector(props) {
	return <QuestionSelector {...props} />;
}
