"use strict";
/**
 * The storage allows you to store data to a backend using the fingerprint.
 * It works in a similar manner as localStorage
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItem = exports.setItem = void 0;
var getItem_1 = require("./getItem");
Object.defineProperty(exports, "getItem", { enumerable: true, get: function () { return getItem_1.getItem; } });
var setItem_1 = require("./setItem");
Object.defineProperty(exports, "setItem", { enumerable: true, get: function () { return setItem_1.setItem; } });
