import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface loadingState {
  isLoading: boolean,
  loadingVectors: Array<string>,
  displayLoading: boolean,
  loadingType: string,
  startTime: { [string]: Date },
}

const initialState: loadingState = {
  isLoading: false,
  loadingVectors: [],
  displayLoading: true,
  loadingType: 'spinner',
  startTime: {},
};

// note: Currently support one loading per name
// You shouldn't have 2 loading instances with the same name
const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialState,
  reducers: {
    addLoadingVector(state, payloadAction: PayloadAction<string>) {
      if (state.loadingVectors.indexOf(payloadAction.payload) === -1) {
        state.loadingVectors.push(payloadAction.payload);
        state.isLoading = true;
        state.startTime[payloadAction.payload] = new Date(Date.now());
      }
    },
    removeLoadingVector(state, payloadAction: PayloadAction<string>) {
      const remove_item_index = state.loadingVectors.indexOf(payloadAction.payload);
      if (remove_item_index !== -1) {
        state.loadingVectors.splice(remove_item_index, 1);
        delete state.startTime[payloadAction.payload];
      }
      if (state.loadingVectors.length === 0) {
        state.isLoading = false;
      }
    },

    setDisplayLoading(state, payloadAction: PayloadAction<boolean>) {
      state.displayLoading = payloadAction.payload;
    },

    setLoadingType(state, payloadAction: PayloadAction<string>) {
      state.loadingType = payloadAction.payload;
    },

    refreshLoading(state) {
      state = initialState;
    },
  },
});

export const {
               addLoadingVector,
               removeLoadingVector,
               setDisplayLoading,
               setLoadingType,
               refreshLoading,
             } = loadingSlice.actions;

export const loading_slice = loadingSlice.reducer;
