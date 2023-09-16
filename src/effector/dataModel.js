import { createStore, createEffect } from "effector";
import { getCats } from "../api";

const $catsData = createStore([])

const fetchCatData = createEffect(getCats);

$catsData.on(
  fetchCatData.doneData,
  (state, cats) => cats
);

export const dataModel = {
  $catsData,
  fetchCatData
}