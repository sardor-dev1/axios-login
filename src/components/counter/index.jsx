import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { increment, decrement, reset } from "../../store/CounterSlice";

const index = ({ id }) => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);

  return (
    <>
      <div className="flex gap-2 justify-center flex-col">
        <div className="flex gap-3">
          <Button variant="outlined" onClick={() => dispatch(increment())}>
            +
          </Button>
          <p>{count}</p>
          <Button
            disabled={count < 1}
            variant="outlined"
            onClick={() => dispatch(decrement())}
          >
            -
          </Button>
        </div>
        <Button variant="outlined" onClick={() => dispatch(reset())}>
          reset
        </Button>
      </div>
    </>
  );
};

export default index;
