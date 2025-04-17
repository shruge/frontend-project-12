BUILD?=./frontend/dist

install:
	npm ci

start:
	npx start-server -s $(BUILD)


