const colors = require('colors');

/* istanbul ignore next */
const padd = (v) => ` ${v} `;

/* istanbul ignore next */
module.exports.defaultTransformers = {
	cl_red: (s) => colors.red(s),
	cl_blue: (s) => colors.blue(s),
	cl_cyan: (s) => colors.cyan(s),
	cl_green: (s) => colors.green(s),
	cl_gray: (s) => colors.gray(s),
	cl_yellow: (s) => colors.yellow(s),
	cl_orange: (s) => colors.orange(s),
	cl_purple: (s) => colors.purple(s),
	cl_black: (s) => colors.black(s),
	cl_white: (s) => colors.white(s),
	cl_magenta: (s) => colors.magenta(s),
	// Labels
	lbl_red: (s) => colors.bgRed(padd(s)),
	lbl_blue: (s) => colors.bgBlue(padd(s)),
	lbl_cyan: (s) => colors.bgCyan(padd(s)),
	lbl_green: (s) => colors.bgGreen(padd(s)),
	lbl_gray: (s) => colors.bgGray(padd(s)),
	lbl_yellow: (s) => colors.bgYellow(padd(s)),
	lbl_orange: (s) => colors.bgOrange(padd(s)),
	lbl_purple: (s) => colors.bgPurple(padd(s)),
	lbl_black: (s) => colors.bgBlack(padd(s)),
	lbl_white: (s) => colors.bgWhite(padd(s)),
	lbl_magenta: (s) => colors.bgMagenta(padd(s)),
	// Utils
	stringify: (s) => s != null ? JSON.stringify(s, null, 2) : '',
	stringifyNoFormat: (s) => s != null ? JSON.stringify(s) : '',
	uppercase: (s) => s != null ? s.toUpperCase() : '',
	lowercase: (s) => s != null ? s.toLowerCase() : '',
	capitalize: (s) => s != null ? (s.charAt(0).toUpperCase() + s.slice(1)) : '',
	toString: (s) => s != null ? s.toString() : '',
	toInt: (s) => s != null ? s.toInt() : '',
	toLocaleDate: (s) => s != null ? new Date(s).toLocaleDateString() : '',
};
