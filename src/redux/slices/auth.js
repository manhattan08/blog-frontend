import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios";

export const fetchAuth = createAsyncThunk('/auth/fetchAuth',async (params)=>{
  const { data } = await axios.post("/auth/login",params)
  return data;
})
export const fetchAuthMe = createAsyncThunk('/auth/fetchAuthMe',async ()=>{
  const { data } = await axios.get("/auth/me")
  return data;
})

export const fetchRegistration = createAsyncThunk('/auth/fetchRegistration',async (params)=>{
  const { data } = await axios.post("/auth/registration",params)
  return data;
})
export const fetchLogout = createAsyncThunk('/auth/fetchLogout',async (params)=>{
  const { data } = await axios.post("/auth/logout",params)
  return data;
})
export const fetchUpdate = createAsyncThunk('/auth/fetchUpdate',async (params)=>{
  const { data } = await axios.post("/auth/update",params)
  window.localStorage.setItem('token',data.accessToken);
  return data;
})

const initialState = {
  data:null,
  status:"loading"
};
const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    logout:(state)=>{
      state.data = null;
    }
  },
  extraReducers:{
    [fetchAuth.pending]:(state)=>{
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled]:(state,action)=>{
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuth.rejected]:(state)=>{
      state.status = "error";
      state.data = null;
    },
    [fetchAuthMe.pending]:(state)=>{
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled]:(state,action)=>{
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]:(state)=>{
      state.status = "error";
      state.data = null;
    },
    [fetchRegistration.pending]:(state)=>{
      state.status = "loading";
      state.data = null;
    },
    [fetchRegistration.fulfilled]:(state,action)=>{
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchRegistration.rejected]:(state)=>{
      state.status = "error";
      state.data = null;
    },
    [fetchLogout.pending]:(state)=>{
      state.status = "loading";
      state.data = null;
    },
    [fetchLogout.fulfilled]:(state,action)=>{
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchLogout.rejected]:(state)=>{
      state.status = "error";
      state.data = null;
    },
    [fetchUpdate.pending]:(state)=>{
      state.status = "loading";
    },
    [fetchUpdate.fulfilled]:(state,action)=>{
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchUpdate.rejected]:(state)=>{
      state.status = "error";
    },

  }
})

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const selectAvatar = (state) => {
  if(state.auth.data?.user){
    return String(state.auth.data?.user.avatarUrl);
  }
  else
    return String(state.auth.data?.avatarUrl);
}
export const selectUsername = (state) => {
  if(state.auth.data?.user){
    return String(state.auth.data?.user.username);
  }
  else
    return String(state.auth.data?.username);
}

export const selectIsActivated = (state) => {
  if(state.auth.data?.user){
    return Boolean(state.auth.data?.user.isActivated);
  }
  else
    return Boolean(state.auth.data?.isActivated);
}

export const selectIsAdmin = (state) => {
  if(state.auth.data?.user){
    return String(state.auth.data?.user.role);
  }
  else
    return String(state.auth.data?.role);
}

export const selectStatus = (state) => String(state.auth.status);


export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions
