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

        span {
            display: none;
        }

        :host([year]) #year,
        :host([month]) #month,
        :host([week]) #week,
        :host([days]) #days,
        :host([hours]) #hours,
        :host([minutes]) #minutes,
        :host([seconds]) #seconds {
            display: block;
        }

    </style>

    <div>
        <span id="years"></span>
        <span id="months"></span>
        <span id="weeks"></span>
        <span id="days"></span>
        <span id="hours"></span>
        <span id="minutes"></span>
        <span id="seconds"></span>
    </div>

</template>