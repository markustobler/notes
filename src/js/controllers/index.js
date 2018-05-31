'use strict';

const initIndexController = function () {

    // app-state / model

    // UI-Refs
    const newBtn = document.getElementById('new');
    const notesContainer = document.getElementById('notes');

    // Controller
    const countController = {
        renderUI: function () {
            const notes = noteHelpers.getNotes();
            const noteTemplate = document.getElementById('note-template').innerHTML;
            const renderNoteHtml = Handlebars.compile(noteTemplate);
            notesContainer.innerHTML = renderNoteHtml(notes);
            this.registerListeners();
        },
        registerListeners: function () {

            // add listener to new button
            newBtn.addEventListener('click', function () {
                location.href = 'edit.html';
            });

            // add EventListener for note buttons - BubblingEvents
            notesContainer.addEventListener('click', function (e) {
                e.stopPropagation();
                if (e.target.parentNode.nodeName == 'BUTTON') {
                    let id = e.target.closest('button').dataset.id;
                    switch (e.target.closest('button').dataset.function) {
                    case 'edit':
                        window.location.href = 'edit.html?id=' + id;
                        break;
                    case 'delete':
                        noteHelpers.deleteNote(id);
                        countController.renderUI();
                        break;
                    }
                }
            });

            // add EventListener for note checkboxes - BubblingEvents
            notesContainer.addEventListener('change', function (e) {
                e.stopPropagation();

                if (e.target.parentNode.nodeName == 'LABEL') {
                    let note = e.target.closest('input').dataset.id;
                    noteHelpers.toggleArchived(note);
                }

            });





        }
    };

    // init UI
    countController.renderUI();
};

window.addEventListener('load', function () {
    initIndexController();
});