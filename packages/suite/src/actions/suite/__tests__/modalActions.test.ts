import * as modalActions from '../modalActions';
import { MODAL } from '../constants';

jest.mock('@trezor/connect', () => ({
    __esModule: true, // this property makes it work
    default: {
        blockchainSetCustomBackend: () => {},
        uiResponse: () => {},
    },
    UI: {
        RECEIVE_PIN: 'ui-receive_pin',
        RECEIVE_PASSPHRASE: 'ui-receive_passphrase',
        RECEIVE_CONFIRMATION: 'ui-receive_confirmation',
    },
    DEVICE: {
        CONNECT: 'device-connect',
    },
    PROTO: {
        AmountUnit: {
            Bitcoin: 'BTC',
        },
    },
    DeviceModelInternal: {
        T2T1: 'T2T1',
    },
}));

describe('Modal Actions', () => {
    it('cancel actions', () => {
        const expectedAction = {
            type: MODAL.CLOSE,
        };
        expect(modalActions.onCancel()).toEqual(expectedAction);
    });
});
