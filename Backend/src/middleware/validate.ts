import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';


export const validateBody = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = schema.parse(req.body);
        req.body = parsed;
        next();
    } catch (err) {
        return res.status(400).json({ error: 'Validation error', details: (err as any).errors || err });
    }
};