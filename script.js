
// 1 страница Игра Угадайка - кнопка "Начать игру!"
document.getElementById('btnToGo').addEventListener('click', function () { // клик по кнопке "Начать игру!" => 2 страница Диапазон значений
    document.querySelector('.title-page').classList.add('hidden'); // игра Угадайка / скрывается
    document.querySelector('.value-range').classList.remove('hidden'); // диапазон значений / появляется
    document.querySelector('.valueRange').classList.remove('hidden'); // диапазон значений "Введите значение" / появляется
    document.querySelector('.form-inline').classList.remove('hidden'); // форма min-max / появляется
    document.querySelector('#btnToGo').classList.add('hidden'); // кнопка "Начать игру!" / скрывается
    document.querySelector('#btnResume').classList.remove('hidden'); // кнопка "Продолжить" / появляется
})

// 2 страница Диапазон значений - кнопка "Продолжить"
document.getElementById('btnResume').addEventListener('click', function () { // кнопка "Продолжить" => 3 страница Условия игры
    document.querySelector('.value-range').classList.add('hidden'); // диапазон значений / скрывается
    document.querySelector('.terms').classList.remove('hidden'); // условия / появляется
    document.querySelector('.valueRange').classList.add('hidden'); // диапазон значений "Текст" / скрывается
    document.querySelector('.form-inline').classList.add('hidden'); // форма min-max / форма появляется / скрывается
    document.querySelector('.guessNumber').classList.remove('hidden'); // "Загадайте любое целое число" / появляется
    document.querySelector('#btnResume').classList.add('hidden'); // кнопка "Продолжить" / скрывается
    document.querySelector('#btnPlay').classList.remove('hidden'); // кнопка "Играть" / появляется
    minValue = parseInt(document.querySelector('#formInputMin').value);
    maxValue = parseInt(document.querySelector('#formInputMax').value);
    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;
    if (maxValue < minValue) {
        [maxValue, minValue] = [minValue, maxValue]; // min-max меняются местами, если max < min.
    }
    if (Number.isNaN(maxValue) || Number.isNaN(minValue)) { // min-max по умолчанию, если другие значения не выбраны
        minValue = 0;
        maxValue = 100;
    }
    guessNumber.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
})

