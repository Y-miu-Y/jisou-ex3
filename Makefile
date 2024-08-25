deploy:
	npm run build
	./node_modules/.bin/firebase deploy deploy

test:
	npm run test
