import { useSelector } from "react-redux";
import { getTotalInMonth, getTypesInMonth } from "../selectors";

export const useTotalInMonth =()=>useSelector(state=>getTotalInMonth(state));
export const useTypesInMonth =()=>useSelector(state=>getTypesInMonth(state))
