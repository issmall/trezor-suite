export const TYPES = {
    bitcoin: 'Bitcoin',
    ethereum: 'Ethereum',
    eos: 'Eos',
    nem: 'NEM',
    stellar: 'Stellar',
    cardano: 'Cardano',
    ripple: 'Ripple',
    tezos: 'Tezos',
    binance: 'Binance',
    tron: 'Tron',
} as const;

export type NetworkType = keyof typeof TYPES;

export const MODULES = [
    'binance',
    'cardano',
    'eos',
    'ethereum',
    'nem',
    'ripple',
    'stellar',
    'tezos',
    'tron',
] as const;

export type ModuleName = (typeof MODULES)[number];
