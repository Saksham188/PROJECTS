import React,{useState,useEffect} from 'react'
import { Link} from 'react-router-dom';
// Here we using aliasing
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'


const NotePage = ({match,history}) => {


    // here we trying to access the id of page so we can render content accordingly.
    let noteId=match.params.id;
    let [note,setNote]=useState(null)

    // use effect tells what ur function needs to do after rendering.
    useEffect(()=>{
        getNote()
    },[noteId])


    // It will call the database
    let getNote =async()=>{

       if(noteId==='new') return;

        // here to take value use ${} and then we can take val of variable
       let response=await fetch(`/api/notes/${noteId}/`)
       let data=await response.json()
       setNote(data)
    
    }  

    let createNote= async()=>{
      // here to take value use ${} and then we can take val of variable
      // now we make api restful ,restful means url not change its localhost 
      // fetch(`/api/notes/create/`,{
      fetch(`/api/notes/`,{
      method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
      })   
    } 

    // // async as we will make fetch request.
    let updateNote= async()=>{
        // here to take value use ${} and then we can take val of variable
          // fetch(`/api/notes/${noteId}/update/`,{
          fetch(`/api/notes/${noteId}/`,{
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(note)
       })

    
    }  

    let deleteNote=async()=>{
      // fetch(`/api/notes/${noteId}/delete/`,{
      fetch(`/api/notes/${noteId}/`,{
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },

      })
      history.push('/')
    }

    // Now we want note to get updated when we click on backlink.
    let handleSubmit=async()=>{
      // check if user deleted all content note get deleted.
      if(noteId !=='new' && note.body==='')
      {
        // when there is just 1 element in note then status is not getting updated
        await deleteNote()
      }
      else if(noteId!=='new')
      {
        await updateNote()
      }
      else if(noteId ==='new' && note.body!=null){
        await createNote()
      }

      // ie here will send user to home page
      history.push('/')
    }

    let handleChange = (value)=>{
      setNote(note=> ({...note,'body': value}))
      console.log("Handle Change:",note);
    }

    return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          {/* ie if someone clicks the link on note page he goes to home page. */}
          {/* <Link to="/"> */}
            <ArrowLeft onClick={handleSubmit}/>
          {/* </Link> */}
        </h3>
          {/* now we want that when user create new note he doesnt see delete note option. */}
            {noteId !== 'new' ?(
              <button onClick={deleteNote}>Delete</button>

            ): (
              // Now it will call handleSubmit and it do work accordingly
              <button onClick={handleSubmit}>Done</button>
            )}
      </div>

      {/* <h1>Single Note {noteId.id}</h1> */}
      {/* <p>{note?.body}</p> */}
      {/* on each state we wanna update state ie change our note area */}
      {/* Here when we writing new text in note page note gets updated and we want to send it to backend. */}
      {/* now here state is not getting set when only there is single element in note */}
      <textarea onChange={(e)=>{handleChange(e.target.value)}} value={note?.body}></textarea>

    </div>
  )
}

export default NotePage
