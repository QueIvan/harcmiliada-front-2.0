export function moveToLink(href, navigate, target) {
	if (target) {
		window.open(href, target);
	} else {
		navigate(href);
	}
}
