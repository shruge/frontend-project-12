BUILD?=./frontend/dist

install:
	npm ci

start:
	npx start-server -s $(BUILD)

build: install
	make -C ./frontend build
