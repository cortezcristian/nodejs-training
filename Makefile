REPORTER = spec


# Global
test: test-functional

test-functional: test-headless

# Functional Tests
test-headless:
	./node_modules/.bin/mocha ./test/functional/headless/*.js \
        --reporter $(REPORTER) \
        -t 0
