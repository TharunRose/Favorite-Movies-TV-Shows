import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AppDataSource } from '../ds';
import { Movie } from '../entity/Movie';
import { Repository } from 'typeorm';


const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);


// Create
export const createMovie = asyncHandler(async (req: Request, res: Response) => {
    const payload = req.body as Partial<Movie>;
    const movie = movieRepo.create(payload);
    const saved = await movieRepo.save(movie);
    res.status(201).json(saved);
});


// Read list with pagination for infinite scroll
export const listMovies = asyncHandler(async (req: Request, res: Response) => {
    const limit = Math.min(Number(req.query.limit ?? 20), 100);
    const page = Math.max(Number(req.query.page ?? 1), 1);
    const skip = (page - 1) * limit;
    const [items, total] = await movieRepo.findAndCount({
        order: { createdAt: 'DESC' },
        take: limit,
        skip
    });


    res.json({ items, meta: { total, page, limit, hasMore: skip + items.length < total } });
});


// Read single
export const getMovie = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const movie = await movieRepo.findOneBy({ id });
    if (!movie) return res.status(404).json({ error: 'Not found' });
    res.json(movie);
});


// Update
export const updateMovie = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const movie = await movieRepo.findOneBy({ id });
    if (!movie) return res.status(404).json({ error: 'Not found' });
    movieRepo.merge(movie, req.body);
    const saved = await movieRepo.save(movie);
    res.json(saved);
});


// Delete
export const deleteMovie = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const movie = await movieRepo.findOneBy({ id });
    if (!movie) return res.status(404).json({ error: 'Not found' });
    await movieRepo.remove(movie);
    res.json({ success: true });
});