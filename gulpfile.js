const gulp = require('gulp');
const gulpTap = require('gulp-tap');

const fs = require('fs-extra');

const IBMenv = 'Production';
const legalsHeader = require('./__devops__/legals')(IBMenv).trim();

const paths = {
	dist: './dist',
};

gulp.task('render:parcel', (done) => {
	const { execSync } = require('child_process');

	execSync('yarn parcel:build > /dev/null');

	done();
});

gulp.task('render:legals', () => {
	return gulp.src([
		'./dist/**/*.css',
		'./dist/**/*.js'
	])
		.pipe(gulpTap(function (file) {
			let content = file.contents
				.toString('utf-8')

			if (file.path.includes('package') && file.path.includes('.js')) {
				// Fix regenerators license comments
				content = content.split('/*!').join('/**');

				// Manually fix template literals
				content = content.split('`').map((chunk) => {
					if ((!chunk.includes(' * @license')) &&
						(!chunk.includes('/**'))
					) {
						chunk = chunk.split('\n').join(' ')
						.split('\t').join(' ');
					}
	
					return chunk;
				}).join('`');

				// Fix some comments declaration issues from parcel
				content = content.split('\n').map((chunk) => {
					if ((chunk.includes('*/')) &&
						(!chunk.endsWith('*/'))
					) {
						chunk = chunk.split('*/').join('*/\n')
					}
	
					return chunk;
				}).join('\n');

				// Fix ghost license declarations
				content = content.split('/**').filter((chunk, chunkIndex) => {
					const finalChunk = chunk.split(' */').pop();

					return (finalChunk !== '\n');
				}).join('/**');
			}

			file.contents = Buffer.from(`${legalsHeader}\n${content}`);
		}))
		.pipe(gulp.dest(paths.dist));
});

gulp.task('clean:dist', (done) => {
	fs.rmSync(paths.dist, {
		recursive: true,
		force: true
	});

	done();
});

gulp.task('clean',
	gulp.series(
		'clean:dist'
	)
);

gulp.task('render',
	gulp.series(
		'clean',
		'render:parcel',
		'render:legals'
	)
);

gulp.task('default', (done) => {
	console.log('');
	console.log('	Hello');
	console.log('');
	done();
});
