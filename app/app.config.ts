export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'slate',
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
    },
    card: {
      slots: {
        body: 'p-2 sm:p-4',
      },
    },
  },
})
