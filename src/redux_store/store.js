import {configureStore} from '@reduxjs/toolkit';
import {history_slice} from './history.js';
import {loading_slice} from './loading.js';

export const magic_store = configureStore({
  reducer: {
    history: history_slice,
    loading: loading_slice,
  },
});
