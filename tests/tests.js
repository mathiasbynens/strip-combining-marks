;(function(root) {
	'use strict';

	/** Use a single `load` function */
	var load = typeof require == 'function' ? require : root.load;

	/** The unit testing framework */
	var QUnit = (function() {
		var noop = Function.prototype;
		return root.QUnit || (
			root.addEventListener || (root.addEventListener = noop),
			root.setTimeout || (root.setTimeout = noop),
			root.QUnit = load('../node_modules/qunitjs/qunit/qunit.js') || root.QUnit,
			(load('../node_modules/qunit-clib/qunit-clib.js') || { 'runInContext': noop }).runInContext(root),
			addEventListener === noop && delete root.addEventListener,
			root.QUnit
		);
	}());

	/** The `stripCombiningMarks` object to test */
	var stripCombiningMarks = root.stripCombiningMarks || (root.stripCombiningMarks = (
		stripCombiningMarks = load('../strip-combining-marks.js') || root.stripCombiningMarks,
		stripCombiningMarks = stripCombiningMarks.stripCombiningMarks || stripCombiningMarks
	));

	/*--------------------------------------------------------------------------*/

	function forEach(array, fn) {
		var index = -1;
		var length = array.length;
		while (++index < length) {
			fn(array[index]);
		}
	}

	var data = [
		{
			'description': 'Nothing special',
			'input': 'ma\xF1ana',
			'expected': 'ma\xF1ana'
		},
		{
			'description': 'Combining mark',
			'input': 'man\u0303ana',
			'expected': 'manana'
		},
		{
			'description': 'Multiple combining marks',
			'input': 'foo\u0303\u035C\u035D\u035Ebar',
			'expected': 'foobar'
		},
		{
			'description': 'Leading combining marks (that don’t match a symbol) should not be stripped',
			'input': '\u0303\u035C\u035D\u035Ebar',
			'expected': '\u0303\u035C\u035D\u035Ebar'
		},
		{
			'description': 'Zalgo',
			'input': 'Z\u0351\u036B\u0343\u036A\u0302\u036B\u033D\u034F\u0334\u0319\u0324\u031E\u0349\u035A\u032F\u031E\u0320\u034DA\u036B\u0357\u0334\u0362\u0335\u031C\u0330\u0354L\u0368\u0367\u0369\u0358\u0320G\u0311\u0357\u030E\u0305\u035B\u0341\u0334\u033B\u0348\u034D\u0354\u0339O\u0342\u030C\u030C\u0358\u0328\u0335\u0339\u033B\u031D\u0333!\u033F\u030B\u0365\u0365\u0302\u0363\u0310\u0301\u0301\u035E\u035C\u0356\u032C\u0330\u0319\u0317',
			'expected': 'ZALGO!'
		},
		{
			'description': 'Zalgo including U+1E1A and U+1E6E which are not combining marks and should not be stripped',
			'input': 'H\u0339\u0319\u0326\u032E\u0349\u0329\u0317\u0317\u0367\u0307\u030F\u030A\u033EE\u0368\u0346\u0352\u0306\u036E\u0303\u034F\u0337\u032E\u0323\u032B\u0324\u0323 \u0335\u031E\u0339\u033B\u0300\u0309\u0313\u036C\u0351\u0361\u0345C\u036F\u0302\u0350\u034F\u0328\u031B\u0354\u0326\u031F\u0348\u033BO\u031C\u034E\u034D\u0359\u035A\u032C\u031D\u0323\u033D\u036E\u0350\u0357\u0300\u0364\u030D\u0300\u0362M\u0334\u0321\u0332\u032D\u034D\u0347\u033C\u031F\u032F\u0326\u0309\u0312\u0360\u1E1A\u031B\u0319\u031E\u032A\u0317\u0365\u0364\u0369\u033E\u0351\u0314\u0350\u0345\u1E6E\u0334\u0337\u0337\u0317\u033C\u034D\u033F\u033F\u0313\u033D\u0350H\u0319\u0319\u0314\u0304\u035C',
			'expected': 'HE COM\u1E1A\u1E6EH'
		}
	];

	// explicitly call `QUnit.module()` instead of `module()`
	// in case we are in a CLI environment

	// `throws` is a reserved word in ES3; alias it to avoid errors
	var raises = QUnit.assert['throws'];

	QUnit.module('strip-combining-marks');

	test('strip-combining-marks', function() {
		forEach(data, function(item) {
			var stripped = stripCombiningMarks(item.input);
			equal(
				stripped,
				item.expected,
				item.description
			);
		});
	});

	/*--------------------------------------------------------------------------*/

	// configure QUnit and call `QUnit.start()` for
	// Narwhal, Node.js, PhantomJS, Rhino, and RingoJS
	if (!root.document || root.phantom) {
		QUnit.config.noglobals = true;
		QUnit.start();
	}
}(typeof global == 'object' && global || this));
