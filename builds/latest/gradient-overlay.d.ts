/**
 * GradientOverlay.JS
 * @author: Tom Flidr | tomflidr(at)gmail(dot)com
 * @url: https://github.com/tomFlidr/gradient-overlay.js
 * @licence: https://tomflidr.github.io/gradient-overlay.js/LICENCE.txt
 * @version: 1.1.0
 * @date: 2021-01-22
 * @example: GradientOverlay.Process(document.querySelectorAll('.footer-div'), ['#000000', '#ff0000']);
*/
declare class GradientOverlay {
	public static readonly GRADIENT_OVERLAY_ID: string;
	public static DIV_ELM_RENDERED_CLASSNAME: string;
	public static Process (querySelectorResult: GradientOverlay.QuerySelectorResult, colors: GradientOverlay.Colors, handler?: (evnt: GradientOverlay.Event) => void): GradientOverlay;
	public static GetInstance (elm: HTMLElement): GradientOverlay;
	public static AddAllItemsRenderedHandler (handler: (evnt: GradientOverlay.Event) => void): typeof GradientOverlay;
	public constructor (querySelectorResult: GradientOverlay.QuerySelectorResult, colors: GradientOverlay.Colors, handler?: (evnt: GradientOverlay.Event) => void);
	public Process (querySelectorResult: GradientOverlay.QuerySelectorResult, colors: GradientOverlay.Colors, handler?: (evnt: GradientOverlay.Event) => void): void;
}
declare namespace GradientOverlay {
	declare class Event {
		StartTimestamp: number;
		DomLoadedTimestamp: number;
		AllRenderedTimestamp: number;
		DomLoadedTime: number;
		AllRenderedTime: number;
	}
	declare type QuerySelectorResult = Element | HTMLElement | HTMLImageElement | NodeListOf<HTMLElement>;
	declare type Colors = string[] | [string, string, string][] | [number, number, number][];
}
