import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Movie } from '../types';
import { fetchMovies, createMovie, updateMovie, deleteMovie } from '../services/api';

interface MovieContextType {
    movies: Movie[];
    hasMore: boolean;
    loading: boolean;
    loadMore: () => Promise<void>;
    addMovie: (data: Partial<Movie>) => Promise<void>;
    editMovie: (id: number, data: Partial<Movie>) => Promise<void>;
    removeMovie: (id: number) => Promise<void>;
    refresh: () => Promise<void>;
}

const MovieContext = createContext<MovieContextType | null>(null);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    // Load movies from API
    const loadMore = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const res = await fetchMovies(page, 20);
            setMovies((prev) => {
                const existingIds = new Set(prev.map((m) => m.id));
                const newItems = res.items.filter((m: any) => !existingIds.has(m.id));
                return [...prev, ...newItems];
            });
            setPage(res.meta.page + 1);
            setHasMore(res.meta.hasMore);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const refresh = async () => {
        setPage(1);
        setMovies([]);
        setHasMore(true);
        await loadMore();
    };

    const addMovie = async (data: Partial<Movie>) => {
        await createMovie(data);
        await refresh();
    };

    const editMovie = async (id: number, data: Partial<Movie>) => {
        await updateMovie(id, data);
        await refresh();
    };

    const removeMovie = async (id: number) => {
        await deleteMovie(id);
        setMovies((prev) => prev.filter((m) => m.id !== id));
    };

    // Initial load
    useEffect(() => {
        loadMore();
    }, []);

    return (
        <MovieContext.Provider
            value={{
                movies,
                hasMore,
                loading,
                loadMore,
                addMovie,
                editMovie,
                removeMovie,
                refresh,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};

export const useMovies = () => {
    const ctx = useContext(MovieContext);
    if (!ctx) throw new Error('useMovies must be used inside MovieProvider');
    return ctx;
};
