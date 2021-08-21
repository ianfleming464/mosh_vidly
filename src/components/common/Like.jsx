import React, { Component } from 'react';

const Like = (props) => {
	const { liked, onClick } = props;
	let classes = 'fa fa-heart';
	if (!liked) classes += '-o';
	return (
		<i
			onClick={props.onClick}
			className={classes}
			style={{ cursor: 'pointer' }}
			aria-hidden='true'></i>
	);
};

export default Like;
