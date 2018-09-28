dev:
	npm run parcel -- index.html --port 8080 --no-source-maps --no-cache

lint:
	npm run standard -- --fix

test:
	npm run jest -- -c jest.config.js

nsp:
	npm run nsp -- check --threshold 3

integration:
	make nsp
	npm run standard
	make test
