import React,{useState,useEffect} from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'


const NotesListPage = () => {

    // useState returns this array and we use them.
    let [notes,setNotes]=useState([]) //This is initial state of our application or components
    
    useEffect(()=>{
        getNotes()
    }, [])

    let getNotes=async ()=>{
        // here we fetch api.ie go to notes abd fetch data .We make a get request
    //   cors error came as in django server allowed to fetch was localhost 8000 but react in 3000 so it prevent it from fetching data.so we install django cors 
    // let response=await fetch('http://127.0.0.1:8000/api/notes/') //await means we will wait for data to come back then we parse it.
       
    // Now we will create a proxy url as when we deploy app then its not good for everyone to change in url so we use react router dom for it
    let response=await fetch('/api/notes/') //await means we will wait for data to come back then we parse it.
       let data=await response.json() 
    //    console.log('Data:',data);
       setNotes(data)
    }

  return (
    <div className='notes'>
        <div className='notes-header'>
            {/* &# 9782 is the hex code for symbol  */}
            <h2 className='notes-title'> &#9782; Notes</h2>
            {/* It tells no of notes we currently have */}
            <p className='notes-count'>{notes.length}</p>
        </div>

        {/* Now our notes contains all the data from notes list */}
        <div className='notes-list'>
            {/* .map bcse we gonna loop through all of our nodes and printing all the data. */}
            {/* every single item needs a key. */}
            {notes.map((note,index)=> (
                // <h3 key={index}>{note.body}</h3>
               <ListItem key={index} note={note}/>
            ))}
        </div>
        {/* For creating new note */}
        <AddButton/>
    </div>
  )
}

export default NotesListPage
