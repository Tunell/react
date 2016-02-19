# react
Testing the bare minimum react app with watchify (browserify with watch-functionality)

Helloworld.js is written in JSX (which is available as a sublime plugin)

This is esentially the "Get Started" guide from the react page:
https://facebook.github.io/react/docs/getting-started.html

cd to the correct folder.

##to install:

npm install

mkdir target

##To run:
watchify -t [ babelify --presets [ react ] ]  src/helloworld.js -o target/bundle.js

http-server


Http-server is just hosting the static files, any webserver works fine.