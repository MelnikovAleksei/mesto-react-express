# Проектная работа REST API для проекта ["Mesto"](https://github.com/MelnikovAleksei/mesto-react)

## Создана в рамках учебы в [Яндекс.Практикум](https://praktikum.yandex.ru/) на курсе ["Веб-разработчик"](https://praktikum.yandex.ru/web/).

## Описание:

REST API для проектной работы ["Mesto"](https://github.com/MelnikovAleksei/mesto-react), связанное с базой данных MongoDB. При запуске приложения оно подключается к серверу mongo по адресу: `mongodb://localhost:27017/mestodb`.
В приложении описана схема пользователя и схема карточки. Некоторые поля схем проверяются регулярным выражением. 

"Mesto" - это интерактивная страница, где пользователи могут делиться фотографиями. Она создана в рамках прохождения 4-11 спринтов курса. 

* Ссылка на [репозиторий с версией проектной работы на Pure JS](https://github.com/MelnikovAleksei/mesto); 
* Ссылка на [репозиторий с версией проектной работы на Reactjs](https://github.com/MelnikovAleksei/mesto-react); 

[Проектная работа "Mesto-Reactjs" на GitHub Pages](https://melnikovaleksei.github.io/mesto-react/index.html) 

## Функционал:

### Роуты для пользователей: 

* GET /users - возвращает всех пользователей; 
* GET /users/:userId - возвращает пользователя по переданному _id; 
* POST /users - создает пользователя с переданными в теле запроса name, about и avatar;

### Роуты для карточек:

* GET /cards - возвращает все карточки из базы данных; 
* POST /cards - создаёт карточку с переданными в теле запроса name и link. *owner проставляется посредством временного мидлвэра (добавляет в каждый запрос объект user)*; 
* DELETE /cards/:cardId - удаляет карточку по переданному _id; 

## Технологии:

* expressjs
* API REST 
* MongoDB 
* RegExp 

## Инструкция по установке:

Клонировать репозиторий:

* `git clone https://github.com/MelnikovAleksei/express-mesto.git`

В директории проекта запустить приложение в режиме разработки:

* `npm install` - устанавливает зависимости; 
* `npm run dev` - запускает сервер; 
* `npm run start` - запускает сервер с hot-reload;

## Будущая доработка проекта будет включать в себя создание роутов:

* PATCH /users/me - обновляет профиль; 
* PATCH /users/me/avatar - обновляет аватар; 
* PUT /cards/:cardId/likes - поставить лайк карточке; 
* DELETE /cards/:cardId/likes - убрать лайк с карточки; 

## Языки:

* JavaScript
* RegExp 

## Библиотеки:

* expressjs

## База данных: 

* MongoDB (сопоставитель Mongoose)

## Чеклисты проектной работы:

* [Чеклист 1](https://code.s3.yandex.net/web-developer/checklists/new-program/checklist-12/index.html) 
* [Чеклист 2](https://code.s3.yandex.net/web-developer/checklists/new-program/checklist-13/index.html) 
