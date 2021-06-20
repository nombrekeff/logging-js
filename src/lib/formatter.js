'use strict';

const colors = require('colors');
const strif = require('strif');
const EmptyRegistry = require('./registry/empty-registry');
const { defaultTransformers } = require('./transformers');

const strifFormatter = strif.create({ transformers: defaultTransformers });

class Formatter {
	constructor(template) {
		this.template = template;
	}

	formatLog(log, { color = false } = {}) {
		return Formatter.format(log, this, color);
	}

	static format(log, formatter, color = false) {
		if (!log || !formatter) {
			throw Error('"log" and "formatter" parameters are required');
		}
		if (!(formatter instanceof Formatter)) {
			throw Error('"formatter" must be a Formatter instance');
		}
		if (!(formatter.template instanceof strif.Template)) {
			throw Error(`"formatter" should be type: "StrifTemplate", not: ${typeof (formatter.template)}`);
		}

		if (color) {
			colors.enable();
		} else {
			colors.disable();
		}

		return formatter.template.compile(log);
	}

	static create(template, options = {}) {
		if (typeof template !== 'string') {
			throw new Error(`"template" must be a string got: ${typeof (template)}`);
		}

		return new Formatter(strifFormatter.template(template, options));
	}
}

Formatter.registry = new EmptyRegistry();
Formatter.colors = colors;

module.exports = Formatter;
