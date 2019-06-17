<?php
/**
 * Theme:				
 * Template:			template-time.php
 * Description:			
 */

?>

<template id="template-time">

    <style>

        *, 
		*::before, 
		*::after {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
		}

        :host {
            all: initial;
			display: block;
			contain: content;
        }

        div {
            display: flex;
            flex-flow: row nowrap;
            align-items: stretch;
        }

    </style>

    <div>
        <span id="year"></span>
        <span id="month"></span>
        <span id="week"></span>
        <span id="days"></span>
        <span id="hours"></span>
        <span id="minutes"></span>
        <span id="seconds"></span>
    </div>

</template>