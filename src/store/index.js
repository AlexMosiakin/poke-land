import { createStore, combineReducers } from "redux";
import { PokeReducer } from "./pokeReducer";

const rootReducer = combineReducers({
    id: PokeReducer,
})

export const store = createStore(rootReducer)

