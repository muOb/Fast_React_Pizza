import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

//async funtion  cannot just call it directly inside a Redux reducer
//becasue Redux is by nature completely synchronous so we need a thunks
//thunk is a middleware that sits between the dispatching and reducer
//so it will do something to the dispatched action before updating the store
/*
createAsyncThunk will basically produce three additional action types
so one for depending promise state,one for the fulfilled state,
and one for the rejected state


*/
//fetchAddress will actually become the action creator function
//that we will later call in or code so we export it
// and the async fun is a payload for the reducer
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();

    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    //Payload of the fulfilled state
    return { position, address };
  },
);

const initialState = {
  username: "",
  status: "idle",
  position: "",
  address: "",
  error: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  //this is just the way redux toolkit works
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error =
          "There was a problem getting your address.Make sure to fill this field!";
      }),
});
export const { updateName } = userSlice.actions;
export default userSlice.reducer;
