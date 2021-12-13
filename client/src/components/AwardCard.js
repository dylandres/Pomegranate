import React from 'react'
import '../style/Profilepage.css'

export default function AwardCard(props) {
    //props:
    //awardName
    //awardPicture
    //description
    return (
        <div className='award-column'>
            <div className='award-card'>
            <b className='award-card-name'>{props.awardName}</b>
            <br></br>
            <img className='award-card-img' alt='award' src={props.awardPicture}></img>
            <div className='award-card-text'><p className='award-card-desc'>{props.description}</p></div>
            </div>
        </div>
    )
}
