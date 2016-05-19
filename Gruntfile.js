module.exports = function(grunt) {
    //plugin
    grunt.loadNpmTasks('grunt-include-source'); //includere css e js annidati nelle cartelle
    grunt.loadNpmTasks('grunt-wiredep'); //includere componenti di bower
    //fine plugin
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        wiredep: {
                  task: {
                    src: ['index.tpl.html']
                  }
        },
        includeSource: {
                        options: {
                                    templates: {
                                                html: {
                                                        js:'<script src="{filePath}"></script>'
                                                }
                                     },
                        },
                        myTarget: {
                                    files: {
                                            'index.html': 'index.tpl.html'
                                    }
                        }
        }
    });
    
    
    grunt.registerTask('default', ['wiredep','includeSource']);
    
    
};