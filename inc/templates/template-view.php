<?php
/**
 * Theme:				
 * Template:			template-view.php
 * Description:			
 */

?>

<template id="template-view">

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

        .container {
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr;
        }

        .container > * {
            grid-area: 1 / 1 / 2 / 2;
        }

    </style>

    <div class="container">

    </div>

</template>