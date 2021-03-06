"use strict";

const angular  = require('angular');
const bulk     = require('bulk-require');

require('../logger/logger.module');
module.exports = angular.module('utils.router', ['utils.logger']);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);