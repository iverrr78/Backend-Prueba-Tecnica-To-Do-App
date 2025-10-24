import joi from 'joi';

const id = joi.number().integer();
const username = joi.string();
const email = joi.string().email();
const completed = joi.boolean();
const password = joi.string().min(6);
const title = joi.string().min(1);
const description = joi.string().min(1);

const registerSchema = joi.object({
    username: username.required(),
    email: email.required(),
    password: password.required()
});

const loginSchema = joi.object({
    email: email.required(),
    password: password.required()
});
const createTaskSchema = joi.object({
    title: title.required(),
    description: description.required()
});

const singleid = id;

export {registerSchema, loginSchema, createTaskSchema, singleid};