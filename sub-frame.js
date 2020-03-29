var btn = document.getElementById('test');

function storageAccessAPISupported() {
  return 'hasStorageAccess' in document && 'requestStorageAccess' in document;
}

function ready(fn) {
  if (
    document.attachEvent
      ? document.readyState === 'complete'
      : document.readyState !== 'loading'
  ) {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function accessStorage(fn) {
  document.hasStorageAccess().then(
    function(hasAccess) {
      if (hasAccess) {
        console.info('Storage API Access already granted');
        fn();
        return;
      }

      console.info('no existing Storage API Access ...');
      console.info('requesting Storage API Access ...');

      document.requestStorageAccess().then(
        function() {
          console.info('Storage API Access granted.');
          fn();
          return;
        },
        function() {
          console.warn('Storage API Access denied.');
        }
      );
    },
    function(reason) {
      console.warn('something went wrong ...');
      console.error(reason);
    }
  );
}

function getCookies() {
  console.log('Trying to get document.cookie');
  console.log('----->', document.cookie);
  document.querySelector('#cookies').innerHTML = document.cookie;
}

function init() {
  btn.innerText = 'GOGOGO';
  getCookies();
}

function attachEventHandlers() {
  btn.addEventListener('click', accessStorage.bind(null, setCookie));
}

function setCookie() {
  console.log('setting cookie');
  document.cookie = 'userName=Johnny Knoxville';
  getCookies();
}

function onReady() {
  if (!storageAccessAPISupported()) {
    btn.setAttribute('disabled', true);
    btn.classList.add('pure-button-disabled');
    btn.innerText = 'Storage Access API not supported';
    return;
  }
  attachEventHandlers();
  init();
}

ready(onReady);
