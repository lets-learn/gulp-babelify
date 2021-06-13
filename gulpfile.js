const gulp = require("gulp");
const babelify = require("babelify");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const Vinyl = require("vinyl");
const map = require("gulp-map");

//Gulp 3
// gulp.task("es6", () => {
//   browserify("src/app.js")
//     .transform("babelify", {
//       presets: ["es2015"],
//     })
//     .bundle()
//     .pipe(source("app.js"))
//     .pipe(buffer())
//     .pipe(gulp.dest("build/"));
// });

// gulp.task("default", ["es6"], () => {
//   gulp.watch("src/app.js", ["es6"]);
// });

//Gulp 4
async function es6() {
  return browserify("src/app.js")
    .transform(
      babelify.configure({
        presets: ["es2015"],
      })
    )
    .bundle()
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(
      map(function (file) {
        // Explicitly convert to Vinyl object otherwise `gulp.dest()` will fail
        return new Vinyl(file);
      })
    )
    .pipe(gulp.dest("build/"));
}

// Delete resources function
async function clearResources() {
  console.log("Deleting resources");
}

// Gulp tasks
exports.watch = es6;
exports.clear = clearResources;
exports.default = gulp.series(clearResources);
