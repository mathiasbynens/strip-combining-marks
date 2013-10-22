/*! http://mths.be/stripcombiningmarks v0.1.0 by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var regexSymbolWithCombiningMarks = /([\0-\u02FF\u0370-\u1DBF\u1E00-\u20CF\u2100-\uD7FF\uDC00-\uFE1F\uFE30-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF])([\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]+)/g;

	var stripCombiningMarks = function(string) {
		// Step 1: deal with combining marks and astral symbols (surrogate pairs)
		return string
			// Remove any combining marks that actually belong to a symbol
			.replace(regexSymbolWithCombiningMarks, '$1');
	};

	stripCombiningMarks.version = '0.1.0';

	/*--------------------------------------------------------------------------*/

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return stripCombiningMarks;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = stripCombiningMarks;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (var key in stripCombiningMarks) {
				stripCombiningMarks.hasOwnProperty(key) && (freeExports[key] = stripCombiningMarks[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.stripCombiningMarks = stripCombiningMarks;
	}

}(this));
