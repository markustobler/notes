'use strict';

const initIndexController = function () {

    // app-state / model

    // UI-Refs
    const newBtn = document.getElementById('new');
    const notesContainer = document.getElementById('notes');
    let editButtons = [];
    let deleteButtons = [];





    // Controller
    const countController = {
        renderUI: function () {
            const notes = noteHelpers.getNotes();
            const noteTemplate = document.getElementById('note-template').innerHTML;
            const renderNoteHtml = Handlebars.compile(noteTemplate);
            notesContainer.innerHTML = renderNoteHtml(notes);
            editButtons =  document.querySelectorAll('button.edit');
            deleteButtons =  document.querySelectorAll('button.delete');
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

            // add listener to all delete buttons
            deleteButtons.forEach(function(elem) {
                elem.addEventListener('click', function (e) {
                    let id = e.target.closest('.delete').dataset.id;
                    noteHelpers.deleteNote(id);
                    countController.renderUI();
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