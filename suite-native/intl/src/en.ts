// Few rules:
// 1. Never use dynamic keys IDs for example: translate(`module.graph.coin.${symbol}`) instead map it to static key: { btc: translate('module.graph.coin.btc') }
// 2. Don't split string because of formatting or nested components use Rich Text Formatting instead https://formatjs.io/docs/react-intl/components#rich-text-formatting
// 3. Always wrap keys per module/screen/feature for example: module.graph.legend

export const en = {
    generic: {
        header: '<green>Trezor Suite</green> <grey>Lite</grey>',
        buttons: {
            back: 'Back',
            confirm: 'Confirm',
            continue: 'Continue',
            next: 'Next',
        },
        unknownError: 'Something went wrong',
    },
    moduleHome: {
        graph: {
            title: 'My portfolio balance',
        },
        emptyState: {
            device: {
                title: "We haven't discovered any coins in your wallet.",
                subtitle: 'Get started by receiving coins',
            },
            portfolioTracker: {
                title: 'Get started',
                subtitle: 'Sync your coin addresses and view your portfolio balance.',
                primaryButton: 'Sync my coins',
                secondaryButton: 'Settings',
                alert: 'This requires your Trezor hardware wallet and access to Trezor Suite.',
            },
            connectOrImportCrossroads: {
                gotMyTrezor: {
                    title: "I've got my Trezor",
                    description: 'Connect to manage your assets',
                    connectButton: 'Connect Trezor',
                },
                syncCoins: {
                    title: 'Sync coins without your Trezor',
                    description:
                        "Track your favorite coins anytime, anywhere, even when your Trezor isn't connected.",
                    syncButton: 'Sync my coins',
                },
            },
        },
        biometricsModal: {
            title: {
                faceId: 'Enable Face Id',
                fingerprint: 'Enable fingerprint',
                touchId: 'Enable Touch Id',
                unknown: 'Enable biometrics',
            },
            description: 'Use biometricts verification \nto unlock the app.',
            button: {
                later: 'I’ll do that later in Settings',
                enable: 'Enable',
            },
            resultMsg: {
                error: 'Unable to enable biometrics',
                success: 'Biometrics enabled',
            },
        },
    },
    assets: {
        dashboard: {
            viewAllAssets: 'View all assets',
            discoveryProgress: { loading: 'Loading...', stillWorking: 'Still working...' },
        },
    },
    moduleAccountImport: {
        title: 'Sync my coins',
    },
    moduleConnectDevice: {
        connectAndUnlockScreen: {
            title: 'Connect & unlock your Trezor',
        },
        pinScreen: {
            form: {
                title: 'Enter PIN',
                entered: 'Entered',
                digits: 'digits',
                keypadInfo: 'The keypad is displayed on your Trezor',
                enterPin: 'Enter pin',
            },
            wrongPinModal: {
                title: 'Entered wrong PIN',
                description: 'Enter up to 50 digits.',
                button: 'Try again',
            },
        },
        connectingDeviceScreen: {
            title: 'Connecting',
            hodlOn: 'Hodl on tight',
        },
        helpModal: {
            title: 'Connecting Trezor',
            subtitle: "Don't see your Trezor?",
            stepsTitle: 'Follow these steps:',
            step1: '1. Use a different USB data cable.',
            step2: '2. Use a different USB port.',
            step3: '3. Use a different device.',
        },
    },
    moduleDevice: {
        noSeedModal: {
            title: 'No seed on device.',
            description: 'Please set your device in desktop app first.',
            button: 'Got it',
        },
        unacquiredDeviceModal: {
            title: 'We found your connected device in incorrect state.',
            description: 'Please reconnect your device or ...',
            button: 'Steal session',
        },
    },
    moduleReceive: {
        screenTitle: '{coinSymbol} Receive address',
        accountNotFound: 'Account {accountKey} not found.',
        receiveAddressCard: {
            unverifiedWarning: {
                title: 'receive address',
                content:
                    'For an extra layer of security, use Trezor Suite with your Trezor hardware wallet to verify the receive address',
            },
            deviceHint: {
                description:
                    'The receive address shown above should match the one on your Trezor device.',
                doesNotMatchButton: "Address doesn't match?",
            },
            showAddress: {
                button: 'Show address',
                learnMore: 'Learn more about verifying addresses',
            },
        },
    },
    moduleSettings: {
        faq: {
            title: 'Get help',
            supportCard: {
                title: 'Need more help?',
                contact: 'Contact support',
            },
        },
        localizations: {
            title: 'Localization',
        },
        customization: {
            title: 'Customization',
        },
        aboutUs: {
            title: 'About Trezor Suite Lite',
        },
        privacyAndSecurity: {
            title: 'Privacy & Security',
        },
    },
    moduleOnboarding: {
        welcomeScreen: {
            welcome: 'Welcome to ',
            subtitle: 'Securely track, manage & receive crypto on the go ',
            trezorLink: 'Don’t have a Trezor? <trezorLink>Get one here.</trezorLink>',

            nextButton: 'Get started',
        },
        connectTrezorScreen: {
            title: 'Connect',
            subtitle:
                'Manage your portfolio with your Trezor hardware wallet connected directly to your mobile device.',
        },
        featureReceiveScreen: {
            noUsb: {
                title: 'Receive coins',
                subtitle: 'Generate addresses and QR codes to receive crypto on the go.',
            },
            usb: {
                title: 'Receive',
                subtitle:
                    'Generate and verify addresses directly on your Trezor to get paid and receive crypto on the go.',
            },
        },
        trackBalancesScreen: {
            noUsb: {
                title: 'Track balances',
                subtitle:
                    'Easily sync your coin addresses and keep up with the crypto on your hardware wallet without exposing your private data.',
            },
            usb: {
                title: 'Track balances',
                subtitle:
                    'Keep up with your favorite coins even without your Trezor connected. Simply sync and track your crypto from anywhere.',
            },
        },
        analyticsConsentScreen: {
            title: 'Help us help you',
            subtitle:
                'We’re all about making the best, most user-friendly app for you. You can help us achieve this.',
            bulletPoints: {
                privacy: {
                    title: 'Your data is safe',
                    description:
                        "Rest assured, we're all about respecting your privacy — no sensitive stuff like your balances, transactions, or profile specifics.",
                },
                dataCollection: {
                    title: 'What we collect',
                    description:
                        'We gather info on app performance, user interaction, and technical issues to create a better user experience for you.',
                },
            },
            helpSwitchTitle: 'Help us anonymously',
            learnMore: 'Learn more about our <securityLink>security protocols</securityLink>',
        },
    },
    moduleAccounts: {
        accountDetail: {
            accountLabelBadge: 'Run on {accountLabel}',
        },
    },
    transactions: {
        phishing: {
            badge: 'Caution!',
            warning:
                "Caution! This transaction may be a scam. If you’re unsure, don't engage. <blogLink>Read more</blogLink>",
        },
    },
    deviceManager: {
        deviceButtons: {
            eject: 'Eject',
            deviceInfo: 'Device info',
        },
        deviceList: {
            sectionTitle: 'Open',
        },
        connectDevice: {
            sectionTitle: 'Connect Trezor device',
            connectButton: 'Connect',
        },
    },
    qrCode: {
        addressCopied: 'Address copied',
        copyButton: 'Copy',
        shareButton: 'Share',
    },
};

export type Translations = typeof en;
