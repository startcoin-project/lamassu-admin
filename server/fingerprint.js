var exec = require('child_process').exec;

var cert = '/root/lamassu-server.crt';

var fingerprint = null;

module.exports = function () {
  console.dir(fingerprint);
  return fingerprint;
};

exec('openssl x509 -fingerprint -sha1 -noout -in ' + cert + ' | sed \'s/SHA1 Fingerprint=//\'', function (err, stdout) {
  if (err) throw err;
  // Should we throw if there's anything in `stderr`? Are there any unusual
  // warnings that would cause this to crash?
  fingerprint = stdout.trim();
});

// XXX(mmalecki) this could be nicer but SocketStream.
