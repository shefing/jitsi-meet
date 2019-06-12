// @flow

import { ReducerRegistry } from '../base/redux';

const logger = require('jitsi-meet-logger').getLogger(__filename);

const DEFAULT_STATE = {
    /**
     * The indicator which determines whether (the) {@code CalleeInfo} is
     * visible.
     *
     * @type {boolean|undefined}
     */
    calleeInfoVisible: false,
    inviteDialogVisible: false,
    numbersEnabled: true,
    pendingInviteRequests: []
};

ReducerRegistry.register('features/invite', (state = DEFAULT_STATE) => {

    return state;
});
