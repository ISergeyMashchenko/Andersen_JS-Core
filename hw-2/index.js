const obj = {
    number: 1,
    string: 'smth',
    array: [1, 2, 3]
};

const makeObjectDeepCopy = (obj) => {
    const clonedObject = {};

    if (!obj) {
        return obj;
    }

    if (typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        const clonedArray = [];
        obj.forEach(e => {
            clonedArray.push(makeObjectDeepCopy(e));
        });
        return clonedArray;
    }

    Object.keys(obj).forEach((key) => {
        clonedObject[key] = makeObjectDeepCopy(obj[key]);
    });

    return clonedObject;
};

makeObjectDeepCopy(obj);

const isValid = (num) => {
    if (typeof num !== 'number') {
        throw new Error('Неверный ввод!');
    }
};

const checkArrayValidity = (array) => {
    if (!Array.isArray(array)) {
        throw new Error("Это не масив!");
    }

    array.forEach((num) => {
        isValid(num);
    });
};

const getValues = (array, firstInterval, secondInterval) => {
    return array.filter((value) => {
        if (value <= secondInterval && value >= firstInterval) {
            return true;
        }
    });
};

const selectFromInterval = (array, firstInterval, secondInterval) => {
    try {
        checkArrayValidity(array);
        isValid(firstInterval);
        isValid(secondInterval);

        if (firstInterval > secondInterval) {
            return getValues(array, secondInterval, firstInterval);
        }

        return getValues(array, firstInterval, secondInterval);
    } catch (err) {
        console.log(err.message);
    }
};

selectFromInterval([1, 3, 5], 5, 2)

const isLess = (from, to) => {
    if (from > to) {
        throw new Error('Неверный ввод!');
    }
};

const myIterable = {
    from: 1,
    to: 4
};

myIterable[Symbol.iterator] = function () {
    isValid(this.from);
    isValid(this.to);
    isLess(this.from, this.to);

    return {
        current: this.from,
        last: this.to,

        next() {
            if (this.current <= this.last) {
                return { done: false, value: this.current++ };
            } else {
                return { done: true };
            }
        }
    };
};

for (let item of myIterable) {
    console.log(item);
}   