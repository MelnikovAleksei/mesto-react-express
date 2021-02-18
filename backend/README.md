# Проектная работа REST API для проекта ["Mesto"](https://github.com/MelnikovAleksei/react-mesto-api-full/tree/main/frontend)

## Создана в рамках учебы в [Яндекс.Практикум](https://praktikum.yandex.ru/) на курсе ["Веб-разработчик"](https://praktikum.yandex.ru/web/).

## Описание

REST API для проектной работы ["Mesto"](https://github.com/MelnikovAleksei/react-mesto-api-full/tree/main/frontend). "Mesto" - это интерактивная страница, где пользователи могут делиться фотографиями. Она создана в рамках прохождения 4-11, 14 спринтов курса. 

* Ссылка на [репозиторий с версией проектной работы на Pure JS](https://github.com/MelnikovAleksei/mesto); 
* Ссылка на [репозиторий с версией проектной работы на Reactjs](https://github.com/MelnikovAleksei/react-mesto-api-full/tree/main/frontend); 

[Деплой фронтенда](https://melnikov.students.nomoredomains.icu) 

## Схемы и модели ресурсов API

### Поля схемы `user`:

Поле | Описание
-----|------------
email | Почта пользователя, по которой он регистрируется. Обязательное поле, уникальное для каждого пользователя. Валидируется на соответствие схеме элекстронной почты.
password | Хеш пароля. Обязательное поле-строка. База данных не возвращает это поле.
name | Имя пользователя. Поле-строка от 2 до 30 символов. Если при создании пользователя эти поля не были указаны, то им присвоятся стандартные значения.
about | Информация о пользователе. Поле-строка от 2 до 30 символов. Если при создании пользователя эти поля не были указаны, то им присвоятся стандартные значения.
avatar | Ссылка на аватар пользователя, поле-строка, URL-адрес. Если при создании пользователя эти поля не были указаны, то им присвоятся стандартные значения.

### Поля схемы `movie`:

Поле | Описание
-----|------------
name | имя карточки, строка от 2 до 30 символов, обязательное поле.
link | ссылка на картинку, строка, обязательно поле. Для проверки данных используйте регулярное выражение из предыдущей схемы.
owner | ссылка на модель автора карточки, тип ObjectId, обязательное поле.
likes |  список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле default).
createdAt |  дата создания, тип Date, значение по умолчанию Date.now.

## Методы и роуты

Метод | Роут | Описание
----- |------|---------
GET | `/users` | возвращает всех пользователей
PUT | `/users/:userId` | возвращает пользователя по переданному **_id**
POST | `/users` | создает пользователя с переданными в теле запроса **name**, **about** и **avatar**
GET | `/cards` | возвращает все карточки из базы данных
POST | `/cards` | создаёт карточку с переданными в теле запроса **name** и **link**
DELETE | `/cards/:cardId` | удаляет карточку по переданному **_id**
POST | `/signin` | проверяет переданные в `body` **email** и **password** и возвращает **JWT**
POST | `/signup` | создает пользователя с передаными в `body` **email**, **password**, **name**, **about**, **avatar**
PATCH | `/users/me` | обновляет профиль  с переданными в `body` **email** и **имя**
PATCH | `/users/me/avatar` | обновляет аватар с переданными в `body` **avatar**
PUT | `/cards/:cardId/likes` | поставить лайк карточке
DELETE | `/cards/:cardId/likes` | убрать лайк с карточки

## Используемые технологии 

* Expressjs
* nodemon
* MongoDB
* mongoose
* dotenv
* cors
* celebrate
* bcryptjs
* winston
* express-winston
* jsonwebtoken
* validator
* eslint

## Инструкция по установке:

Клонировать репозиторий:

* `git clone https://github.com/MelnikovAleksei/react-mesto-api-full.git`

В директории **/backend** установить зависимости и запустить приложение в режиме разработки:

* `npm install` - устанавливает зависимости; 
* `npm run dev` - запускает сервер в режиме разработки;

## Чеклисты проектной работы:

* [Чеклист 1](https://code.s3.yandex.net/web-developer/checklists/new-program/checklist-12/index.html) 
* [Чеклист 2](https://code.s3.yandex.net/web-developer/checklists/new-program/checklist-13/index.html) 
* [Чеклист 3](https://code.s3.yandex.net/web-developer/checklists/new-program/checklist-15/index.html)
