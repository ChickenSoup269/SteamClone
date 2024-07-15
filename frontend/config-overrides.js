/* config-overrides.js */
// Dùng để tùy chỉnh cấu hình webpack

const { override, useBabelRc } = require('customize-cra')

// eslint-disable-next-line react-hooks/rules-of-hooks
module.exports = override(useBabelRc())
