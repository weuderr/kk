GIT_COMMIT := $(shell git rev-list -1 HEAD)
HOST := $(shell hostname)
PRODUCT := kuantokusta

product-api:
	$(eval PRODUCT := kuantokusta-api)

product-cart:
	$(eval PRODUCT := kuantokusta-cart)

product-product:
	$(eval PRODUCT := kuantokusta-product)

npm-install:
	cd $(PRODUCT) && npm install

install-node-modules-api:
	product-api && npm-install

install-node-modules-cart:
	product-cart && npm-install

install-node-modules-product:
	product-product && npm-install

run-api:
	product-api && npm run start

run-cart:
	product-cart && npm run start

run-product:
	product-product && npm run start

install-node-modules-all:
	install-node-modules-api
	install-node-modules-cart
	install-node-modules-product

run-all:
	product-api && npm run start &
	product-cart && npm run start &
	product-product && npm run start

