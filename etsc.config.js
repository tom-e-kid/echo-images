module.exports = {
  // Supports all esbuild.build options
  esbuild: {},
  prebuild: async () => {
    console.log('prebuild')
    const rimraf = (await import('rimraf')).default
    rimraf.sync('./dist') // clean up dist folder
  },
  postbuild: async () => {
    console.log('postbuild')
  },
}
