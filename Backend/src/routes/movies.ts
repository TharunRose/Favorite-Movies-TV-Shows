import { Router } from 'express';
import { createMovie, listMovies, getMovie, updateMovie, deleteMovie } from '../controllers/moviesController';
import { validateBody } from '../middleware/validate';
import { movieCreateSchema, movieUpdateSchema } from '../validators/movieSchemas';


const router = Router();


router.get('/getList', listMovies);
router.post('/post', validateBody(movieCreateSchema), createMovie);
router.get('/getMovie/:id', getMovie);
router.put('/update/:id', validateBody(movieUpdateSchema), updateMovie);
router.delete('/delete/:id', deleteMovie);


export default router;