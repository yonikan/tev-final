import { Request, Response } from 'express';
import { LOGIN_DATA } from '../data/login.data';

export function getLoginData(req: Request, res: Response) {
    res.status(200).json({ payload: LOGIN_DATA });
}

export function getForgotPassword(req: Request, res: Response) {
    res.status(200).json({ payload: 'test' });
}

export function getResetPassword(req: Request, res: Response) {
    res.status(200).json({ payload: 'test'  });
}