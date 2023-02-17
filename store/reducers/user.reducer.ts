import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserById } from "../../services/user-service";
import { UserActionTypes } from "../actions/user.actions";
import { IUserState } from "../interfaces/user.interface";

const initialUserState: IUserState = {
	authenticated: false,
	currentUser: null,
	userLoader: false
};

export const getUser = createAsyncThunk(UserActionTypes.GetUser, async (payload: any) => {
	return await getUserById(payload.userId);
});

// user reducer with createSlice
export const userReducer = createSlice({
	name: "users",
	initialState: { ...initialUserState },
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getUser.pending, (state, action) => {
				state.userLoader = true;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.currentUser = action.payload;
				state.authenticated = false;
				state.userLoader = true;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.currentUser = null;
				state.authenticated = false;
				state.userLoader = false;
			});
	}
});

export default userReducer.reducer;
