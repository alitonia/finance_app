import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const MAX_HISTORY_SIZE = 500;

type spendingBlob = {
  id: number,
  category: string,
  name: string,
  amount: number,
  date?: Date
}

type historySliceType = {
  raw_history: Array<spendingBlob>,
  spending_categories: Array<string>,
  spending_by_time: {
    [string]: { value: number }
  },
  budget: { [string]: number },
}

const default_categories = [
  'meal',
  'snack',
  'entertainment',
  'travel',
  'personal consumable',
  'study',
];
const spendingHeaders = [
  'this_week',
  'this_month',
  'this_year',
  'last_7_days',
  'last_30_days',
];

const initialSpendingByTime = spendingHeaders.reduce(
    (prev, current) => Object.assign(prev,
        {[current]: {value: 0}}),
    {},
);

const initialState: historySliceType = {
  raw_history: [],
  spending_categories: default_categories,
  spending_by_time: initialSpendingByTime,
  budget: {},
};

const historySlice = createSlice({
  name: 'history',
  initialState: initialState,
  reducers: {
    addCategory(state: historySliceType, action: PayloadAction<string>) {
      state.spending_categories.push(action.payload);
    },
    removeCategory(state: historySliceType, action: PayloadAction<string>) {
      state.spending_categories =
          state.spending_categories.filter(
              category => category !== action.payload,
          );
    },
    setSpendingByTime(
        state: historySliceType,
        action: PayloadAction<{ type: string, value: number }>,
    ) {
      state.spending_by_time[action.payload.type] = {
        value: action.payload.value,
      };
    },
    setBudget(state: historySliceType, action: PayloadAction<{ type: string, value: number }>) {
      state.budget[action.payload.type] = action.payload.value;
    },
    addSpending(state: historySliceType, action: PayloadAction<spendingBlob>) {
      state.spending_categories.push(action.payload.category);
      if (state.raw_history.length > MAX_HISTORY_SIZE) {
        state.raw_history =
            state.raw_history.slice(
                state.raw_history.length - MAX_HISTORY_SIZE,
                state.raw_history.length,
            );
      }
      state.raw_history.push(
          Object.assign(
              {date: new Date(Date.now())},
              action.payload),
      );
      spendingHeaders.forEach(
          header => state.spending_by_time[header] += action.payload.amount,
      );
    },

  },
});

export const {
               addCategory,
               addSpending,
               removeCategory,
               setBudget,
               setSpendingByTime,
             } = historySlice.actions;
export const history_slice = historySlice.reducer;
