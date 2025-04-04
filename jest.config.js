// module.exports = {
//   preset: 'ts-jest',
  // transform: {
  //   '^.+\\.(ts|tsx)?$': 'ts-jest',
  //   '^.+\\.(js|jsx)$': 'babel-jest',
  // }
// };
// transformIgnorePatterns: ["/node_modules/(?!(vest|@hookform/resolvers))"],

export default {
  // transformIgnorePatterns: ["/node_modules/(?!(vest|@hookform/resolvers))"],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-node',
   transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  }
};