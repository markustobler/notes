// helper for substring
Handlebars.registerHelper('trimString', function(passedString) {
    var theString = passedString.substring(0,50);
    return new Handlebars.SafeString(theString);
});

// helper to render solid stars
Handlebars.registerHelper('solidStar', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

// helper to render regular stars
Handlebars.registerHelper('regularStar', function(n, block) {
    var accum = '';
    for(var i = 0; i < 5-n; ++i)
        accum += block.fn(i);
    return accum;
});

// helper to render star radios
Handlebars.registerHelper('checked', function(value, test) {
    if (value == undefined) return '';
    return value==test ? 'checked' : '';
});

// helper to format time
Handlebars.registerHelper('formatTime', function (date, format) {
    var mmnt = moment(date);
    return mmnt.format(format);
});

// helper to check lenght of string
Handlebars.registerHelper('checklength', function (v1, v2, options) {
    'use strict';
    if (v1.length>v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});