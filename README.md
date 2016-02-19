# react
Testing the bare minimum react app with watchify (browserify with watch-functionality)

cd to the correct folder.

to install:
npm install
mkdir target

To run:
watchify -t [ babelify --presets [ react ] ]  src/helloworld.js -o target/bundle.js
http-server


Http-server is just hosting the static files, any webserver works fine.