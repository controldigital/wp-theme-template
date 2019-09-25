/**
 * @module		./utilities/AudioPlayer
 */

import { hasFeatures } from './tools.js';

/**
 * @function	isWebAudioAPISupported
 * @returns		{Boolean}
 */
export const isWebAudioAPISupported = () => hasFeatures('Web Audio API');

/**
 * AudioPlayer
 */
export class AudioPlayer {

	/**
	 * Creates an instance of an AudioPlayer class.
	 * 
	 * @constructor
	 * @param 		{AudioContext} audioContext 
	 * @returns		{void}
	 */
	constructor(audioContext) {
		if (isWebAudioAPISupported) {
			throw new Error('The Web Audio API is not supported in your browser');
		}
		if ('undefined' === typeof audioContext || !(audioContext instanceof AudioContext)) {
			throw new Error('audioContext parameter is not set or is not an instance of AudioContext');
		};
		this.ctx = audioContext;
		this.playing = false;
		this.source = null;
	}

	/**
	 * Decodes audio data with the decodeAudioData method.
	 * 
	 * @method		decode
	 * @param 		{ArrayBuffer} arrayBuffer 
	 * @returns		{Promise<ArrayBuffer>} 
	 */
	decode(arrayBuffer) {
		return new Promise((resolve) => {
			this.ctx.decodeAudioData(arrayBuffer, (buffer) => {
				resolve(buffer);
			});
		});
	}

	/**
	 * Loads the decoded ArrayBuffer into the AudioBufferSourceNode.
	 * 
	 * @method		loadBuffer
	 * @param 		{ArrayBuffer} buffer The decoded ArrayBuffer to play.
	 * @returns		{Promise<AudioBufferSourceNode>}
	 */
	loadBuffer(buffer) {
		return new Promise((resolve, reject) => {
			if ('undefined' === typeof buffer || (buffer instanceof ArrayBuffer)) {
				reject('buffer argument missing or not an instance of ArrayBuffer');
			};
			this.source = this.ctx.createBufferSource();
			this.source.buffer = buffer;
			resolve(buffer);
		});
	}

	/**
	 * Resets the buffer to the null value and destroys any AudioBufferSourceNode instance.
	 * 
	 * @method		resetBuffer
	 * @returns		{this}
	 */
	resetBuffer() {
		this.stop();
		this.source = null;
		return this;
	}

	/**
	 * Plays the currently loaded buffer of the AudioBufferSourceNode.
	 * Connects the AudioBufferSourceNode to the destination and starts it.
	 * 
	 * @method		play
	 * @param 		{ArrayBuffer} buffer The decoded ArrayBuffer to play.
	 * @returns		{Promise<AudioBufferSourceNode>}
	 */
	play(buffer) {
		return new Promise((resolve) => {
			if ('undefined' !== typeof buffer) {
				this.loadBuffer(buffer);
			}
			this.source.connect(this.ctx.destination);
			this.source.start(this.ctx.currentTime);
			this.source.addEventListener('ended', () => {
				this.playing = false;
				resolve(this.source);
			});
			this.playing = true;
		});
	}

	/**
	 * Stops the AudioBufferSourceNode if it is playing.
	 * It then disconnects it from the destination and sets the playing property to false.
	 * 
	 * @method		stop
	 * @returns		{this}
	 */
	stop() {
		if (this.playing !== true) {
			return;
		}
		this.source.stop(this.ctx.currentTime);
		this.source.disconnect();
		this.playing = false;
		return this;
	}

}