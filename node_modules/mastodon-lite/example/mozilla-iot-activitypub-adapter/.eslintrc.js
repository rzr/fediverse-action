module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "max-classes-per-file": "warn",
        "no-new": "warn",
        "max-params": "warn",
"no-prototype-builtins" : "warn",
"no-unused-vars" : "warn",
"no-shadow" : "warn",
"class-methods-use-this" : "warn",
"default-case" :"warn"
    }
};
