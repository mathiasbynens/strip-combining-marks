/*! http://mths.be/stripcombiningmarks v<%= version %> by @mathias */
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

	var regexSymbolWithCombiningMarks = /(<%= allExceptCombiningMarks %>)(<%= combiningMarks %>+)/g;

	var stripCombiningMarks = function(string) {
		// Step 1: deal with combining marks and astral symbols (surrogate pairs)
		return string
			// Remove any combining marks that actually belong to a symbol
			.replace(regexSymbolWithCombiningMarks, '$1');
	};

	stripCombiningMarks.version = '<%= version %>';

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
			freeExports.stripCombiningMarks = stripCombiningMarks;
		}
	} else { // in Rhino or a web browser
		root.stripCombiningMarks = stripCombiningMarks;
	}

}(this));
