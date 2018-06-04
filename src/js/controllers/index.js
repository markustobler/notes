'use strict';

const initIndexController = function () {

    // UI-Refs
    const newBtn = document.getElementById('new');
    const notesContainer = document.getElementById('notes');
    const notesFilter = document.getElementById('filter');
    const sortButtons = document.querySelectorAll('.btn--sort');

    // Controller
    const indexController = {
        renderUI: function ({notes}) {

            // render note Template
            const noteTemplate = document.getElementById('note-template').innerHTML;
            const renderNoteHtml = Handlebars.compile(noteTemplate);
            notesContainer.innerHTML = renderNoteHtml(notes);

            // render filter Template
            const filterTemplate = document.getElementById('filter-template').innerHTML;
            const createFilterHTML = Handlebars.compile(filterTemplate);
            const checked = noteHelpers.filterStatus;
            notesFilter.innerHTML = createFilterHTML(checked);

            // register EventListeners
            indexController.registerTemplateListeners();
        },

        updateUi: function () {
            const notes = noteHelpers.getNotes();
            indexController.renderUI({notes});
        },

        registerTemplateListeners: function () {

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
                        indexController.updateUi();
                        break;
                    }
                }
            });

            // add EventListener for note checkboxes - BubblingEvents
            notesContainer.addEventListener('change', function (e) {
                e.stopImmediatePropagation();

                if (e.target.parentNode.nodeName == 'LABEL') {
                    let note = e.target.closest('input').dataset.id;
                    noteHelpers.toggleFinished(note);
                    indexController.updateUi();
                }

            });
        },
        registerListeners: function () {
            // add EventListener on showFinishedCheckbox
            notesFilter.addEventListener('change', function (e) {
                e.stopImmediatePropagation();
                if (e.target.parentNode.nodeName == 'LABEL') {
                    noteHelpers.toggleFilter();
                    indexController.updateUi();
                }
            });

            // add EventListener for sort buttons
            sortButtons.forEach(function(elem) {
                elem.addEventListener("click", function(e) {
                    const sort = e.target.dataset.sort;
                    noteHelpers.setSort(sort);
                    indexController.updateUi();
                });
            });


        },






    };

    // init UI
    indexController.registerListeners();
    indexController.updateUi();
};

window.addEventListener('load', function () {
    initIndexController();
});
