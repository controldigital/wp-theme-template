/**
 * @module	./components/define
 */

// Import list.
import CustomElementsDefiner from 'Utilities/list.js';

// Import custom elements.
import HTMLCardElement from './card/Card.js';
import HTMLFabElement from './fab/Fab.js';
import HTMLLazyElement from './lazy/Lazy.js';
import HTMLLikeElement from './like/Like.js';
import HTMLMenuElement from './menu/Menu.js';
import HTMLMessageElement from './message/Message.js';
import HTMLModalElement from './modal/Modal.js';
import HTMLPanelElement from './tabs/Panel.js';
import HTMLScrollBarElement from './scrollbar/Scrollbar.js';
import HTMLSliderElement from './slider/Slider.js';
import HTMLSlideElement from './slider/Slide.js';
import HTMLTabsElement from './tabs/Tabs.js';
import HTMLTabElement from './tabs/Tab.js';
import HTMLTimeElement from './time/Time.js';
import HTMLToggleElement from './toggle/Toggle.js';
import HTMLTooltipElement from './tooltip/Tooltip.js';
import HTMLViewElement from './view/View.js';

/**
 * A list with names and constructors for custom elements.
 * 
 * @type {CustomElementsDefiner}
 */
const definer = new CustomElementsDefiner();

// Add ctrl-card element.
definer.add('ctrl-card', HTMLCardElement);

// Add ctrl-fab element.
definer.add('ctrl-fab', HTMLFabElement);

// Add ctrl-lazy element.
definer.add('ctrl-lazy', HTMLLazyElement);

// Add ctrl-menu element.
definer.add('ctrl-menu', HTMLMenuElement);

// Add ctrl-like element.
definer.add('ctrl-like', HTMLLikeElement);

// Add ctrl-message element.
definer.add('ctrl-message', HTMLMessageElement);

// Add ctrl-modal element.
definer.add('ctrl-modal', HTMLModalElement);

// Add ctrl-panel element.
definer.add('ctrl-panel', HTMLPanelElement);

// Add ctrl-scrollbar element.
definer.add('ctrl-scrollbar', HTMLScrollBarElement);

// Add ctrl-slider element.
definer.add('ctrl-slider', HTMLSliderElement,);

// Add ctrl-slide element.
definer.add('ctrl-slide', HTMLSlideElement,);

// Add ctrl-tabs element.
definer.add('ctrl-tabs', HTMLTabsElement);

// Add ctrl-tab element.
definer.add('ctrl-tab', HTMLTabElement);

// Add ctrl-time element.
definer.add('ctrl-time', HTMLTimeElement);

// Add ctrl-toggle element.
definer.add('ctrl-toggle', HTMLToggleElement);

// Add ctrl-tooltip element.
definer.add('ctrl-tooltip', HTMLTooltipElement);

// Add ctrl-view element.
definer.add('ctrl-view', HTMLViewElement);

// Export the definer as default.
export default definer;