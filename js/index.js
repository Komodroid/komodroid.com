import $ from 'jquery';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
UIkit.use(Icons);

import "./lib/shader-utils.js";

// Init fadeout
$(window).on('load', function () {
    $("#init-overlay").addClass("ready");
});