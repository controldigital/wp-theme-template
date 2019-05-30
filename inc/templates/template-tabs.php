<?php
/**
 * Theme:				
 * Template:			template-tabs.php
 * Description:			
 */

?>

<template id="template-tabs">

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
            width: 100%;
            height: 100%;
        }

    </style>

    <div role="tablist">
		<slot name="tab"></slot>
	</div>

	<slot name="panel"></slot>

</template>