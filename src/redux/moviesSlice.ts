import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MovieResults } from '../models/movie.model';
import Config from 'react-native-config';

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
export const fetchMovies = createAsyncThunk('movies/fetchProtected', async (language: string) => {
    const token = Config.TOKEN;
  try {
    const response = await axios.get(Config.API_URL?.replace('$1', language), {
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
