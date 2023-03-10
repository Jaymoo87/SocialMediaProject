import * as api from "../api/index.js";
import { AUTH } from "../constants/actionTypes";

export const signin = (formData, nav) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, nav) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
  } catch (error) {
    console.log(error);
  }
};
