loadTheme();    

//returns true for light mode, and false for dark mode
function themeMode(){
    return Boolean(parseInt(localStorage.getItem("light-mode")));
}

function loadTheme(){
    if(themeMode()){
        //change properties to light mode colors;
        $(":root").css({
            "--primary-color": "#FFFFFF",
            "--secondary-color": "#009063",
            "--border-color": "#142724",
            "--text-color": "#ffffff"
        })
        
    } else {
        //change properties to dark mode colors;
        $(":root").css({
            "--primary-color": "#0c120e",
            "--secondary-color": "#27322c",
            "--border-color": "#8b928e",
            "--text-color": "#ffffff"
        })
    }
}

function toggleTheme(){
    localStorage.setItem("light-mode", (+!themeMode()).toString());
    loadTheme();
}

$(document).ready(()=>{
    
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


    $("#btn-info").click(()=>{
        showInfo();
        console.log("ah")
    })

    $("#btn-theme").click(()=>{
        toggleTheme();
    })

    $("#btn-close-info").click(()=>{
        closeInfo();
    })
})
