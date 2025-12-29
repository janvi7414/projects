import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pasteArr: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : []
}

const normalize = (str) => (str ?? "") .trim().toLowerCase();

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    // In Redux, a reducer is a pure function that decides how the state changes in response to an action.
    addToPastesArr: (state, action) => {
      const paste = action.payload;

    //to check if title already exits and when updated it should not think it as duplicate
      const titleIndex = state.pasteArr.findIndex((item) => normalize(item.title) === normalize(paste.title)  && item._id !== paste._id);

      if(titleIndex >= 0){
        toast.error("Title already exists");
        return ;
      }

      state.pasteArr.push(paste);

      localStorage.setItem("pastes" , JSON.stringify(state.pasteArr));
      toast.success("Paste Created Sucessfully");

    },

    updateToPastesArr: (state, action) => {
      const paste = action.payload;
      const index = state.pasteArr.findIndex((item) => item._id === paste._id);

      // index -1 not found >=0 found

      if(index >=0){
        //paste exits and can be updated
        state.pasteArr[index] = paste;

        localStorage.setItem("pastes", JSON.stringify(state.pasteArr));

        toast.success("Paste Updated");
      }
    },

    resetPastesArr: (state, action) => {
     //set the arr to empty
     state.pasteArr = [];

     localStorage.removeItem("pastes");
    },

    removeFromPasteArr: (state, action) => {
      const pasteId = action.payload;

      console.log(pasteId);
      const index = state.pasteArr.findIndex((item) => item._id === pasteId);

      if(index >= 0){
          state.pasteArr.splice(index, 1);

          localStorage.setItem("pastes", JSON.stringify(state.pasteArr));

          toast.success("Paste Deleted");
      }
    }
  },
})

export const { addToPastesArr, updateToPastesArr, resetPastesArr, removeFromPasteArr } = pasteSlice.actions

export default pasteSlice.reducer

/**
 localStorage.getItem("pastes") attempts to read the value stored in the browser’s local storage under the key "pastes".

The ternary operator checks whether that value is truthy. If it is truthy:

JSON.parse(localStorage.getItem("pastes")) is executed, converting the stored JSON string back into a JavaScript value (typically an array or object).

If there is no value (i.e. getItem returned null) the expression falls back to an empty array [].

Result: initialState.pastes becomes either the previously saved array of pastes or an empty array if nothing was saved before.

here "pasteArr" is an array or a state property that stores a list of items in the app

Why this is commonly used

Persistence across reloads: localStorage survives page reloads and browser restarts. Using it for initialState allows the app to remember user data (here — pastes) between visits without a backend.

Better UX: Users don’t lose their data when they refresh or close the tab.

Simple persistence: It’s a zero-dependency, client-side mechanism that’s easy to implement.
 */