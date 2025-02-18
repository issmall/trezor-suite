import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    AccountsRootState,
    selectAccountByKey,
    TransactionsRootState,
    selectPendingAccountAddresses,
    selectIsAccountUtxoBased,
    selectAccountNetworkSymbol,
    selectIsSelectedDeviceImported,
    confirmAddressOnDeviceThunk,
} from '@suite-common/wallet-core';
import { AccountKey } from '@suite-common/wallet-types';
import { getFirstFreshAddress } from '@suite-common/wallet-utils';
import { analytics, EventType } from '@suite-native/analytics';

export const useAccountReceiveAddress = (accountKey: AccountKey) => {
    const dispatch = useDispatch();
    const [isReceiveApproved, setIsReceiveApproved] = useState(false);
    const [isUnverifiedAddressRevealed, setIsUnverifiedAddressRevealed] = useState(false);

    const isPortfolioTracker = useSelector(selectIsSelectedDeviceImported);

    const account = useSelector((state: AccountsRootState) =>
        selectAccountByKey(state, accountKey),
    );
    const networkSymbol = useSelector((state: AccountsRootState) =>
        selectAccountNetworkSymbol(state, accountKey),
    );
    const pendingAddresses = useSelector((state: TransactionsRootState) =>
        selectPendingAccountAddresses(state, accountKey),
    );
    const isAccountUtxoBased = useSelector((state: AccountsRootState) =>
        selectIsAccountUtxoBased(state, accountKey),
    );

    const freshAddress = useMemo(() => {
        if (account) {
            return getFirstFreshAddress(account, [], pendingAddresses, isAccountUtxoBased);
        }
    }, [account, pendingAddresses, isAccountUtxoBased]);

    const verifyAddressOnDevice = useCallback(async () => {
        if (accountKey && freshAddress) {
            const { success } = await dispatch(
                confirmAddressOnDeviceThunk({ accountKey, addressPath: freshAddress.path }),
            ).unwrap();

            return success;
        }

        return false;
    }, [dispatch, accountKey, freshAddress]);

    const handleShowAddress = useCallback(async () => {
        if (isPortfolioTracker) {
            if (networkSymbol)
                analytics.report({
                    type: EventType.CreateReceiveAddressShowAddress,
                    payload: { assetSymbol: networkSymbol },
                });
        } else {
            setIsUnverifiedAddressRevealed(true);
            const wasVerificationSuccessful = await verifyAddressOnDevice();

            if (!wasVerificationSuccessful) {
                // TODO: handle the possibility that user declines on the trezor device
                // https://github.com/trezor/trezor-suite/issues/9776
                return;
            }
        }

        setIsReceiveApproved(true);
    }, [networkSymbol, isPortfolioTracker, verifyAddressOnDevice]);

    return {
        address: freshAddress?.address,
        isReceiveApproved,
        isUnverifiedAddressRevealed,
        handleShowAddress,
    };
};
