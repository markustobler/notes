// Style Switcher
function addEvent(obj, type, fn) {
    if (obj.attachEvent) {
        obj['e' + type + fn] = fn;
        obj[type + fn] = function() {
            obj['e' + type + fn](window.event);
        }
        obj.attachEvent('on' + type, obj[type + fn]);
    } else obj.addEventListener(type, fn, false);
}

function trigger(action, el) {
    if (document.createEvent) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent(action, true, false);
        el.dispatchEvent(event);
    } else {
        el.fireEvent('on' + action);
    }
}

function switchStyles() {
    var selectedOption = this.options[this.selectedIndex],
        className = selectedOption.value;

    document.body.className = className;
    localStorage.setItem('bodyClassName', className);
}

var styleSwitcher = document.getElementById('styleSwitcher');

if(styleSwitcher != null){
    addEvent(styleSwitcher, 'change', switchStyles);

    var storedClassName = localStorage.getItem('bodyClassName');
    if (storedClassName) {
        for (var i = 0; i < styleSwitcher.options.length; i++) {
            if (styleSwitcher.options[i].value === storedClassName) {
                styleSwitcher.selectedIndex = i;
                trigger('change', styleSwitcher);
            }
        }
    }
}

// no styleSwitcher on page --> use classname in local storage
else {
    var storedClassName = localStorage.getItem('bodyClassName');
    document.body.className = storedClassName;
}
