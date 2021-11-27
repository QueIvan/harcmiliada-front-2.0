function correctNumber(number) {
	return number <= 9 ? `0${number}` : number;
}

function correctHour(number) {
	let hour = number + 1;
	let h = hour >= 24 ? hour - 24 : hour;
	return h <= 9 ? `0${h}` : h;
}

export function convertDate(date) {
	const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
	const d = new Date(date);
	if (date) {
		return `${correctNumber(d.getDate())} ${months[d.getMonth()]}${
			new Date().getFullYear() !== d.getFullYear() ? ` ${d.getFullYear()}` : ""
		}, ${correctHour(d.getHours())}:${correctNumber(d.getMinutes())}`;
	} else {
		return "Nowe pytanie";
	}
}
