import { AppDataSource } from './ds';
import { Movie } from './entity/Movie';


async function seed() {
    await AppDataSource.initialize();
    const repo = AppDataSource.getRepository(Movie);


    const examples: Partial<Movie>[] = [
        {
            title: 'Inception',
            type: 'Movie',
            director: 'Christopher Nolan',
            budget: '$160M',
            location: 'LA, Paris',
            duration: '148 min',
            yearOrTime: '2010'
        },
        {
            title: 'Breaking Bad',
            type: 'TV Show',
            director: 'Vince Gilligan',
            budget: '$3M/ep',
            location: 'Albuquerque',
            duration: '49 min/ep',
            yearOrTime: '2008-2013'
        }
    ];


    for (const e of examples) {
        const m = repo.create(e);
        await repo.save(m);
    }


    console.log('Seed complete');
    process.exit(0);
}


seed().catch((e) => console.error(e));