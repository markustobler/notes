'use strict';

const initIndexController = function () {

    // app-state / model

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

    // UI-Refs
    const newBtn = document.getElementById('new');
    const notesContainer = document.getElementById('notes');
    let editButtons = [];





    // Controller
    const countController = {
        renderUI: function () {
            const notes = noteHelpers.getNotes();
            const noteTemplate = document.getElementById('note-template').innerHTML;
            const renderNoteHtml = Handlebars.compile(noteTemplate);
            notesContainer.innerHTML = renderNoteHtml(notes);
            editButtons =  document.querySelectorAll('button.edit');
            this.registerListeners();
        },
        registerListeners: function () {

            // add listener to new button
            newBtn.addEventListener('click', function () {
                location.href = 'edit.html';
            });

            // add listener to all edit buttons
            editButtons.forEach(function(elem) {
                elem.addEventListener('click', function (e) {
                    let id = e.target.closest('.edit').dataset.id;
                    window.location.href = 'edit.html?id=' + id;
                });
            });


        }
    };

    // init UI
    countController.renderUI();
};

window.addEventListener('load', function () {
    initIndexController();
});