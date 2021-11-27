function compare(a, b, on) {
	if (a[on] > b[on]) {
		return -1;
	}
	if (a[on] < b[on]) {
		return 1;
	}
	return 0;
}

export const sortAndSave = (data, callback, sort, loopOn) => {
	let newData;
	if (loopOn) {
		newData = { ...data };
		newData[loopOn] = data[loopOn].sort((a, b) => compare(a, b, sort));
	} else {
		newData = [...data].sort((a, b) => compare(a, b, sort));
	}
	callback(data);
};
