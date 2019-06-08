<?php
/**
 * Theme:
 * Template:			template-message.php
 * Description:	
 */

?>

<template id="template-message">

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

	</style>

	<slot name="description"></slot>

</template>