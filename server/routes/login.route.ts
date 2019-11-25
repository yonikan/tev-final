import { Request, Response } from 'express';
import { LOGIN_DATA } from '../data/login.data';

export function postLoginData(req: Request, res: Response) {
    const userPost = {
        email: req.body.email,
        password: req.body.password
    };        
    res.status(201).json({ payload: LOGIN_DATA });
    // res.status(404).json(
    //     {
    //         errorMessageId: '321',
    //         errorMessage: 'user not found',
    //         errorExtraValues: {}
    //     }
    // );
}

export function postForgotPassword(req: Request, res: Response) {
    const userPost = {
        email: req.body.email
    };
    res.status(201).json({ payload: 'test forgot pass' });
    // res.status(404).json(
    //     {
    //         errorMessageId: '321',
    //         errorMessage: 'user not found',
    //         errorExtraValues: {}
    //     }
    // );
}

export function putResetPassword(req: Request, res: Response) {
    const userPut = {
        password: req.body.password,
        repeatedPassword: req.body.repeatedPassword
    };
    res.status(200).json({ payload: 'test reset pass' });
    // res.status(412).json(
    //     {
    //         errorMessageId: '321',
    //         errorMessage: 'same as old',
    //         errorExtraValues: {}
    //     }
    // );
}