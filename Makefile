dev:
	npm run parcel -- build index.js

lint:
	npm run standard -- --fix

test:
	npm run jest -- -c jest.config.js

nsp:
	npm run nsp -- check --threshold 2

integration:
	make nsp
	npm run standard
	make test
