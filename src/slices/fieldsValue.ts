import { createSlice } from "@reduxjs/toolkit";

interface StateAttr {
  id: string;
  name: string;
  val: string;
  color: string;
}

interface StateSlices {
  vaultValue: string[];
  selected: string[];
  error: null | string;
  isOpen: boolean;
  answer: StateAttr;
  event: any;
}

const initialState: StateSlices = {
  vaultValue: ["Alabama"],
  selected: [],
  isOpen: false,
  event: undefined,
  error: null,
  answer: {
    id: "CT",
    name: "Connecticut",
    val: "09",
    color: "#ddd",
  },
};

const slice = createSlice({
  name: "fieldsValue",
  initialState,
  reducers: {
    updateVaultValue: (state, action) => {
      const updatedObject = {
        ...state,
        vaultValue: action.payload,
      };
      return updatedObject;
    },
    updateSelected: (state, action) => {
      const updatedObject = {
        ...state,
        selected: action.payload,
      };
      return updatedObject;
    },
    updateHandleSelection: (state, action) => {
      const updatedObject = {
        ...state,
        handleSelection: action.payload,
      };
      return updatedObject;
    },
    updateIsOpenStatus: (state, action) => {
      const updatedObject = {
        ...state,
        isOpen: action.payload,
      };
      return updatedObject;
    },
    updateEvent: (state, action) => {
      const updatedObject = {
        ...state,
        event: action.payload,
      };
      return updatedObject;
    },
    updateAnswer: (state, action) => {
      const updatedObject = {
        ...state,
        answer: action.payload,
      };
      return updatedObject;
    },
    addSelected: (state, action) => {
      state.selected.push(action.payload);
    },
    removeSelected: (state, action) => {
      state.selected = state.selected.filter(
        (value) => value !== action.payload
      );
    },
  },
});

export const { reducer } = slice;

export const updateVaultValue = (x) => async (dispatch) => {
  dispatch(slice.actions.updateVaultValue(x));
};

export const updateHandleSelection = (x) => async (dispatch) => {
  dispatch(slice.actions.updateHandleSelection(x));
};

export const updateSelected = (x) => async (dispatch) => {
  dispatch(slice.actions.updateSelected(x));
};

export const updateIsOpenStatus = (x) => async (dispatch) => {
  dispatch(slice.actions.updateIsOpenStatus(x));
};

export const updateEvent = (x) => async (dispatch) => {
  dispatch(slice.actions.updateEvent(x));
};

export const updateAnswer = (x) => async (dispatch) => {
  dispatch(slice.actions.updateAnswer(x));
};

export const addSelected = (x) => async (dispatch) => {
  dispatch(slice.actions.addSelected(x));
};

export default slice;

// bugResolved: (bugs, action) => {
//   const index = bugs.findIndex((bug) => bug.id === action.payload.id);
//   bugs[index].resolved = true;
// },

// bugRemoved: (bugs, action) => {
//   const temp = bugs.filter((bug) => bug.id !== action.payload.id);
//   console.log(temp);
//   return temp;
// },
