exports.escape = function (obj, reverse) {
	var key, value,
		newObj,
		type = Object.prototype.toString.call(obj);

	if (type === '[object Object]') {
		newObj = {};
	} else if (type === '[object Array]') {
		newObj = [];
	} else {
		return obj;
	}

	for (key in obj) {
		value = obj[key];

		if (type === '[object Object]') {
			if (reverse === true) {
				key = key.replace(/U\+FF04/g, '$');
				key = key.replace(/U\+FF0E/g, '.');

			} else {
				key = key.replace(/\$/g, 'U+FF04');
				key = key.replace(/\./g, 'U+FF0E');
			}
		}

		newObj[key] = exports.escape(value, reverse);
	}

	return newObj;
};

exports.unescape = function (obj) {
	return exports.escape(obj, true);
};
