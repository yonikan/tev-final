import { Request, Response } from 'express';
import { TEAMS_DATA } from '../data/teams.data';

export function getTeamsData(req: Request, res: Response) {
    res.status(200).json({ payload: TEAMS_DATA });
}