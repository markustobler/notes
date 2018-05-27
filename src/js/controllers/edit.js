// UI-Refs
const noteTitle = document.getElementById('title');
const noteDescription = document.getElementById('description');
const noteImportance = document.getElementById('importance');
const noteFinishDate = document.getElementById('finishDate');
const noteSubmit = document.getElementById('submit');
const noteCancel = document.getElementById('cancel');


// create globally-unique identifier
const uuidv4 = {
    id: () => {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
};



// Form Validation
function checkFormValidity(){
    const isValidNoteTitle = noteTitle.checkValidity();
    const isValidNoteDescription = noteDescription.checkValidity();
    const isValidFinishDate = noteFinishDate.checkValidity();

    if (isValidNoteTitle == true && isValidNoteDescription == true && isValidFinishDate && true){
        return true;
    }
    else {
        return false;
    }
}



// app-state / model
const noteModel = {
    saveNote: function () {
        const note = new Note({
            id: uuidv4.id(),
            title: noteTitle.value,
            description: noteDescription.value,
            importance: noteImportance.querySelector('input[name="star"]:checked').value,
            finishDate: noteFinishDate.value,
            createdDate: moment(),
            archived: false
        });

        // Save form to local storage
        localStorage.setItem('testObject', JSON.stringify(note));

    }
};

// Controller
const noteController = {
    renderUI: function () {
        // render UI
    },
    registerListeners: function () {
        noteSubmit.addEventListener("click", function (e) {

            // save only if all required fields are valid
            if(checkFormValidity() == true){
                noteModel.saveNote();
            }

        });


        noteCancel.onclick = function () {


        };

    }
};
noteController.registerListeners();

// init UI
noteController.renderUI();
