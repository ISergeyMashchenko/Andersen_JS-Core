const ERROR_MESSAGE = 'Некорректный ввод!';

function isValid(num) {
    if (isNaN(num)) {
        throw TypeError(ERROR_MESSAGE);
    }
}

const firstValue = +prompt('Введите первое число');
isValid(firstValue);

const secondValue = +prompt('Введите второе число');
isValid(secondValue);

console.log(
    `Ответ: ${firstValue + secondValue}, ${firstValue / secondValue}`
);