
var WebpDetect = function() {

    var onComplete = null;

    var numFeaturesTested = 0;
    var features = [
        { name: 'lossy', testImage: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA" },
        { name: 'lossless', testImage: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==" },
        { name: 'alpha', testImage: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==" },
        { name: 'animation', testImage: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA" }
    ];

    var testFeatureSupport = function(feature, callback) {

        var image = new Image();

        image.onload = function () {
            var isSupported = image.width > 0 && image.height > 0;
            callback(feature, isSupported);
        };

        image.onerror = function () {
            callback(feature, false);
        };

        image.src = "data:image/webp;base64," + feature.testImage;
    }

    var onFeatureTested = function(feature, isSupported) {
        
        var featureClass = (!isSupported ? 'no-' : '') + 'webp-' + feature.name;
        $('html').addClass(featureClass);

        var featureAttribute = featureClass + '-src';
        $('img[' + featureAttribute + ']').each(function (index, item) {
            var imageSource = $(item).attr(featureAttribute);
            $(item).removeAttr(featureAttribute);

            if (!isSupported)
                imageSource = imageSource.substring(imageSource.length - 3) + 'png';

            $(item).attr('src', imageSource || "");
        });

        if (onComplete) {
            numFeaturesTested++;
            if (numFeaturesTested == features.length) {
                onComplete();
            }
        }
    }

    return {
        init: function (parameters) {
            onComplete = parameters && parameters.onComplete;

            for (var index = 0; index < features.length; ++index) {
                testFeatureSupport(features[index], onFeatureTested);
            }
        }
    }
}();