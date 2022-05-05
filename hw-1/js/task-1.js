const ERROR_MESSAGE = 'Некорректный ввод!';
const firstValue = +prompt('Введите первое число');
const secondValue = +prompt('Введите второе число');

if (isNaN(firstValue) || isNaN(secondValue)) {
    console.log(ERROR_MESSAGE);
} else {
    console.log(Number(firstValue).toString(secondValue));
}