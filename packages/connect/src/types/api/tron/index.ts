import type { DerivationPath } from "../../params";

export interface TronSignMessage {
    path: DerivationPath;
    message: string;
}

export interface TronTransferContract {
    to_address?: string;
    amount?: number;
    owner_address?: string;
}

export interface TronTriggerSmartContract {
    contract_address?: string;
    call_value?: number;
    data?: string;
    call_token_value?: number;
    asset_id?: number;
    owner_address?: string;
}

export interface TronContract {
    transfer_contract?: TronTransferContract;
    trigger_smart_contract?: TronTriggerSmartContract;
}

export interface TronSignTransaction {
    path: DerivationPath;
    transaction: {
        ref_block_bytes: string;
        ref_block_hash: string;
        expiration: number;
        data?: string;
        contract: TronContract,
        timestamp: number;
        fee_limit?: number;
    },
}
