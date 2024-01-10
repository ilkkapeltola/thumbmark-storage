"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.getItem = exports.setItem = exports.getFingerprint = void 0;
var thumbmarkjs_1 = require("thumbmarkjs");
Object.defineProperty(exports, "getFingerprint", { enumerable: true, get: function () { return thumbmarkjs_1.getFingerprint; } });
var storage_1 = require("./storage");
Object.defineProperty(exports, "setItem", { enumerable: true, get: function () { return storage_1.setItem; } });
Object.defineProperty(exports, "getItem", { enumerable: true, get: function () { return storage_1.getItem; } });
var options = {
    storageUrl: 'https://storage-test.thumbmarkjs.com/v1/fingerprint',
    namespace: 'thumbmarkjs'
};
exports.options = options;
