import productyReducers from "./productReducers";
import customerReducers from "./userReducer";

const { combineReducers } = require("redux");
const { default: categoryReducers } = require("./categoryReducers");

const rootReducer=combineReducers({
    category:categoryReducers,
    product:productyReducers,
    user:customerReducers
})

export default rootReducer;