import type { PROTO } from '../../constants';
import type { Params, Response } from "../params";
import type { TronSignMessage } from "./tron";

export declare function tronSignMessage(
    params: Params<TronSignMessage>,
): Response<PROTO.MessageSignature>
