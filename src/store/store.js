import { createStore } from "redux";
import savedReducer from "../store/redux/reducers/savedReducer";

const store = createStore(savedReducer);

export default store;
