import { NextFunction, Request, Response } from 'express';
import { JWT_SECRET } from '../tools/config';
import jwt from 'jsonwebtoken';
import axiosBase from './axiosBase';

export default async (req: Request, res: Response, next: NextFunction) => {
	const AUTH_TOKEN = req.headers.authorization;
	if (!AUTH_TOKEN) {
		req.user = undefined;
		return next();
	}
	try {
		const decoded = jwt.verify(AUTH_TOKEN, JWT_SECRET);
		axiosBase.defaults.headers.common['userid'] = decoded.userId;
		console.log(decoded);
		req.user = decoded;
	} catch (e) {
		req.user = undefined;
	}
	finally {
		next();
	}

};
