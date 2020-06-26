<?php
/**
 * Template:			loader.php
 * Description:			Splash screen for loading of page, uses inline styles to load extremely fast
 */

?>

<div id="loader" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; opacity: 1; visibility: visible; transition: opacity 300ms ease-in-out, transform 300ms ease-in-out, visibility 300ms ease-in-out; z-index: 99;background-color: #ffffff;">

    <div class="loader-inner"></div> 

    <script>

        const loader = document.getElementById('loader');
        let timeout = null;

        const destroy = () => {
            if (loader) {
                loader.remove();
            }
        };

        const hide = () => {
            document.body.classList.add('page-ready'); 
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        };

        const loaded = () => {
            hide();
            setTimeout(destroy, 300 );
            clearTimeout(timeout);
        }

        // Hide loader when page is done loading
        window.addEventListener('load', (e) => { 
            loaded();
        });

        timeout = setTimeout(loaded, 4000);

    </script>

</div>