// 3 страница Условия игры - кнопка "Играть" 
// 4 страница Игра
document.getElementById('btnPlay').addEventListener('click', function () { // клик по кнопке "Играть" => 4 страница Игра
    document.querySelector('.terms').classList.add('hidden'); // условия / скрывается
    document.querySelector('.question').classList.remove('hidden'); // вопрос № / появляется 
    document.querySelector('.guessNumber').classList.add('hidden'); // "Загадайте любое целое число" / скрывается
    document.querySelector('.no-gutters').classList.remove('hidden'); // Вы загадали число / появляется 
    document.querySelector('#btnPlay').classList.add('hidden'); // кнопка "Играть" / скрывается
    document.querySelector('#btnLess').classList.remove('hidden'); // кнопка "меньше" / появляется
    document.querySelector('#btnEqual').classList.remove('hidden'); // кнопка "Верно!" / появляется 
    document.querySelector('#btnOver').classList.remove('hidden'); // кнопка "больше" / появляется
    document.querySelector('.btn-link').classList.remove('hidden'); // кнопка "Заново" / появляется

    let answerNumber  = Math.floor((minValue + maxValue) / 2); // середина диапазона
    let orderNumber = 1; // номер первого вопроса
    let gameRun = true;

    const orderNumberField = document.getElementById('orderNumberField'); //вопрос №_
    const answerField = document.getElementById('answerField');

    // переменные для преобразования числа в текстовую форму, если на его запись в текстовой форме требуется меньше 20 символов, включая пробелы.
    let units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    let teens = ['', 'десять', 'одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    let dozens = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    let hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

    // функция преобразования числа из цифр в слова (числа от -999 до 999)
    function numberToText() { 
        let number = Math.abs(answerNumber);
        let text = '';
        if (number == 0) {
            text = 'ноль';
            return text;
        }
        if (number <= 9) { // 0-9 / возвращает units
            return units[Math.floor(Math.abs(number) / 1)];
        }
        if (number > 9 && number < 20) { // 10-19 / возвращает teens
            return teens[Math.floor(number / 10 + number % 10)];
        }
        if (number >= 20 && number <= 99) { // 20-99 / возвращает dozens
            return dozens[(Math.floor(number / 10)) - 1] + " " + units[Math.floor(number % 10)];
        }
        if (number >= 100 && number <= 999) { // 100-999 / возвращает hundreds
            return hundreds[Math.floor(number / 100)] + " " + numberToTextHundreds();
        }
    }

    // функция вычисления остатка от сотого числа и преобразования его в числа из цифр в слова (числа от 0 до 99)
    function numberToTextHundreds() { 
        let unitsTeensDozens = Math.abs(answerNumber) % 100;
        if (unitsTeensDozens <= 9) { // число <= 9 / возвращает units
            return units[Math.floor(unitsTeensDozens / 1)];
        }
        if (unitsTeensDozens > 9 && unitsTeensDozens < 20) { // число 10-19 / возвращает teens
            return teens[(Math.floor(unitsTeensDozens / 10)) + (unitsTeensDozens % 10)];
        }
        if (unitsTeensDozens >= 20 && unitsTeensDozens <= 99) { // число 20-99 / возвращает dozens
            return dozens[(Math.floor(unitsTeensDozens / 10)) - 1] + " " + units[Math.floor(unitsTeensDozens % 10)];
        }
    }

    orderNumberField.innerText = orderNumber; // вопрос №1
    answerField.innerText = (numberToText().length < 20 && answerNumber >= 0) ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?`&& (numberToText().length < 20 && answerNumber < 0) ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;
    // вывод первого вопроса с предположительным результатом, написанным в текстовой или цифровой форме, в зависимости от текстовой длины числа и больше, меньше или равно это число нолю

    // кнопка "Меньше"
    document.getElementById('btnLess').addEventListener('click', function () { //кнопка "меньше"
        if (gameRun) {
            if (maxValue === minValue || minValue == answerNumber) {
                const phraseRandom = Math.round(Math.random() * 3); // рандомный выбор фразы, если число не угадано
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Вы загадали какое-то невероятное число?\n\u{1F928}`;
                        break;
                    case 1:     
                        answerPhrase = `Вы точно загадали число?\n\u{1F92D}`;
                        break;
                    case 2:
                        answerPhrase = `Вы забыли число, которое загадали?\n\u{1F644}`;
                        break;
                    case 3:     
                        answerPhrase = `Я сдаюсь!\n\u{1F47B}`;
                        break;       
                }   
                answerField.innerText = answerPhrase;
                gameRun = false;
            } else {
                maxValue = answerNumber  - 1;
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const phraseRandom = Math.round(Math.random() * 4); // рандомный выбор варианта вопроса
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Применим магический шар!\n\u{1F52E} Вы загадали `;
                        break;
                    case 1:
                        answerPhrase = `Очень интересно...\n\u{1F575} Это число `;
                        break;
                    case 2:
                        answerPhrase = `Сейчас точно угадаю!\n\u{1F4BB} Может это число `;
                        break;
                    case 3:
                        answerPhrase = `\n\u{1F4AD}Возможно, ваше число `;
                        break;
                    case 4:
                        answerPhrase = `Сим-салабим-ахалай-махалай!\n\u{1F9DA} Вы загадали `
                        break;    
                }
                answerField.innerText = (numberToText().length < 20 && answerNumber >= 0) ? answerPhrase + `${numberToText()}?` : answerPhrase + `${answerNumber}?` && (numberToText().length < 20 && answerNumber < 0) ? answerPhrase + `минус ${numberToText()}?` : answerPhrase + `${answerNumber}?`;
                // рандомный выбор вопроса с предположительным результатом, написанным в текстовой или цифровой форме, в зависимости от текстовой длины числа и больше, меньше или равно это число нолю
            }
        }      
    })

    // кнопка "Больше"
    document.getElementById('btnOver').addEventListener('click', function () { //кнопка "больше"
        if (gameRun){
            if (minValue === maxValue) {
                const phraseRandom = Math.round(Math.random() * 3); // рандомный выбор фразы, если число не угадано
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Вы загадали какое-то невероятное число?!\n\u{1F928}`;
                        break;
                    case 1:     
                        answerPhrase = `Вы точно загадали число?\n\u{1F92D}`;
                        break;
                    case 2:
                        answerPhrase = `Вы забыли число, которое загадали?\n\u{1F644}`;
                        break;
                    case 3:     
                        answerPhrase = `Я сдаюсь!\n\u{1F47B}`;
                        break;       
                }   
                answerField.innerText = answerPhrase;
                gameRun = false;
            } else {
                minValue = answerNumber  + 1;
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const phraseRandom = Math.round(Math.random() * 4); // рандомный выбор варианта вопроса
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Применим магический шар!\n\u{1F52E} Вы загадали `
                        break;
                    case 1:
                        answerPhrase = `Очень интересно...\n\u{1F575} Это число `
                        break;
                    case 2:
                        answerPhrase = `Сейчас точно угадаю!\n\u{1F4BB} Может это число `
                        break;
                    case 3:
                        answerPhrase = `\n\u{1F4AD}Возможно, ваше число `
                        break;
                    case 4:
                        answerPhrase = `Сим-салабим-ахалай-махалай!\n\u{1F9DA} Вы загадали `
                        break;
                }
                answerField.innerText = (numberToText().length < 20 && answerNumber >= 0) ? answerPhrase + `${numberToText()}?` : answerPhrase + `${answerNumber}?` && (numberToText().length < 20 && answerNumber < 0) ? answerPhrase + `минус ${numberToText()}?` : answerPhrase + `${answerNumber}?`;
                // рандомный выбор вопроса с предположительным результатом, написанным в текстовой или цифровой форме, в зависимости от текстовой длины числа и больше, меньше или равно это число нолю
            }
        }
    })
    
    // кнопка "Верно"
    document.getElementById('btnEqual').addEventListener('click', function () { //кнопка "Верно"
        if (gameRun) {
            const phraseRandom = Math.round(Math.random() * 3); // рандомный выбор фразы при клике на кнопку "Верно" при угадывании числа
            switch (phraseRandom) {
                case 0:
                    answerPhrase = `Этому я учился у лучших!\n\u{1F973}`
                    break;
                case 1:
                    answerPhrase = `Я супер сыщик!\n\u{1F929}`
                    break;
                case 2:
                    answerPhrase = `О, да! Я крут!\n\u{1F60E}`
                    break;
                case 3:
                    answerPhrase = `Ура! Я угадал!\n\u{1F920}`
                    break;
            }
            answerField.innerText = answerPhrase;
            gameRun = false;
        }
    })
})

// кнопка "Заново"
document.getElementById('btnRetry').addEventListener('click', function () { // клик по кнопке "Заново" => 2 страница Диапазон значений
    document.querySelector('.question').classList.add('hidden'); // вопрос № / скрывается
    document.querySelector('.value-range').classList.remove('hidden'); // диапазон значений / появляется
    document.querySelector('.no-gutters').classList.add('hidden'); // "Вы загадали число" / скрывается
    document.querySelector('.valueRange').classList.remove('hidden'); // диапазон значений "Текст" / появляется
    document.querySelector('.form-inline').classList.remove('hidden'); // форма Min-Max / появляется
    document.querySelector('#btnLess').classList.add('hidden'); // кнопка "меньше" / скрывается
    document.querySelector('#btnEqual').classList.add('hidden'); // кнопка "Верно!" / скрывается
    document.querySelector('#btnOver').classList.add('hidden'); // кнопка "больше" / скрывается
    document.querySelector('.btn-link').classList.add('hidden'); // кнопка "Заново" / скрывается
    document.querySelector('#btnResume').classList.remove('hidden'); // кнопка "Продолжить" / появляется
    document.querySelector('#formInputMin').value = '';
    document.querySelector('#formInputMax').value = '';
    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;
    if (maxValue < minValue) {
        [maxValue, minValue] = [minValue, maxValue]; // Значения меняются местами если max меньше min.
    }
    if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
        minValue = 0;
        maxValue = 100;
    } 
    guessNumber.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;

    // кнопка "Продолжить"
    document.getElementById('btnResume').addEventListener('click', function () { // кнопка "Продолжить" => 3 страница Условия игры
        document.querySelector('.value-range').classList.add('hidden'); // диапазон значений / скрывается
        document.querySelector('.terms').classList.remove('hidden'); // условия / появляется
        document.querySelector('.valueRange').classList.add('hidden'); // диапазон значений "Текст" / скрывается
        document.querySelector('.form-inline').classList.add('hidden'); // форма Min-Max / скрывается
        document.querySelector('.guessNumber').classList.remove('hidden'); // Загадайте любое целое число / появляется
        document.querySelector('#btnResume').classList.add('hidden'); // кнопка "Продолжить" / скрывается
        document.querySelector('#btnPlay').classList.remove('hidden'); // кнопка "Играть" / появляется
    })
})