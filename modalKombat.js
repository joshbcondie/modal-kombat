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
        var moveModals = function() {
            if (enabled) {
                var resetProperty = function(property, value) {
                    $('*').each(function() {
                        if ($(this).css(property).toLowerCase().indexOf(value) > -1) {
                            this.style.setProperty(property, 'initial', 'important');
                        }
                    });
                };
                resetProperty('position', 'fixed');
                resetProperty('overflow', 'hidden');                
            }
            setTimeout(moveModals, timeout);
        }
        moveModals();
    });
});
