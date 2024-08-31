deploy:
	npm run build
	./node_modules/.bin/firebase deploy deploy

test:
	clear
	npm run test
