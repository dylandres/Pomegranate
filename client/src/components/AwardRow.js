import React from 'react'
import '../style/Profilepage.css'
import AwardCard from './AwardCard.js'

export default function AwardRow(props) {
    //props:
    //awards: [] length 1 to 3 inclusive
    return (
        <div className='award-row'>
            {props.awards[0] ? 
            <AwardCard awardName={props.awards[0].awardName} awardPicture={props.awards[0].awardPicture} description={props.awards[0].description}/>
            : <div></div>}
            {props.awards[1] ? 
            <AwardCard awardName={props.awards[1].awardName} awardPicture={props.awards[1].awardPicture} description={props.awards[1].description}/>
            : <div></div>}
            {props.awards[2] ? 
            <AwardCard awardName={props.awards[2].awardName} awardPicture={props.awards[2].awardPicture} description={props.awards[2].description}/>
            : <div></div>}
        </div>
    )
}
