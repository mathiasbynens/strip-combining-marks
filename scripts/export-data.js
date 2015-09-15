var regenerate = require('regenerate');
var fs = require('fs');

var packageInfo = JSON.parse(fs.readFileSync('package.json', 'utf8'));

var unicodePackage = Object.keys(packageInfo.devDependencies).find(function(key) {
	return /^unicode-/.test(key);
});

// All types of combining marks
var combiningMarks = regenerate();
require(unicodePackage).blocks.forEach(function(block) {
	if (/^Combining/.test(block)) {
		combiningMarks.add(
			require(unicodePackage + '/blocks/' + block + '/code-points')
		);
	}
});

// All code points except those that map to combining marks
var allExceptCombiningMarks = regenerate()
	.addRange(0x000000, 0x10FFFF)
	.remove(combiningMarks);

module.exports = {
	'combiningMarks': combiningMarks.toString(),
	'allExceptCombiningMarks': allExceptCombiningMarks.toString(),
	'highSurrogates': regenerate().addRange(0xD800, 0xDBFF).toString(),
	'lowSurrogates': regenerate().addRange(0xDC00, 0xDFFF).toString(),
	'version': packageInfo.version
};
