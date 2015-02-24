(function() {
var toHide = [];
var hideAll = true;

function setToHide(getelm) {
  toHide.push({
    getelm:getelm,
    oldvis:getelm().style.visibility
  });
}

if (window.location.pathname == "/" ) {
  setToHide(function() {
    return document.getElementById("page-container");
  });
} else {
  setToHide(function() {
    return document.getElementById("watch7-sidebar");
  });
  setToHide(function() {
    return document.getElementById("watch-discussion");
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message = "unhide") {
    toHide.forEach(function unHideAll(hiddenElm) {
      hiddenElm.getelm().style.visibility = hiddenElm.oldvis;
    });
    hideAll = false;
    window.setTimeout(function reHideAll() {
      hideAll = true;
    }, 1000*10 /*10 seconds*/);
  }
});

window.setInterval(function() {
  if (hideAll) {
    toHide.forEach(function(hiddenElm) {
      hiddenElm.getelm().style.visibility = "hidden";
    });
  }
}, 100);
})();
