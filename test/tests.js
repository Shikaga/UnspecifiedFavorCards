test( "can assert a hash is valid", function() {
    var testHash = generateSha("thisIsATest")
    var testFavor = new Favor(testHash, "message1", null, null, false);
    var testVerifier = new HashVerifier([testFavor]);
    var result = testVerifier.verify('thisIsATest');
    equal(HashVerifier.VALID, result);
});

test( "can assert a hash is invalid", function() {
    var testHash = generateSha("thisIsATest")
    var testFavor = new Favor(testHash, "message1", null, null, false);
    var testVerifier = new HashVerifier([testFavor]);
    var result = testVerifier.verify('thisIsWrong');
    equal(HashVerifier.INVALID, result);
});

test( "can assert a hash is invalid in empty array", function() {
    var testHash = generateSha("thisIsATest")
    var testVerifier = new HashVerifier([]);
    var result = testVerifier.verify('thisIsWrong');
    equal(HashVerifier.INVALID, result);
});

test( "can assert a hash is valid in array", function() {
    var testHash = generateSha("thisIsATest");
    var testHash2 = generateSha("thisIsATest2");
    var testFavor = new Favor(testHash, "message1", null, null, false);
    var testFavor2 = new Favor(testHash2, "message2", null, null, false);
    var testVerifier = new HashVerifier([testFavor, testFavor2]);
    var result = testVerifier.verify('thisIsATest2');
    equal(HashVerifier.VALID, result);
});


test( "can assert a hash is already used in array", function() {
    var testHash = generateSha("thisIsATest");
    var testHash2 = generateSha("thisIsATest2");
    var testFavor = new Favor(testHash, "message1", null, null, false);
    var testFavor2 = new Favor(testHash2, "message2", null, null, true);
    var testVerifier = new HashVerifier([testFavor, testFavor2]);
    var result = testVerifier.verify('thisIsATest2');
    equal(HashVerifier.USED, result);
});

//////////////////////////////////////////////////////////////////////////
// UI
//////////////////////////////////////////////////////////////////////////

test( "UI hides video and favors to begin", function() {
    UIHandler.prototype.bindToDom = function() {};
    var uiHandler = new UIHandler();
    equal(false, uiHandler.cameraVisible());
    equal(false, uiHandler.favorsVisible());
});

test( "shows favors when button clicked", function() {
    UIHandler.prototype.bindToDom = function() {};
    var uiHandler = new UIHandler();
    uiHandler.onShowFavorsClicked();
    equal(false, uiHandler.cameraVisible());
    equal(true, uiHandler.favorsVisible());
});

test( "hides favors when button clicked", function() {
    UIHandler.prototype.bindToDom = function() {};
    var uiHandler = new UIHandler();
    uiHandler.onShowFavorsClicked();
    uiHandler.onHideFavorsClicked();
    equal(false, uiHandler.cameraVisible());
    equal(false, uiHandler.favorsVisible());
});


test( "UI shows video when scan clicked", function() {
    emitter = {
        trigger: sinon.spy(),
        on: sinon.spy()
    }
    var mockScanHandler = createMock(ScanHandler);
    UIHandler.prototype.bindToDom = function() {};
    var uiHandler = new UIHandler();
    uiHandler.onScanClicked();
    equal(true, uiHandler.cameraVisible());
    equal(true, emitter.trigger.calledWith('startScan'));
});

function createMock(yourClass) {
    var keys = Object.keys(yourClass.prototype);
    var mockObject = {};
    keys.forEach(function(key) {
        mockObject[key] = sinon.spy();
    })
    return mockObject;
}

