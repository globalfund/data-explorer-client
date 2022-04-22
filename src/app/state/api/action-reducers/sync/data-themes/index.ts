/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";

export interface DataThemesStepSelectionsStateModel {
  step1: {
    dataset: string | null;
  };
  setStep1: Action<
    DataThemesStepSelectionsStateModel,
    {
      dataset: string | null;
    }
  >;
}

export const DataThemesStepSelectionsState: DataThemesStepSelectionsStateModel =
  {
    step1: {
      dataset: null,
    },
    setStep1: action(
      (
        state,
        payload: {
          dataset: string | null;
        }
      ) => {
        state.step1 = payload;
      }
    ),
  };
