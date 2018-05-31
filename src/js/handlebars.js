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