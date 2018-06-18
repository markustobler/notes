'use strict';
const initStyleSwitcher = function () {

    // app-state / model
    const styleSwitcherModel = {

        setStyleOnChanche: function () {
            let selectedOption = styleSwitcher.options[styleSwitcher.selectedIndex].value;
            localStorage.setItem('bodyClassName', selectedOption);
            document.body.className = selectedOption;
        },

        setStyleOnLoad: function () {
            let bodyClassName = localStorage.getItem('bodyClassName');
            if (bodyClassName === null) {
                bodyClassName = 'color-style';
                document.body.className = bodyClassName;
            }
            else {
                document.body.className = bodyClassName;

                // Changing the selected option with the given value
                if (styleSwitcher != null) {
                    var val = bodyClassName;
                    var sel = styleSwitcher
                    var opts = sel.options;
                    for (var opt, j = 0; opt = opts[j]; j++) {
                        if (opt.value == val) {
                            sel.selectedIndex = j;
                            break;
                        }
                    }
                }
            }
        }
    };

    // UI-Refs
    const styleSwitcher = document.getElementById('styleSwitcher');

    // Controller
    const styleSwitcherController = {
        renderUI: function () {
            styleSwitcherModel.setStyleOnLoad();
            this.registerListeners();
        },
        registerListeners: function () {

            if (styleSwitcher != null) {
                styleSwitcher.addEventListener('change', function () {
                    styleSwitcherModel.setStyleOnChanche();
                });
            }
        }
    };

    // init UI
    styleSwitcherController.renderUI();
};

window.addEventListener('load', function () {
    initStyleSwitcher();
});
