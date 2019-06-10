<?php
/**
 * Theme:				
 * Template:			template-card.php
 * Description:			
 */

?>

<template id="template-card">

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

        .container {
            display: flex;
            flex-flow: column nowrap;
            border-radius: 4px;
            overflow: hidden;
        }

        .header {
            flex: 0 1 auto;
        }

        .body {
            flex: 1 1 100%;
        }

        .footer {
            flex: 0 1 auto;
        }

    </style>

    <article class="container">

        <header class="header">
            <figure class="thumbnail">
                <slot name="thumbnail"></slot>
            </figure>
            <slot name="title">
        </header>

        <div class="body">
            <slot name="body"></slot>
        </div>

        <footer class="footer">
            <slot name="footer"></slot>
        </footer>

    </article>

</template>