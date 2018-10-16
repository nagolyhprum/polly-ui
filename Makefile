build:
	npm run parcel -- build index.js

lint:
	npm run standard -- --fix

test:
	npm run jest -- -c jest.config.js

audit:
	npm audit --fix

integration:
	make nsp
	npm run standard
	make test

patch: integration build
	npm version patch
	npm publish
minor: integration build
	npm version minor
	npm publish
major: integration build
	npm version major
	npm publish
