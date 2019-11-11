<?php
/**
 * Theme:				
 * Template:			browser-check.php
 * Description:			Check if Browser is IE and show popup warning
 */
​
?>

<div id="browser-check">
    <style>

        #browser-check {
            display: none;
            position: fixed;
            top: 1.5rem;
            left: 1.5rem;
            max-height: 100%;
            max-width: 20rem;
            width: 100%;
            padding: 2rem 2rem 1.5rem;
            color:  #009DE5;
            background: #ffffff;
            box-shadow: 0 3px 6px rgba(0, 0 ,0 , 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
            z-index: 99;
        }
​
        #browser-check.is-active {
            display: block;
        }

    </style>

    <div>
        <h2 role="alert"><?php _e( 'Warning', THEME_TEXT_DOMAIN ); ?></h2>
        <p><?php _e( 'You are currently using an outdated web browser. Some features on this site might not work or may cause unexpected behavior. Update your browser to the latest version or use a more modern browser to use this site safely and optimally', THEME_TEXT_DOMAIN ); ?></p>
        <button id="browser-check-close" class="button button--primary js-close-check"><?php _e( 'Ignore', THEME_TEXT_DOMAIN ); ?></button>
    </div>
    
    <script>

        (function() {
            var browserCheck = document.getElementById('browser-check');
			var browserCheckButton = document.getElementById('browser-check-close');
            var version = checkForIE();
            function checkForIE() {
				var ua = window.navigator.userAgent;
				var msie = ua.indexOf('MSIE ');
                var trident = ua.indexOf('Trident/');
                var edge = ua.indexOf('Edge/');

				// IE 10 or older => return version number
				if (msie > 0) {
				    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
				}
			
				// IE 11 => return version number
				if (trident > 0) {
				    var rv = ua.indexOf('rv:');
				    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
				}
			
				// Edge (IE 12+) => return version number
				if (edge > 0) {
				    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
				}

				return false;
			}
            if (version === false || version > 17)  {
                return;
            } else {
                browserCheck.className += 'is-active';
            }
            browserCheckButton.onclick = function(event) {
				browserCheck.className = browserCheck.className.replace('is-active', '');
                event.preventDefault();
			};
        }());
	    
	</script>
​
</div>