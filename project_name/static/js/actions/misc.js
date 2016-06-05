import { DISMISS_AUTH_STATUS } from '../constants';

export function dismissAuthStatus() {
  return {
    type: DISMISS_AUTH_STATUS,
  };
}
