gulp   = require 'gulp'
coffee = require 'gulp-coffee'
watch  = require 'gulp-watch'
nodemon = require 'gulp-nodemon'
sourcemaps = require 'gulp-sourcemaps'
plumber = require 'gulp-plumber'
notify = require 'gulp-notify'

src =
   coffee: 'src/**/*.coffee'

gulp.task 'coffee', ->
   gulp.src "#{src.coffee}"
      .pipe plumber({ errorHandler: notify.onError "Error: <%= error.message %>" })
      .pipe sourcemaps.init()
      .pipe coffee { bare: true }
      .pipe gulp.dest "app"

gulp.task 'build', [
   'coffee'
]

gulp.task 'watch', ->
   gulp.watch "#{src.coffee}", ['coffee']

gulp.task 'default', [ 'build', 'watch' ]
