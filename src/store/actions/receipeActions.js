import {
  LOGIN_USER,
  SET_LOADING,
  ERROR,
  GET_RECEIPES,
  SEARCH,
  CLEAR_SEARCH,
} from "../constants/types";
import db, { auth } from "../../firebase";

//login user
export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await auth.signInWithEmailAndPassword(email, password);
    const uid = auth.currentUser.uid;
    dispatch({
      type: LOGIN_USER,
      payload: uid ? true : false,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err.message,
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export const addRecipe = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const doc = await db.collection("receipes").doc(Date.now().toString());
    await doc.set(data);
    console.log("Document added sucessfully!!");
  } catch (error) {
    dispatch({
      type: ERROR,
    });
  } finally {
    dispatch(setLoading(false));
  }
};

//get receipes
export const getReceipes = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = [];
    db.collection("receipes")
      .orderBy("likes", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        dispatch({
          type: GET_RECEIPES,
          payload: data,
        });
      });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message,
    });
  } finally {
    dispatch(setLoading(false));
  }
};

//serach receipe
export const searchText = (text) => async (dispatch) => {
  dispatch({
    type: CLEAR_SEARCH,
  });
  if (!text) return;
  dispatch({
    type: SEARCH,
    payload: text,
  });
};

//update data
export const updateData = (id, data) => async (dispatch) => {
  const doc = await db.collection("receipes").doc(id);
  await doc.update(data);
};
//delete data
export const deleteReceipe = (id) => async (dispatch) => {
  const doc = await db.collection("receipes").doc(id);
  await doc.delete();
  dispatch(getReceipes());
};

//set Loading
export const setLoading = (loading) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: loading,
  });
};
