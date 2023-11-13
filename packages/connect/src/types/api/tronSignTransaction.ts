import type { PROTO } from '../../constants';
import type { Params, Response } from "../params";
import type { TronSignTransaction } from "./tron";

export declare function tronSignTransaction(
    params: Params<TronSignTransaction>,
): Response<PROTO.TronSignedTx>;
