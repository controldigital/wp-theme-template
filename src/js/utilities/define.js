/**
 * @module	./utilities/define
 */

// Import list.
import CustomElementsDefiner from 'Utilities/custom-elements.js';

// Import custom elements.
import HTMLAJAXFormElement from 'Components/ajax-form/AjaxForm.js';
import HTMLBannerElement from 'Components/banner (u)/Banner.js';
import HTMLCardElement from 'Components/card/Card.js';
import HTMLFabElement from 'Components/fab (u)/Fab.js';
import HTMLLazyElement from 'Components/lazy/Lazy.js';
import HTMLLikeElement from 'Components/like (u)/Like.js';
import HTMLMenuElement from 'Components/menu/Menu.js';
import HTMLMessageElement from 'Components/message (u)/Message.js';
import HTMLModalElement from 'Components/modal/Modal.js';
import HTMLPanelElement from 'Components/tabs/Panel.js';
import HTMLScrollBarElement from 'Components/scrollbar (u)/Scrollbar.js';
import HTMLSliderElement from 'Components/slider/Slider.js';
import HTMLSlideElement from 'Components/slider/Slide.js';
import HTMLTabsElement from 'Components/tabs/Tabs.js';
import HTMLTabElement from 'Components/tabs/Tab.js';
import HTMLTimeElement from 'Components/time (u)/Time.js';
import HTMLToggleElement from 'Components/toggle (u)/Toggle.js';
import HTMLTooltipElement from 'Components/tooltip (u)/Tooltip.js';
import HTMLViewElement from 'Components/view (u)/View.js';

/**
 * A list with names and constructors for custom elements.
 * 
 * @type {CustomElementsDefiner}
 */
const definer = new CustomElementsDefiner();

// Add ajax-form element.
definer.add('ajax-form', HTMLAJAXFormElement);

// Add banner element.
definer.add('banner', HTMLBannerElement);

// Add card element.
definer.add('card', HTMLCardElement);

// Add fab element.
definer.add('fab', HTMLFabElement);

// Add lazy element.
definer.add('lazy', HTMLLazyElement);

// Add menu element.
definer.add('menu', HTMLMenuElement);

// Add like element.
definer.add('like', HTMLLikeElement);

// Add message element.
definer.add('message', HTMLMessageElement);

// Add modal element.
definer.add('modal', HTMLModalElement);

// Add panel element.
definer.add('panel', HTMLPanelElement);

// Add scrollbar element.
definer.add('scrollbar', HTMLScrollBarElement);

// Add slider element.
definer.add('slider', HTMLSliderElement,);

// Add slide element.
definer.add('slide', HTMLSlideElement,);

// Add tabs element.
definer.add('tabs', HTMLTabsElement);

// Add tab element.
definer.add('tab', HTMLTabElement);

// Add time element.
definer.add('time', HTMLTimeElement);

// Add toggle element.
definer.add('toggle', HTMLToggleElement);

// Add tooltip element.
definer.add('tooltip', HTMLTooltipElement);

// Add view element.
definer.add('view', HTMLViewElement);

// Export the definer as default.
export default definer;