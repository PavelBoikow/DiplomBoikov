import { body } from "express-validator";

export const registerValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пороль должен быть минимум 5 символов').isLength({min: 3}),
    body('fullName', 'Укажите имя').isLength({min: 2}),
];

export const loginValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пороль должен быть минимум 5 символов').isLength({min: 3}),
];

export const postCreateValidator = [
    body('title', 'Введите заголовок статьи').isLength({min: 3}).isString(),
    body('text', 'Введите текст статьи').isLength({min: 3}).isString(),
    body('tags', 'Неверный формат тэгов (Укажите массив)').optional().isArray(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];