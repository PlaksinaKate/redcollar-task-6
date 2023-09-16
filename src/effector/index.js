import { createStore, createEffect } from "effector";
import { getCats } from "../api";

export const fetchCatData = createEffect(getCats);

export const $catsData = createStore([]).on(
  fetchCatData.doneData,
  (state, cats) => cats
);