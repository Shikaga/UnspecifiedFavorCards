function HashVerifier(favorArray) {
    this.favorArray = favorArray;
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
                return HashVerifier.VALID;
            } else {
                return HashVerifier.USED;
            }

        }
    }
    return HashVerifier.INVALID;
}