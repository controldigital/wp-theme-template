<?php
/**
 * Theme:				
 * Template:			splash.php
 * Description:			Splash screen for loading of page, uses inline styles to load extremely fast
 */

?>

<!-- Start splash -->
<div id="splash">

    <style>

        #splash {
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

        body.page-ready #splash {
            opacity: 0;
            visibility: hidden;
        }

        html.no-js #splash {
            display: none;
        }

    </style>

    <script>

        let timeout = null;

        const destroy = () => {
            const splash = document.getElementById('splash');
            splash.remove();
        };

        const hide = () => {
            document.body.classList.add('page-ready'); 
        };

        const loaded = () => {
            hide();
            setTimeout(destroy, 350);
            clearTimeout(timeout);
        }

        // Hide splash when page is done loading
        window.addEventListener('load', (e) => { 
            loaded();
        });

        timeout = setTimeout(loaded, 4000);

    </script>

    <div class="splash-inner"></div>
</div>
<!-- End splash -->