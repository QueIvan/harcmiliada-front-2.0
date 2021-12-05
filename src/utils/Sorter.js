function compare(a, b, on) {
	if (a[on] > b[on]) {
		return -1;
	}
	if (a[on] < b[on]) {
		return 1;
	}
	return 0;
}

export function sorting(data, sort, loopOn) {
	let newData;
	if (loopOn) {
		newData = { ...data };
		newData[loopOn] = data[loopOn].sort((a, b) => compare(a, b, sort));
	} else {
		newData = [...data].sort((a, b) => compare(a, b, sort));
	}
	return newData;
}

export const sortAndSave = (data, callback, sort, loopOn, shouldReturn) => {
	const newData = sorting(data, sort, loopOn);
	callback(newData);
	if (shouldReturn) {
		return newData;
	}
};
