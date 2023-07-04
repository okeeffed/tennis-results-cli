module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  // Support same @ -> src alias mapping as tsconfig defines
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
