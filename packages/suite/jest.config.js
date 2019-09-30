module.exports = {
    roots: ['./src'],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
            // to speed up prototyping, this is how to disable ts in tests
            // diagnostics: false,
        },
    },
    setupFiles: ['<rootDir>/src/support/tests/setupJest.ts'],
    moduleNameMapper: {
        '^@suite/(.+)': '<rootDir>/src/$1',
        '^@(.+)-views/(.+)': '<rootDir>/src/views/$1/$2',
        '^@(.+)-views': '<rootDir>/src/views/$1/index',
        '^@(.+)-components/(.+)': '<rootDir>/src/components/$1/$2',
        '^@(.+)-components': '<rootDir>/src/components/$1/index',
        '^@(.+)-actions/(.+)': '<rootDir>/src/actions/$1/$2',
        '^@(.+)-actions': '<rootDir>/src/actions/$1/index',
        '^@(.+)-reducers/(.+)': '<rootDir>/src/reducers/$1/$2',
        '^@(.+)-reducers': '<rootDir>/src/reducers/$1/index',
        '^@(.+)-config/(.+)': '<rootDir>/src/config/$1/$2',
        '^@(.+)-config': '<rootDir>/src/config/$1/index',
        '^@(.+)-constants/(.+)': '<rootDir>/src/constants/$1/$2',
        '^@(.+)-constants': '<rootDir>/src/constants/$1/index',
        '^@(.+)-support/(.+)': '<rootDir>/src/support/$1/$2',
        '^@(.+)-support': '<rootDir>/src/support/$1/index',
        '^@(.+)-utils/(.+)': '<rootDir>/src/utils/$1/$2',
        '^@(.+)-utils': '<rootDir>/src/utils/$1/index',
        '^@(.+)-types/(.+)': '<rootDir>/src/types/$1/$2',
        '^@(.+)-types': '<rootDir>/src/types/$1/index',
        '^@(.+)-middlewares/(.+)': '<rootDir>/src/middlewares/$1/$2',
        '^@(.+)-middlewares': '<rootDir>/src/middlewares/$1/index',
    },
    moduleFileExtensions: ['js', 'ts'],
    coverageDirectory: './coverage',
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/reducers/**',
        '<rootDir>/src/utils/**',
        '<rootDir>/src/actions/**',
        '<rootDir>/src/middlewares/**',
        '!**/constants/**',
        '!**/constants/**',
        '!**/__tests__/**',
        // TODO REMOVE THIS
        '!<rootDir>/src/reducers/wallet/sendFormReducer.ts',
        '!<rootDir>/src/reducers/wallet/feesReducer.ts',
        '!<rootDir>/src/actions/wallet/sendFormActions.ts',
        '!<rootDir>/src/actions/wallet/sendFormSpecific/**',
    ],
    coverageThreshold: {
        global: {
            statements: 66.33,
            branches: 65.49,
            functions: 66.61,
            lines: 66.82,
        },
    },
    modulePathIgnorePatterns: [
        'node_modules',
        '<rootDir>/src/utils/suite/hooks',
        '<rootDir>/src/utils/suite/dom',
        '<rootDir>/src/utils/wallet/promiseUtils',
    ],
    testMatch: ['**/*.test.(ts|js)'],
    transform: {
        '^.+\\.(ts)$': 'ts-jest',
    },
    preset: 'ts-jest',
    verbose: false,
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};