import React from 'react'
import { Link } from 'react-router-dom'


let getTime=(note)=>{
    return new Date(note.updated).toLocaleDateString()
}

// now we want that our list should contain a title
let getTitle= (note)=>{
    let title=note.body.split('\n')[0]; //here we want to split our message into new line and take first line as title

    if(title.length>45){
        return title.slice(0,45);
    }
    return title
}

let getContent=(note)=>{
    let title=getTitle(note)
    // here we will trim all our newlines.
    let content=note.body.replaceAll('\n',' ')
    // since we need to replace the title
    content=content.replace(title,'')
    if(content.length >50){
        return content.slice(0,45) +'...'
    }
    else
    {
        return content
    }
}

const ListItem = ({note}) => {
  return (
    // <div>
    // Now when we click this it works as a link and it render our /note/1 or/2 and its data called.
    <Link to={`/note/${note.id}`}>
        <div className='notes-list-item'>
            <h3>{getTitle(note)}</h3>
            {/* note.updated will generate timestamp */}
            <p><span>{getTime(note)}</span>{getContent(note)}</p>
            {/* <h3>{note.body}</h3> */}


        </div>
    
    </Link>
  )
}

export default ListItem
