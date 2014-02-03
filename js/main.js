function generateSha(message) {
    var shaObj = new jsSHA(message, "TEXT");
    var hash = shaObj.getHash("SHA-512", "HEX");
    return hash;
}