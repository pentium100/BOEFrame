module.exports = function(grunt) {

	// 配置路径
	var yeomanConfig = {
		app: 'src/main/webapp',
		dist: 'src/main/webapp/dist'
	};
	grunt.initConfig({
		// pkg: grunt.file.readJSON('package.json'),
		yeoman: yeomanConfig,
		// clean 清理上次生成的东西
		clean: {
			dist: ['<%= yeoman.dist %>']
		},
		// copy 用来拷贝一些不需要处理的文件
		copy: {
			dist: {
				// 允许扩展选项
				expand: true,
				//nonull: true,
				// 相对路径
				cwd: '<%= yeoman.app %>',
				// 匹配的文件，依据相对路径
				src: [
				
      				'dashboard.jsp',
      				'js/**/*.js'
      			]		
			    ,
				// 目的地
				dest: '<%= yeoman.dist %>/'
			}
		},

		requireRev: {

			   options: {
      				hash: {
        				algorithm: 'sha1',
        				length: 16
      					},
      				paths: {
        				styles: 'css!/styles/' // for requireCSS
      				}
    			},
		    	expand: true,
    			cwd: '<%= yeoman.dist %>',
    			src: [
	      			'js/dashboard.js'
    			]


  		},
		// useminPrepare && usemin 用来允许你在html文件中说明哪些文件要合并到同一个文件中
		useminPrepare: {
			options: {
				dest: '<%= yeoman.dist %>'
			},
			html: '<%= yeoman.app %>/index.html'
		},
		usemin: {
			options: {
				dirs: ['<%= yeoman.dist %>']
			},
			html: ['<%= yeoman.dist %>/{,*/}*.html']
		},

		// 配置自动文件重命名
		rev: {
			dist: {
				src: '<%= yeoman.dist %>/js/*.js'
			}
		}
	});

	// Default task(s).
	

	
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-debug-task');
	grunt.loadNpmTasks('grunt-require-rev');

	 grunt.registerTask('default', ['copy']);
	 grunt.registerTask('clean2', ['clean', 'copy', 'requireRev']);

}