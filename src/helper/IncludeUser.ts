import { NextFunction, Request, Response } from 'express';
import { JWT_SECRET } from '../tools/config';
import jwt from 'jsonwebtoken';
import axiosBase from './axiosBase';

export default async (req: Request, res: Response, next: NextFunction) => {

	try {
		const AUTH_TOKEN = req.headers.authorization;
		console.log(AUTH_TOKEN, 1);
		if (!AUTH_TOKEN) {
			req.user = undefined;
			return next();
		}
		console.log(AUTH_TOKEN, 1);
		const decoded = jwt.verify(AUTH_TOKEN, JWT_SECRET);
		axiosBase.defaults.headers.common['userid'] = decoded.userId;
		console.log(decoded, "decoded");
		req.user = decoded;
		return next();
	} catch (e) {
		console.log(e);
		req.user = undefined;
		return next();
	}

};
