'use strict';

var async_hooks = require('async_hooks');

const noGlobalAwsLambda = process.env["AWS_LAMBDA_NODEJS_NO_GLOBAL_AWSLAMBDA"] === "1" ||
    process.env["AWS_LAMBDA_NODEJS_NO_GLOBAL_AWSLAMBDA"] === "true";
if (!noGlobalAwsLambda) {
    globalThis.awslambda = globalThis.awslambda || {};
}
const PROTECTED_KEYS = {
    REQUEST_ID: Symbol("_AWS_LAMBDA_REQUEST_ID"),
    X_RAY_TRACE_ID: Symbol("_AWS_LAMBDA_X_RAY_TRACE_ID"),
    TENANT_ID: Symbol("_AWS_LAMBDA_TENANT_ID"),
};
class InvokeStoreImpl {
    static storage = new async_hooks.AsyncLocalStorage();
    static PROTECTED_KEYS = PROTECTED_KEYS;
    static run(context, fn) {
        return this.storage.run({ ...context }, fn);
    }
    static getContext() {
        return this.storage.getStore();
    }
    static get(key) {
        const context = this.storage.getStore();
        return context?.[key];
    }
    static set(key, value) {
        if (this.isProtectedKey(key)) {
            throw new Error(`Cannot modify protected Lambda context field`);
        }
        const context = this.storage.getStore();
        if (context) {
            context[key] = value;
        }
    }
    static getRequestId() {
        return this.get(this.PROTECTED_KEYS.REQUEST_ID) ?? "-";
    }
    static getXRayTraceId() {
        return this.get(this.PROTECTED_KEYS.X_RAY_TRACE_ID);
    }
    static getTenantId() {
        return this.get(this.PROTECTED_KEYS.TENANT_ID);
    }
    static hasContext() {
        return this.storage.getStore() !== undefined;
    }
    static isProtectedKey(key) {
        return (key === this.PROTECTED_KEYS.REQUEST_ID ||
            key === this.PROTECTED_KEYS.X_RAY_TRACE_ID);
    }
}
let instance;
if (!noGlobalAwsLambda && globalThis.awslambda?.InvokeStore) {
    instance = globalThis.awslambda.InvokeStore;
}
else {
    instance = InvokeStoreImpl;
    if (!noGlobalAwsLambda && globalThis.awslambda) {
        globalThis.awslambda.InvokeStore = instance;
    }
}
const InvokeStore = instance;

exports.InvokeStore = InvokeStore;
