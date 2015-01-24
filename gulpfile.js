var gulp = require("gulp")
var gulp_sass = require("gulp-sass")
var gulp_prefixify_css = require("gulp-autoprefixer")
var gulp_minify_css = require("gulp-minify-css")
var gulp_minify_html = require("gulp-minify-html")
var gulp_json_transform = require("gulp-json-transform")
var gulp_uglify = require("gulp-uglify")
var gulp_if = require("gulp-if")

var vinyl_buffer = require("vinyl-buffer")
var vinyl_source = require("vinyl-source-stream")

var browserify = require("browserify")
var reactify = require("reactify")
var envify = require("envify/custom")
var aliasify = require("aliasify")

gulp.task("scripts", function()
{
    browserify("./source/index.js")
        .transform("reactify")
        .transform(envify({
           platform: process.env.platform
        }))
        .transform(aliasify.configure({
           configDir: __dirname,
           aliases: {
               "<source>": "./source",
               "<styles>": "./source/styles",
               "<scripts>": "./source/scripts",
               "<assets>": "./source/assets"
           }
        }))
        .bundle()
        .pipe(vinyl_source("index.js"))
        .pipe(vinyl_buffer())
        .pipe(gulp_if(is_gh_pages(), gulp_uglify()))
        .pipe(gulp.dest("./builds"))
});

gulp.task("styles", function()
{
    gulp.src("./source/index.scss")
        .pipe(gulp_sass())
        .pipe(gulp_prefixify_css())
        .pipe(gulp_if(is_gh_pages(), gulp_minify_css()))
        .pipe(gulp.dest("./builds"))
})

gulp.task("markup", function()
{
    gulp.src("./source/index.html")
        .pipe(gulp_if(is_gh_pages(), gulp_minify_html()))
        .pipe(gulp.dest("./builds"))
})

gulp.task("assets", function()
{
    gulp.src("./source/assets/**/*", {base: "./source"})
        .pipe(gulp.dest("./builds"))
})

gulp.task("configs", function()
{
    gulp.src("./package.json")
        .pipe(gulp_json_transform(function(data)
        {
            delete data["dependencies"]
            delete data["devDependencies"]
            return data
        }, 2))
        .pipe(gulp.dest("./builds"))
})

gulp.task("default", ["scripts", "styles", "markup", "assets", "configs"]);

function is_gh_pages()
{
    return process.env.platform == "gh_pages"
}
