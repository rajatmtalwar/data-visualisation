import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import analyticsAPI from "./analyticsAPI";

const initialState = {
  value: 0,
  status: "idle",
  tables: [],
  treeNodeStatus: {},
  selectedColumns: {},
  selectedRows: {},
  globalDrag: false,
};

export const fetchTables = createAsyncThunk(
  "analytics/fetchTables",
  async () => {
    const response = await analyticsAPI.fetchTables();
    return response.data;
  }
);

export const analyticsSlice = createSlice({
  name: "analytics",
  initialState,

  reducers: {
    toggleTableNode: (state, action) => {
      const nodeId = action.payload;
      state.treeNodeStatus[nodeId] = !state.treeNodeStatus[nodeId];
    },
    addSelectedColumn: (state, action) => {
      const column = action.payload;
      state.selectedColumns[column.id] = column;
    },
    removeSelectedColumn: (state, action) => {
      const columnId = action.payload;
      delete state.selectedColumns[columnId];
    },
    addSelectedRow: (state, action) => {
      const row = action.payload;
      state.selectedRows[row.id] = row;
    },
    removeSelectedRow: (state, action) => {
      const rowId = action.payload;
      delete state.selectedRows[rowId];
    },
    setGlobalDrag: (state, action) => {
      state.globalDrag = action.payload;
    },
  },
  extraReducers: {
    [fetchTables.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchTables.fulfilled]: (state, action) => {
      state.status = "idle";
      state.tables = action.payload;
    },
  },
});

export const {
  toggleTableNode,
  addSelectedColumn,
  setGlobalDrag,
  addSelectedRow,
  removeSelectedColumn,
  removeSelectedRow,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
