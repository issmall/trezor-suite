// origin: https://github.com/trezor/connect/blob/develop/src/js/core/methods/EthereumSignMessage.js

import { AbstractMethod } from '../../../core/AbstractMethod';
import { validateParams, getFirmwareRange } from '../../common/paramsValidator';
import { getSlip44ByPath, validatePath } from '../../../utils/pathUtils';
import { getEthereumNetwork } from '../../../data/coinInfo';
import { getNetworkLabel } from '../../../utils/ethereumUtils';
import { messageToHex } from '../../../utils/formatUtils';
import type { PROTO } from '../../../constants';
import { getEthereumDefinitions } from '../ethereumDefinitions';
import type { EthereumNetworkInfo } from '../../../types';
import type { EthereumDefinitions } from '@trezor/protobuf/lib/messages';

type Params = PROTO.EthereumSignMessage & {
    network?: EthereumNetworkInfo;
    definitions?: EthereumDefinitions;
};

export default class EthereumSignMessage extends AbstractMethod<'ethereumSignMessage', Params> {
    init() {
        this.requiredPermissions = ['read', 'write'];

        const { payload } = this;

        // validate incoming parameters
        validateParams(payload, [
            { name: 'path', required: true },
            { name: 'message', type: 'string', required: true },
            { name: 'hex', type: 'boolean' },
        ]);

        const path = validatePath(payload.path, 3);
        const network = getEthereumNetwork(path);
        this.firmwareRange = getFirmwareRange(this.name, network, this.firmwareRange);

        const messageHex = payload.hex
            ? messageToHex(payload.message)
            : Buffer.from(payload.message, 'utf8').toString('hex');
        this.params = {
            address_n: path,
            message: messageHex,
        };
    }

    async initAsync() {
        if (this.params.network) return;

        const { address_n } = this.params;
        const slip44 = getSlip44ByPath(address_n);
        this.params.definitions = await getEthereumDefinitions({
            slip44,
        });
    }

    get info() {
        return getNetworkLabel('Sign #NETWORK message', getEthereumNetwork(this.params.address_n));
    }

    async run() {
        const cmd = this.device.getCommands();
        const { address_n, message } = this.params;

        const response = await cmd.typedCall('EthereumSignMessage', 'EthereumMessageSignature', {
            encoded_network: this.params.definitions?.encoded_network,
            address_n,
            message,
        });
        return response.message;
    }
}
