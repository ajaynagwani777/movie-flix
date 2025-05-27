import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MovieResults } from '../models/movie.model';

interface MoviesState {
  data: MovieResults | [] | undefined;
  loading: boolean;
  error: string | undefined | null;
}

const initialState: MoviesState = {
  data: [],
  loading: false,
  error: null,
};
export const fetchMovies = createAsyncThunk('movies/fetchProtected', async () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2RiZjA1ZWNiMzE1NjljNDE1YzhiNmE0NzRlMjNkNCIsIm5iZiI6MTc0ODI4NDgzMC42MTYsInN1YiI6IjY4MzRiNTllZjE0Zjc0MDZhNTgzODJlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PEpNumKaJyqGJALpj30CXtXPUkwy8xWz-zWQGFFIpHE';
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
    headers: {
        Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
} catch (err: any) {
    return err.response?.data || 'Fetch failed';
  }
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default moviesSlice.reducer;
