import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTableDomain = (state) => state.tableStates || initialState;

const makeSelectTable = () => createSelector(selectTableDomain, (substate) => substate);

export default makeSelectTable;
export { selectTableDomain };