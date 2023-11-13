import { AbstractMethod, MethodReturnType } from '../../../core/AbstractMethod';
import { validateParams } from '../../common/paramsValidator';
import { validatePath, fromHardened, getSerializedPath } from "../../../utils/pathUtils";
import { PROTO, ERRORS } from '../../../constants'
import { UI, createUiMessage } from "../../../events";

type Params = PROTO.TronGetAddress & {
    address?: string;
}

export default class TronGetAddress extends AbstractMethod<'tronGetAddress', Params[]> {
    hasBundle?: boolean;
    progress: number = 0;
    confirmed?: boolean;

    init() {
        this.requiredPermissions = ['read'];

        this.hasBundle = !!this.payload.bundle;
        const payload = !this.payload.bundle
            ? { ...this.payload, bundle: [this.payload] }
            : this.payload;

        validateParams(payload, [
            { name: 'bundle', type: 'array' },
            { name: 'useEventListener', type: 'boolean' },
        ]);

        this.params = payload.bundle.map(batch => {
            validateParams(batch, [
                { name: 'path', required: true },
                { name: 'address', type: 'string' },
                { name: 'showOnTrezor', type: 'boolean' },
            ]);

            const path = validatePath(batch.path, 3);

            return {
                address_n: path,
                show_display: typeof batch.showOnTrezor === 'boolean' ? batch.showOnTrezor : true,
                address: batch.address,
            };
        });

        const useEventListener =
            payload.useEventListener &&
            this.params.length === 1 &&
            typeof this.params[0].address === 'string' &&
            this.params[0].show_display;
        this.confirmed = useEventListener;
        this.useUi = !useEventListener;
    }

    get info() {
        if (this.params.length === 1) {
            return `Export Tron address fro account #${ fromHardened(this.params[0].address_n[2]) + 1}`;
        }
        return 'Export multiple Tron addresses';
    }

    getButtonRequestData(code: string) {
        if (code === 'ButtonRequest_Address') {
            return {
                type: 'address' as const,
                serializedPath: getSerializedPath(this.params[this.progress].address_n),
                address: this.params[this.progress].address || 'not-set',
            };
        }
    }

    async confirmation() {
        if (this.confirmed) return true;

        await this.getPopupPromise().promise;
        const uiPromise = this.createUiPromise(UI.RECEIVE_CONFIRMATION);

        this.postMessage(
            createUiMessage(UI.REQUEST_CONFIRMATION, {
                view: 'export-address',
                label: this.info,
            }),
        );

        const uiResp = await uiPromise.promise;
        this.confirmed = uiResp.payload;
        return this.confirmed;
    }

    async noBackupConfirmation() {
        await this.getPopupPromise().promise;

        const uiPromise = this.createUiPromise(UI.RECEIVE_CONFIRMATION);

        this.postMessage(
            createUiMessage(UI.REQUEST_CONFIRMATION, {
                view: 'no-backup',
            }),
        );

        const uiResp = await uiPromise.promise;
        return uiResp.payload;
    }

    async _call({ address_n, show_display }: Params) {
        const cmd = this.device.getCommands();
        const response = await cmd.typedCall('TronGetAddress', 'TronAddress', {
            address_n,
            show_display,
        });
        return response.message;
    }

    async run() {
        const responses: MethodReturnType<typeof this.name> = [];

        for (let i = 0; i < this.params.length; i++) {
            const batch = this.params[i];
            if (batch.show_display) {
                const silent =  await this._call({
                    ...batch,
                    show_display: false,
                });
                if (typeof batch.address === 'string') {
                    if (batch.address !== silent.address) {
                        throw ERRORS.TypedError('Method_AddressNotMatch');
                    }
                } else {
                    batch.address = silent.address;
                }
            }
            const response = await this._call(batch);
            responses.push({
                path: batch.address_n,
                serializedPath: getSerializedPath(batch.address_n),
                address: typeof response.address === 'undefined' ? '' : response.address,
            });

            if (this.hasBundle) {
                this.postMessage(
                    createUiMessage(UI.BUNDLE_PROGRESS, {
                        progress: i,
                        response,
                    }),
                );
            }
            this.progress++;
        }
        return this.hasBundle ? responses : responses[0];
    }
}
