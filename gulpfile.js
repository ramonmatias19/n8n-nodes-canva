const { src, dest } = require('gulp');

function build() {
	return src('nodes/**/*.svg').pipe(dest('dist/nodes'));
}

exports['build:icons'] = build; 