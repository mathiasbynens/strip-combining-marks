(function(root) {
	'use strict';

	var noop = Function.prototype;

	var load = (typeof require == 'function' && !(root.define && define.amd)) ?
		require :
		(!root.document && root.java && root.load) || noop;

	var QUnit = (function() {
		return root.QUnit || (
			root.addEventListener || (root.addEventListener = noop),
			root.setTimeout || (root.setTimeout = noop),
			root.QUnit = load('../node_modules/qunitjs/qunit/qunit.js') || root.QUnit,
			addEventListener === noop && delete root.addEventListener,
			root.QUnit
		);
	}());

	var qe = load('../node_modules/qunit-extras/qunit-extras.js');
	if (qe) {
		qe.runInContext(root);
	}

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
			'description': 'Leading combining marks (that don’t match a symbol) should not be stripped except for Line_Break=Combining_Mark',
			'input': '\u0303\u035C\u035D\u035Ebar',
			'expected': '\u035C\u035D\u035Ebar'
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
		},
		{
			// https://github.com/mathiasbynens/strip-combining-marks/issues/1
			'description': 'Line_Break=Combining_Mark symbols should be stripped',
			'input': 'c\u0302\u030B\u036D\u0365\u030B\u0323\u031C\u0331\u035A\u0354\u0318\u0317r\u034A\u0300\u0368\u033E\u034B\u033E\u0364\u0325\u0317a\u034B\u034A\u035C\u0324\u031C\u031F\u0353\u0323\u0317z\u0323\u032A\u0333\u0324\u032F\u0329y\u0342\u0341 \u0305\u0300\u0344\u0342\u0489\u0319\u0333\u0320\u0326\u0317\u0323o\u0369\u036A\u0346\u0314\u0328\u0318\u0320\u035A\u034E\u0332\u0349n\u0363\u036A\u030D\u0366\u030B\u034B\u0363\u031De\u035D\u031F\u0333\u0319\u0319\u033A\u0332s\u0320\u0316\u0347\u033A\u031E\u0324',
			'expected': 'crazy ones'
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
