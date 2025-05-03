BUILD?=./frontend/dist

install:
	npm ci

start-server: build
	npx start-server -s $(BUILD)

build: install
	make -C ./frontend build
