module.exports = {
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: ["standard",'plugin:vue/recommended'],
  rules: {
    "no-var": "error",
    "prefer-const": "error",
    "vue/name-property-casing": ["error", "kebab-case"]
  }
}