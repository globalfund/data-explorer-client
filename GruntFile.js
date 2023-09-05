module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      svgstore: {
        options: {
          prefix : 'plyr-', // This will prefix each ID
          svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
            viewBox : '0 0 100 100',
            xmlns: 'http://www.w3.org/2000/svg'
          }
        },
        default : {
            files: {
              'dest/svg-defs.svg': ['plyr-svgs/*.svg'],
            }
          },
        
        },
    });
  
    // Load the plugin that provides the "uglify" task.
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-svgstore');
  
    // Default task(s).
    grunt.registerTask('default', ['svgstore']);

  
  };