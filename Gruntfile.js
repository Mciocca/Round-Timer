module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
        build: {
            src: 'js/round.js',
            dest: 'js/round.min.js'
        }
    },

    cssmin: {
        minify: {
            src: 'css/round.css',
            dest: 'css/round.min.css'
        }

    },

    watch: {
        scipts: {
            files: ['js/*.js', 'css/*.css'],
            tasks: ['uglify', 'cssmin'],
            options: {
                spawn: false
            },
        }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['uglify', 'watch']);
};