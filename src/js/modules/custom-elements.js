/**
 * @module		./modules/custom-elements
 */

// Import Web Component definer
import definer from 'Components/define.js';

/**
 * Use the custom elements module.
 * 
 * @function	useCustomElements
 * @returns		{Promise}
 */
const useCustomElements = () => definer.define();

// Export useCustomElements as default 
export default useCustomElements;