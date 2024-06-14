/* config-overrides.js */
// Dùng để tùy chỉnh cấu hình webpack

const { override, useBabelRc } = require("customize-cra")

module.exports = override(useBabelRc())
