/* eslint-disable no-console */
import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

import { ReactNativeUsbModule } from './ReactNativeUsbModule';
import { NativeDevice, OnConnectEvent, WebUSBDevice } from './ReactNativeUsb.types';

const DEBUG_LOGS = true;

const debugLog = (...args: any[]) => {
    if (DEBUG_LOGS) {
        console.log(...args);
    }
};

const emitter = new EventEmitter(ReactNativeUsbModule ?? NativeModulesProxy.ReactNativeUsb);

const open = (deviceName: string) => ReactNativeUsbModule.open(deviceName);

const close = (deviceName: string) => ReactNativeUsbModule.close(deviceName);

const claimInterface = (deviceName: string, interfaceNumber: number) =>
    ReactNativeUsbModule.claimInterface(deviceName, interfaceNumber);

const releaseInterface = (deviceName: string, interfaceNumber: number) =>
    ReactNativeUsbModule.releaseInterface(deviceName, interfaceNumber);

const selectConfiguration = (deviceName: string, configurationValue: number) =>
    ReactNativeUsbModule.selectConfiguration(deviceName, configurationValue);

const transferIn = async (deviceName: string, endpointNumber: number, length: number) => {
    const perf = performance.now();
    const data = await ReactNativeUsbModule.transferIn(deviceName, endpointNumber, length)
        .catch((error: any) => {
            debugLog('JS: USB read error: ', error);
            throw error;
        })
        .then((result: number[]) => {
            debugLog('JS: Native USB read result:', JSON.stringify(result));

            return {
                data: new Uint8Array(result),
                status: 'ok',
            };
        });
    debugLog('JS: USB read time', performance.now() - perf);

    return data;
};

const transferOut = async (
    deviceName: string,
    endpointNumber: number,
    data: Uint8Array | BufferSource,
) => {
    try {
        const perf = performance.now();
        await ReactNativeUsbModule.transferOut(deviceName, endpointNumber, data.toString());
        debugLog('JS: USB write time', performance.now() - perf);
        return { status: 'ok' };
    } catch (error) {
        debugLog('JS: USB write error', error);
        throw error;
    }
};

// eslint-disable-next-line require-await
const createNoop = (methodName: string) => async () => {
    debugLog(`Calling ${methodName} which is not implemented.`);
};

const createWebUSBDevice = (device: NativeDevice): WebUSBDevice => ({
    ...device,
    open: () => open(device.deviceName),
    close: () => close(device.deviceName),
    forget: createNoop('forget'),
    selectConfiguration: (configurationValue: number) =>
        selectConfiguration(device.deviceName, configurationValue),
    claimInterface: (interfaceNumber: number) => claimInterface(device.deviceName, interfaceNumber),
    releaseInterface: (interfaceNumber: number) =>
        releaseInterface(device.deviceName, interfaceNumber),
    selectAlternateInterface: createNoop('selectAlternateInterface'),
    controlTransferIn: createNoop('controlTransferIn'),
    controlTransferOut: createNoop('controlTransferOut'),
    clearHalt: createNoop('clearHalt'),
    transferIn: (endpointNumber: number, length: number) =>
        transferIn(device.deviceName, endpointNumber, length),
    transferOut: (endpointNumber: number, data: BufferSource) =>
        transferOut(device.deviceName, endpointNumber, data),
    isochronousTransferIn: createNoop('isochronousTransferIn'),
    isochronousTransferOut: createNoop('isochronousTransferOut'),
    reset: createNoop('reset'),

    // TODO: Implement these properties, very low priority we are not using them anywhere
    usbVersionMajor: 2,
    usbVersionMinor: 0,
    usbVersionSubminor: 0,
    deviceVersionMajor: 1,
    deviceVersionMinor: 0,
    deviceVersionSubminor: 0,
    configurations: [],
});

export function onDeviceConnected(listener: (event: OnConnectEvent) => void): Subscription {
    return emitter.addListener<NativeDevice>('onDeviceConnect', event => {
        const eventPayload = {
            device: createWebUSBDevice(event as NativeDevice),
        };
        debugLog('JS: USB onDeviceConnect', eventPayload);
        return listener(eventPayload as any);
    });
}

export function onDeviceDisconnect(listener: (event: OnConnectEvent) => void): Subscription {
    return emitter.addListener<NativeDevice>('onDeviceDisconnect', event => {
        const eventPayload = {
            device: createWebUSBDevice(event as NativeDevice),
        };
        debugLog('JS: USB onDeviceDisconnect', eventPayload);
        return listener(eventPayload as any);
    });
}

export async function getDevices(): Promise<any> {
    const devices = await ReactNativeUsbModule.getDevices();
    return devices.map((device: NativeDevice) => createWebUSBDevice(device));
}

export class WebUSB {
    public getDevices = getDevices;

    set onconnect(listener: (event: OnConnectEvent) => void) {
        onDeviceConnected(listener);
    }
    set ondisconnect(listener: (event: OnConnectEvent) => void) {
        onDeviceDisconnect(listener);
    }

    // TODO: implement these commented out properties, because they are part of WebUSB specs, but very low priority we are not using them anywhere
    requestDevice = async (..._params: any[]): Promise<any> => {};
    addEventListener = (..._params: any[]): any => {};
    removeEventListener = (..._params: any[]): any => {};
    dispatchEvent = (..._params: any[]): any => {};
}
