import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['./setupTests.ts'],
	moduleDirectories: ['node_modules', 'src'],
	moduleNameMapper: {
		'\\.(css|scss)$': 'identity-obj-proxy',
	},
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
	},
};

export default config;
