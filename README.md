# Backend для сайта по воспитательной деятельности института

Этот проект представляет собой backend часть веб-приложения, разработанного для поддержки воспитательной деятельности института. Он написан на Node.js с использованием базы данных MongoDB.

## Установка

1. Убедитесь, что у вас установлен Node.js и MongoDB.
2. Клонируйте репозиторий: `git clone https://github.com/PavelBoikow/DiplomBoikov.git`
3. Перейдите в каталог проекта: `cd DiplomBoikov`
4. Установите зависимости: `npm install`
5. Создайте файл конфигурации `.env` и настройте его в соответствии с вашим окружением (см. пример `.env.example`).
6. Запустите сервер: `npm start`

## Использование

Этот backend предоставляет API для взаимодействия с клиентской частью веб-приложения. Он предоставляет ряд эндпоинтов для управления данными о воспитательной деятельности института, таких как создание, чтение, обновление и удаление записей.

## Эндпоинты

- `GET /auth/me` - получить информацию о пользователе
- `GET /posts` - получить информацию о всех постах
- `GET /tags` - получить информацию о 5 последних тэгах 
- `GET /posts/:id` - позволяет получить информацию о конкретном посте ориентируясь на его id
- `POST /auth/login` - позволяет авторизоваться на сайте
- `POST /auth/register` - позволяет зарегистрироваться на сайте
- `POST /upload` - позволяет загрузить изображение на сайт
- `POST /posts` - позволяет создать новую статью на сайте 
- `PATHE /posts/:id` - позволяет отредактировать статью на сайте
- `DELETE /posts/:id` - предназначен для удаления статей

Разширенную инфомацию можно получить на WiKi проекта


## Команды
`npm start` - команда отвечает за запуск Backend сервера проекта

`npm run start:dev` - команда нужна для разработки сайта, она перезапускает сервер после каждого сохранения файлов проекта.
