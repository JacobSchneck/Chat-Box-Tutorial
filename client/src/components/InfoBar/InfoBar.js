import React from 'react';
import './InfoBar.css';
import onlineIcon from '../../Icons/onlineIcon.png';
import closeIcon from '../../Icons/closeIcon.png';


const InfoBar = ({ room }) => {
	return (
		<div className="infoBar">
			<div className="leftInnerContainer">
				<img className="online" src={onlineIcon} alt="online image"/>
				<h3>{room}</h3>
			</div>
			<div className="rightInnerContainer">
				<a href="/"><img src={closeIcon} alt="close image" /></a>
			</div>
		</div>
	);
}

export default InfoBar;