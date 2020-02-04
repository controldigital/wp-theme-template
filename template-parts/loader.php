<?php
/**
 * Template:			loader.php
 * Description:			Splash screen for loading of page, uses inline styles to load extremely fast
 */

?>

<div id="loader">

    <style>

        #loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 1;
            visibility: visible;
            transition: opacity 350ms ease-in-out, transform 350ms ease-in-out, visibility 350ms ease-in-out;
            z-index: 99;
        }

        body.page-ready #loader {
            opacity: 0;
            visibility: hidden;
        }

        html.no-js #loader {
            display: none;
        }

    </style>

    <script>

        let timeout = null;

        const destroy = () => {
            const loader = document.getElementById('loader');
            loader.remove();
        };

        const hide = () => {
            document.body.classList.add('page-ready'); 
        };

        const loaded = () => {
            hide();
            setTimeout(destroy, 350);
            clearTimeout(timeout);
        }

        // Hide loader when page is done loading
        window.addEventListener('load', (e) => { 
            loaded();
        });

        timeout = setTimeout(loaded, 4000);

    </script>

    <div class="loader-inner"></div>
</div>