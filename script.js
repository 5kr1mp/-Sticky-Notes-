getNotes().forEach((note) => {
    $("#add-note").before(createNoteElement(note.id, note.content));
});

//returns an array of note objects
function getNotes(){
    return JSON.parse(localStorage.getItem("app-notes") || "[]");
}

function saveNotes(notes){
    localStorage.setItem("app-notes", JSON.stringify(notes));
}

//creates a note element and returns it
function createNoteElement(id, content){
    const $newNoteElem = $('<div/>',{'class': 'note'}).append([
        //create textarea
        $('<textarea/>',{'class':'txtNote','placeholder':'Type your note here...'})
            .val(content)
            .change(function(){
                updateNote(id, $(this).val());
            }),
        
        //create button
        $('<button/>',{'class':'delete'})
            .click(()=>{
                if(confirm("Confirm delete?")){
                    deleteNote(id, $newNoteElem);
                }
            })
            .append(
                $('<img>',{'src':'assets/delete.svg'})
            )
    ])

    return $newNoteElem;
}


function addNote(){
    const notes = getNotes();

    //noteObj will be saved in the local storage
    const noteObj = {
        id : Math.floor(Math.random() * 100000),
        content: ""
    }

    //creates and appends a note element 
    $("#add-note").before(createNoteElement(noteObj.id, noteObj.content));  

    notes.push(noteObj);
    saveNotes(notes);
}

//deletes a note element
function deleteNote(id, noteElement){
    const notes = getNotes().filter((note)=>note.id != id);
    noteElement.remove();
    saveNotes(notes);
}


//updates localStorage whenever a textarea value is changed
function updateNote(id, newContent){
    const notes = getNotes();

    //changes content property in the local storage
    const targetNote = notes.filter((note)=>note.id == id)[0];
    targetNote.content = newContent;

    saveNotes(notes);
}


function showInfo(){
    $("#overlay").css({
        'display':'flex'
    })
}

function closeInfo(){
    $("#overlay").css({
        'display':'none'
    })
}