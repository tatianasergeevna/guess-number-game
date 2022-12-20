# guess-number-game 
# Игра "Угадайка"

Требуется написать игру, в которой компьютер угадывает задуманное пользователем число.

Компьютер определяет число по алгоритму бинарного поиска, 
при этом сравнение числа с искомым и запуск итераций поиска выполняет пользователь.

Пользователь вводит минимум (от -999) и максимум (до 999). При вводе максимума или 
минимума больше 999 или меньше -999 изменяется число на ближайшую границу, используя 
тернарный оператор. Например, 1500 на 999, а -75000 на -999.

При вводе текста, который не может быть интерпретирован как число __(NaN)__ присваивать 
значения по умолчанию (min=0, max=100), используя короткий цикл операций дизъюнкции.

Число выводится в текстовой форме, если на его запись в текстовой форме требуется 
меньше 20 символов, включая пробелы. Отрицательные числа записываются так же как и 
положительные, только со словом «минус». Например, вопрос выглядит не «Вы загадали 
число 22?», а «Вы загадали число двадцать два?».

Вопросы с предположительным результатом отображаются в пяти вариантах. 
Фразы, если число угадано, и фразы, если число не угадано, отображаются в четырех вариантах. 
В вопросы и фразы добавлены эмоджи.

## Используемые технологии

* HTML

* CSS

* JavaScript