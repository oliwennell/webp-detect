var page = require('webpage').create();

function isDocumentReady() {
    page.evaluate(function() {
        return $('html').hasClass('ready');
    });
}

function waitForDocumentReady(callback) {
    if (isDocumentReady()) {
        console.log('document is ready');
        callback();
        return;
    }

    console.log('document is not ready');

    setTimeout(function () {
        waitForDocumentReady(callback);
    }, 100);
}

page.open('file:///C:/Users/Oli/Documents/projects/webp-detect/tests/test.html', function () {

    page.evaluate(function () {
        $(document).ready(function () {
            $('html').addClass('ready');
        });
    });

    waitForDocumentReady(function () {


        var imageElements = page.evaluate(function () {
            return document.getElementsByTagName('img');
        });

        console.log(imageElements.length + ' img elements');
        for (var index = 0; index < imageElements.length; ++index) {
            var element = imageElements[index];
            console.log(element);
            console.log(element.getAttribute('src'));
        }

        phantom.exit();
    });

});