import { Request, Response } from 'express';
import { TEAM_EVENTS_DATA } from '../data/team-events.data';

export function getTeamEventsData(req: Request, res: Response) {
    res.status(200).json({ payload: TEAM_EVENTS_DATA });
}