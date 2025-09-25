module.exports = {
  singleQuote: true,
  trailingComma: "all",
  semi: false,
  printWidth: 100,
  importOrder: [
    "^react$",
    "<THIRD_PARTY_MODULES>",
    "^(components|constants|hooks|layouts|providers|public|styles|types|services|utils|modules|__generated__)",
    "^[./]"
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss") // must be loaded last
  ]
}
