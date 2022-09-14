const gulp = require('gulp');
const gulpTap = require('gulp-tap');
const gulpSurge = require('gulp-surge');

const fs = require('fs-extra');

const IBMenv = 'Production';
const legalsHeader = require('./__devops__/legals')(IBMenv).trim();

const paths = {
	dist: './dist',
	demo: './dist/demo',
	package: './dist/package'
};

gulp.task('render:parcel', (done) => {
	const { execSync } = require('child_process');

	execSync('yarn build:parcel > /dev/null');

	done();
});

gulp.task('render:storybook', (done) => {
	const { execSync } = require('child_process');

	execSync('yarn build:storybook > /dev/null');

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

				// Fix multiple spaces
				while (content.includes('  ')) {
					content = content.split('  ').join(' ');
				}
			}

			file.contents = Buffer.from(`${legalsHeader}\n${content}`);
		}))
		.pipe(gulp.dest(paths.dist));
});

gulp.task('clean:package', (done) => {
	fs.rmSync(`${paths.package}/demo`, {
		recursive: true,
		force: true
	});

	done();
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
		'render:storybook',
		'render:legals',
		'clean:package'
	)
);

gulp.task('deploy:surge', (done) => {
	Promise.all([
		gulpSurge({
			project: paths.demo, // Path to your static build directory
			domain: 'ibm-carbon-alternate-kaltura-audio-player.surge.sh' // Your domain or Surge subdomain
		}),
	]).then(() => {
		done();
	})
})

gulp.task('default', (done) => {
	console.log('');
	console.log('	Hello');
	console.log('');
	done();
});
