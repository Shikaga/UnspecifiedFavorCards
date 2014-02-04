function HashVerifier(favorArray) {
    this.favorArray = favorArray;
    emitter.on('codeScanned', this.verify, this)
}

HashVerifier.VALID = 0;
HashVerifier.INVALID = 1;
HashVerifier.USED = 2;

HashVerifier.prototype.verify = function(message) {
    var hash = generateSha(message);
    for (var i=0; i < this.favorArray.length; i++) {
        var favor = this.favorArray[i];
        if (favor.hash == hash) {
            if (favor.used == false) {
                emitter.trigger('scanComplete');
                emitter.trigger('scanSuccess');
                favor.setVerified();
                return HashVerifier.VALID;
            } else {
                emitter.trigger('scanFail');
                return HashVerifier.USED;
            }

        }
    }
    return HashVerifier.INVALID;
}