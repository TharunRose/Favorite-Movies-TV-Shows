export type Movie = {
    id: number;
    title: string;
    type: 'Movie' | 'TV Show';
    director?: string;
    budget?: string;
    location?: string;
    duration?: string;
    yearOrTime?: string;
    details?: string;
    createdAt?: string;
    updatedAt?: string;
};


export type PaginatedResponse = {
    items: Movie[];
    meta: { total: number; page: number; limit: number; hasMore: boolean };
};