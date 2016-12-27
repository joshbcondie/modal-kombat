chrome.storage.sync.get(['enabled', 'timeout'], function(items) {
    var enabled = 'enabled' in items ? items.enabled : true;
    var timeout = items.timeout || 500;
    
    chrome.storage.onChanged.addListener(function(changes) {
        if ('enabled' in changes) {
            enabled = changes.enabled.newValue;
        }
        if ('timeout' in changes) {
            timeout = changes.timeout.newValue;
        }
    });

    $(function() {
        var killModals = function() {
            if (enabled) {
                var modals = $('*').filter(function() {
                    return $(this).css('position').toLowerCase().indexOf('fixed') > -1;
                });
                modals.css('position', 'initial');
            }
            setTimeout(killModals, timeout);
        }
        killModals();
    });
});
