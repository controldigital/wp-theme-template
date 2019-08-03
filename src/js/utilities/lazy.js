/**
 * @module		./utilities/lazy
 */

/**
 * Checks if an image has a data-src attribute and returns
 * a boolean based on that fact.
 * 
 * @function	isImageLazyLoadable
 * @param 		{HTMLImageElement} image The image to check
 * @returns		{Boolean}
 */
export const isImageLazyLoadable = image => image.hasAttribute('data-src');

/**
 * Change the data-src attributes of the sources into src attributes.
 * Returns an array with all the sources.
 * 
 * @function	lazyLoadSources
 * @param 		{HTMLSourceElement[]} sources List of <source> elements.
 * @returns		{HTMLSourceElement[]}
 */
export const lazyLoadSources = sources =>
	[...sources].forEach(source => {
		if (typeof source.tagName === 'string' && source.tagName === 'SOURCE') {
			const src = source.getAttribute('data-src');
			if (src !== null) {
				source.src = src;
				source.removeAttribute('data-src');
			}
		}
	});

/**
 * Lazy load an image by adding a src attribute with the value from the data-src attribute.
 * Also checks if the element has a srcset that needs to be lazyloaded.
 * Returns a Promise with the image element on resolve.
 * 
 * @function	lazyLoadImage
 * @param 		{HTMLImageElement} image Image element to lazyload.
 * @returns		{Promise<HTMLImageElement>} Promise with the image element on resolve.
 */
export const lazyLoadImage = image => 
	new Promise(resolve => {
		const protoImg = new Image();
		const sizes = image.getAttribute('sizes');
		const srcset = image.getAttribute('data-srcset');
		const src = image.getAttribute('data-src');
		const imageOnLoad = () => {
			if (srcset) {
				image.srcset = srcset;
			}
			image.src = src;
			image.removeAttribute('data-src');
			resolve(image);
		};
		protoImg.addEventListener('load', imageOnLoad, {once: true});
		if (sizes !== null) {
			protoImg.sizes = sizes;
		}
		if (srcset !== null) {
			protoImg.srcset = srcset;
		}
		protoImg.src = src;
	});

/**
 * Lazy load a picture element by changing the data-src of the sources and image inside
 * the picture element. The function returns a Promise with the picture element on resolve.
 * 
 * @function	lazyLoadPicture
 * @uses		lazyLoadSources
 * @uses		lazyloadImage
 * @param 		{HTMLPictureElement} picture Picture element to lazyload. 
 * @returns		{Promise<HTMLPictureElement>} Promise with the picture element on resolve.
 */
export const lazyLoadPicture = picture =>
	new Promise(resolve => {
		const sources = picture.querySelectorAll('source');
		const image = picture.querySelector('img');
		lazyLoadSources(sources);
		if (image !== null && isImageLazyLoadable(image)) {
			lazyLoadImage(image);
		}
		resolve(picture);
	});

/**
 * Lazy load an video by adding a adding a src attribute with the value from the data-src 
 * attribute that is found on the <source> tags inside the video element. 
 * The video is then loaded. When the video can be played through to the end without too
 * much buffering it will resolve a promise with the video element as its value.
 * 
 * @function	lazyLoadVideo
 * @uses		lazyLoadSources
 * @param 		{HTMLVideoElement} video Video element to lazy load.
 * @returns		{Promise<HTMLVideoElement>} Promise with the video element on resolve.
 */
export const lazyLoadVideo = video => 
	new Promise(resolve => {
		const videoOnCanPlayThrough = () => resolve(video);
		const sources = picture.querySelectorAll('source');
		lazyLoadSources(sources);
		video.addEventListener('canplaythrough', videoOnCanPlayThrough, {once: true});
		video.load();
	});

/**
 * Lazy load images that contain a data-src attribute
 * and shows them when they have loaded. Returns a Promise
 * that resolves with the image elements when all images have
 * been resolved.
 * 
 * @function	lazyLoadImages
 * @uses		isImageLazyLoadable
 * @uses		lazyLoadImage
 * @param 		{HTMLImageElement[]} [images=document.images] Array of images to load.
 * @returns		{Promise<HTMLImageElement[]>}
 */
export const lazyLoadImages = (images = document.images) => 
	Promise.all([...images].filter(isImageLazyLoadable).map(lazyLoadImage));