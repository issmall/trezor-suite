import type { PROTO } from '../../../constants';
import {AbstractMethod} from "../../../core/AbstractMethod";
import {validateParams} from "../../common/paramsValidator";
import {validatePath} from "../../../utils/pathUtils";


export default class TronSignTransaction extends AbstractMethod<'tronSignTransaction', PROTO.TronSignTx> {
    init() {
        this.requiredPermissions = ['read', 'write'];

        const { payload } = this;
        validateParams(payload, [
            { name: 'path', required: true },
            { name: 'transaction', required: true },
        ]);

        const path = validatePath(payload.path, 3);
        const { ref_block_bytes, ref_block_hash, expiration, data, contract, timestamp, fee_limit } = payload.transaction;

        this.params = {
            address_n: path,
            ref_block_bytes,
            ref_block_hash,
            expiration,
            data,
            contract,
            timestamp,
            fee_limit,
        };
    }

    get info() {
        return 'Sign Tron Transaction';
    }

    async run() {
        const cmd = this.device.getCommands();
        const response = await cmd.typedCall('TronSignTx', 'TronSignedTx', this.params);
        return response.message;
    }
}
