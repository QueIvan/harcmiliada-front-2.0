export function customPortChange(port) {
	if (port >= 0 && port <= 65535) {
		return port + 1;
	} else if (port > 1) {
		return port - 1;
	}
}
