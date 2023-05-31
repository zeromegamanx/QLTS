import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the res0201 state domain
 */

const selectLoginPage = state => state.LoginForm || initialState;

/**
 * Other specific selectors
 */

const makeSelectLoginForm = () =>
  createSelector(
    selectLoginPage,
    substate => substate,
  );

export default makeSelectLoginForm;
export { selectLoginPage };
