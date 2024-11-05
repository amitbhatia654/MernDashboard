import { useDispatch } from "react-redux";
import { remove } from "../reduxStore/UserSlice";

export default function Customers() {
  const dispatch = useDispatch();
  const RemoveReducer = () => {
    dispatch(remove());
  };
  return (
    <div>
      This is customer page
      {/* <button onClick={() => ADDReducer()}>Add to redux</button> */}
      <button onClick={() => RemoveReducer()}>Remove to redux</button>
    </div>
  );
}
