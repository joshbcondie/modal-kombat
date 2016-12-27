$(function() {
    $('#enabled').change(function() {
        chrome.storage.sync.set({enabled: this.checked});
    });

    $('#timeout').on('input', function() {
        chrome.storage.sync.set({timeout: this.value});
    });

    chrome.storage.sync.get(['enabled', 'timeout'], function(items) {
        $('#enabled').prop('checked', 'enabled' in items? items.enabled : true);
        $('#timeout').val(items.timeout || 500);
    });
});