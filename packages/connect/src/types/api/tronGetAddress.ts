import type { GetAddress, Address, Params, BundledParams, Response } from "../params";

export declare function tronGetAddress(params: Params<GetAddress>): Response<Address>;
export declare function tronGetAddress(params: BundledParams<GetAddress>): Response<Address[]>
