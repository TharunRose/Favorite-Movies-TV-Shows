import axios from 'axios'
import type { PaginatedResponse, Movie } from '../types'

const API_BASE = 'http://localhost:4000/api';

const axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' }
});


export const fetchMovies = (page = 1, limit = 20) =>
    axiosInstance.get<PaginatedResponse>(`/movies/getList?page=${page}&limit=${limit}`).then((r) => r.data);


export const fetchMovieById = (id: number) => axiosInstance.get<Movie>(`/movies/getMovie/${id}`).then((r) => r.data);
export const createMovie = (payload: Partial<Movie>) => axiosInstance.post<Movie>('/movies/post', payload).then((r) => r.data);
export const updateMovie = (id: number, payload: Partial<Movie>) => axiosInstance.put<Movie>(`/movies/update/${id}`, payload).then((r) => r.data);
export const deleteMovie = (id: number) => axiosInstance.delete(`/movies/delete/${id}`).then((r) => r.data);

