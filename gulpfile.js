var gulp = require('gulp');
var mocha = require('gulp-mocha');

//Task for mocha unit tests
gulp.task('mocha-test', function() {
 return gulp.src('test/*.js', {read: false})
   .pipe(mocha({
     globals:['expect'],
     timeout: 3000,
     ignoreLeaks: true,
     ui: 'bdd',
     colors: true,
     reporter: 'mocha-jenkins-reporter',
     reporterOptions: {
       junit_report_name: 'Mocha Unit Tests',
       junit_report_path: 'test/mocha-report.xml',
       junit_report_stack: 1
     }
   }));
});
