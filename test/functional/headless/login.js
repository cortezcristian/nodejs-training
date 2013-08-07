var Browser = require("zombie")
  , assert = require("assert")
  , utils = require('../../../utils')
  , config = require('../../../config/config')
  , domain = "http://"+config.app.domain +":"+ config.app.port
  , browser = new Browser();
  //, browser = new Browser({ debug: true});

/**
* Test Authentication Login
*/
describe('Authentication Login', function(){

    it('should successful authenticate the administrator in the system', function(done){
        browser.visit(domain+"/admin", function () {
            assert.ok(browser.success);
            browser.
                fill("email", "admin@admin.com").
                fill("password", "123456").
                pressButton("Log In", function() {
                    assert.ok(browser.success);
                    if(browser.location.pathname == "/panel"){
                        done();
                    } else {
                        var err = new Error("Login Failed");
                        msg = "Login Failed" + "\r\n";
                        done(err);
                    }
                });
        });
    });
});
