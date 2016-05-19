module.exports = function(grunt) {
    //plugin
    grunt.loadNpmTasks('grunt-include-source'); //includere css e js annidati nelle cartelle
    grunt.loadNpmTasks('grunt-wiredep'); //includere componenti di bower //problemi con i css risolti mettendo un oggetto "overrides" nel bower.json
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