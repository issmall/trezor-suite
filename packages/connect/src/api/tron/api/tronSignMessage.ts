import { AbstractMethod } from "../../../core/AbstractMethod";
import { validateParams } from '../../common/paramsValidator';
import type { PROTO } from '../../../constants';
import {validatePath} from "../../../utils/pathUtils";
import {messageToHex} from "../../../utils/formatUtils";

type Params = PROTO.TronSignMessage;

export default class TronSignMessage extends AbstractMethod<'tronSignMessage', Params> {
    init() {
        this.requiredPermissions = ['read', 'write'];

        const { payload } = this;

        validateParams(payload, [
            { name: 'path', required: true },
            { name: 'message', type: 'string', required: true },
        ]);

        const path = validatePath(payload.path, 3);
        const messageHex = messageToHex(payload.message);

        this.params = {
            address_n: path,
            message: messageHex,
        };
    }

    get info() {
        return 'Sign message';
    }

    async run() {
        const cmd = this.device.getCommands();
        const { address_n, message } = this.params;

        const response = await cmd.typedCall('TronSignMessage', 'TronMessageSignature', {
            address_n,
            message,
        });
        return response.message;
    }
}
