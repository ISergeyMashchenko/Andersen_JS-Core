Array.prototype.myFilter = function (callback, thisArg) {
    const result = [];

    for (let i = 0; i < this.length; i++) {
        if (callback.call(thisArg, this[i], i, this)) {
            result.push(this[i]);
        }
    }

    return result;
};

const createDebounceFunction = (callback, timeout) => {
    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            callback.apply(this, args)
        }, timeout);
    };
};