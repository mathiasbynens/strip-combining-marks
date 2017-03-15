'use strict';

const fs = require('fs');
const regenerate = require('regenerate');

const packageInfo = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const unicodePackage = Object.keys(packageInfo.devDependencies).find((key) => {
	return /^unicode-/.test(key);
});

// All types of combining marks
const combiningMarks = regenerate();
for (const block of require(unicodePackage).Block) {
	if (/^Combining/.test(block)) {
		combiningMarks.add(
			require(`${unicodePackage}/Block/${ block }/code-points.js`)
		);
	}
}
const lineBreakCombiningMarks = regenerate(
	require(`${unicodePackage}/Line_Break/Combining_Mark/code-points.js`)
);

// All code points except those that map to combining marks
const allExceptCombiningMarks = regenerate()
	.addRange(0x000000, 0x10FFFF)
	.remove(combiningMarks);

module.exports = {
	'combiningMarks': combiningMarks.toString(),
	'lineBreakCombiningMarks': lineBreakCombiningMarks.toString(),
	'allExceptCombiningMarks': allExceptCombiningMarks.toString(),
	'highSurrogates': regenerate().addRange(0xD800, 0xDBFF).toString(),
	'lowSurrogates': regenerate().addRange(0xDC00, 0xDFFF).toString(),
	'version': packageInfo.version
};
