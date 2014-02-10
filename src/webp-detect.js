
var WebpDetect = function() {

    var testFeatureSupport = function(feature, callback) {

        var testImages = {
            lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
            lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
            alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
            animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
        };

        var image = new Image();

        image.onload = function () {
            var isSupported = image.width > 0 && image.height > 0;
            callback(feature, isSupported);
        };

        image.onerror = function () {
            callback(feature, false);
        };

        image.src = "data:image/webp;base64," + testImages[feature];
    }

    var onFeatureTested = function(feature, isSupported) {

        var featureClass = (!isSupported ? 'no-' : '') + 'webp-' + feature;
        $('html').addClass(featureClass);

        var featureAttribute = featureClass + '-src';
        $('img[' + featureAttribute + ']').each(function (index, item) {
            var imageSource = $(item).attr(featureAttribute);
            $(item).removeAttr(featureAttribute);

            if (!isSupported)
                imageSource = imageSource.substring(imageSource.length - 3) + 'png';

            $(item).attr('src', imageSource || "");
        });
    }

    return {
        init: function () {
            testFeatureSupport('lossy', onFeatureTested);
            testFeatureSupport('lossless', onFeatureTested);
            testFeatureSupport('alpha', onFeatureTested);
            testFeatureSupport('animation', onFeatureTested);
        }
    }
}();