BUILD?=./frontend/dist

install:
	npm ci

start:
	npx start-server -s $(BUILD)

lint:
	make -C ./frontend lint

build: install
	make -C ./frontend build
