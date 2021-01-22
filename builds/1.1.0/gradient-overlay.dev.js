/**
 * GradientOverlay.JS
 * @author: Tom Flidr | tomflidr(at)gmail(dot)com
 * @url: https://github.com/tomFlidr/gradient-overlay.js
 * @licence: https://tomflidr.github.io/gradient-overlay.js/LICENCE.txt
 * @version: 1.1.0
 * @date: 2021-01-22
 * @example: GradientOverlay.Process(document.querySelectorAll('.footer-div'), ['#000000', '#ff0000']);
*/

GradientOverlay = (function(){
	
	var startTime = +new Date;
	
	Function.prototype.bind||(Function.prototype.bind=function(a){if(typeof this!=='function'){throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');}var b=[].slice,c='prototype',d=b.call(arguments,1),e=this,f=function(){},g=function(){return e.apply(this instanceof f?this:a,d.concat(b.call(arguments)))};if(this[c]){f[c]=this[c]}g[c]=new f();return g});
	
	String.prototype.trim=function(c){var d=" \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000",a;var b=this+"";c&&(d=(c+"").replace(/([[\]().?/*{}+$^:])/g,"$1"));c=b.length;for(a=0;a<c;a++)if(-1===d.indexOf(b.charAt(a))){b=b.substring(a);break}c=b.length;for(a=c-1;0<=a;a--)if(-1===d.indexOf(b.charAt(a))){b=b.substring(0,a+1);break}return-1===d.indexOf(b.charAt(0))?b:""};
	
	var ContentLoaded = function (c, h) {
        function k() {
            try {
                l.doScroll("left")
            } catch (a) {
                setTimeout(k, 50);
                return
            }
            d("poll")
        }
        function d(a) {
            if (
				"readystatechange" != a.type || 
				"complete" == b.readyState
			)
				("load" == a.type ? c : b)[p](e + a.type, d, !1), 
				!m && 
				(m = !0) && 
				h.call(c, a.type || a)
        }
        var m = !1,
        	top = !0,
        	b = c.document,
        	l = b.documentElement,
        	f = b.addEventListener,
        	g = f ? "addEventListener" : "attachEvent",
        	p = f ? "removeEventListener" : "detachEvent",
        	e = f ? "" : "on";
        if ("complete" == b.readyState) h.call(c, "lazy");
        else {
            if (!f && l.doScroll) {
                try {
                    top = !c.frameElement
                } catch (a) {}
                top && k()
            }
            b[g](e + "DOMContentLoaded", d, !1);
            b[g](e + "readystatechange", d, !1);
            c[g](e + "load", d, !1)
        }
	};
	
	var Colors = {
		HexToRgb: function (hex) {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			} : null;
		},
		RgbToHsl: function (rgb) {
			var r = rgb[0] / 255, 
				g = rgb[1] / 255, 
				b = rgb[2] / 255,
				max = Math.max(r, g, b), 
				min = Math.min(r, g, b),
				h, 
				s, 
				l = (max + min) / 2;
			if (max == min) {
				h = s = 0; // achromatic
			} else {
				var d = max - min;
				s = l > 0.5 
					? d / (2 - max - min) 
					: d / (max + min);
				switch (max) {
					case r: h = (g - b) / d + (g < b ? 6 : 0); break;
					case g: h = (b - r) / d + 2; break;
					case b: h = (r - g) / d + 4; break;
				}
				h /= 6;
			}
			return [h, s, l];
		}
	};
	
	var GradientOverlay = (function () {
		var instance = null;
		return function GradientOverlay () {
			var args = [].slice.apply(arguments);
			if (this === window) return new GradientOverlay();
			if (instance === null) {
				this._singletonConstructor();
				this.Process.apply(this, args);
			} else {
				this.Process.apply(instance, args);
			}
			return instance || (instance = this);
		}
	}());
	GradientOverlay.UNKNOWN_QUERY_SELECTOR_ERROR_MSG = "Unknown query selector result as first argument of 'GradientOverlay.Process(); function'.";
	GradientOverlay.GRADIENT_OVERLAY_ID = 'GRADIENT_OVERLAY_ID';
	GradientOverlay.GRADIENT_OVERLAY_COUNTER = 1;
	GradientOverlay.TYPE_IMG = 1;
	GradientOverlay.TYPE_DIV = 2;
	GradientOverlay.DIV_ELM_RENDERED_CLASSNAME = 'ok';
	GradientOverlay.MSIE_VERSION = (function () {
		var ua = window.navigator.userAgent,
			pos = 0, rv = 0;
		// IE 10 or older => return version number
		pos = ua.indexOf('MSIE ');
		if (pos > -1) return parseInt(ua.substring(pos + 5, ua.indexOf('.', pos)), 10);
		// IE 11 => return version number
		pos = ua.indexOf('Trident/');
		if (pos > -1) {
			rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}
		// Edge (IE 12+) => return version number
		pos = ua.indexOf('Edge/');
		if (pos > -1) return parseInt(ua.substring(pos + 5, ua.indexOf('.', pos)), 10);
		// other browsers
		return 0;
	})();
	GradientOverlay._contentLoaded = 0;
	GradientOverlay._contentLoadedHandlers = [];
	GradientOverlay._contentLoadedHandler = function () {
		GradientOverlay._contentLoaded = +new Date;
		for (var i = 0, l = GradientOverlay._contentLoadedHandlers.length; i < l; i += 1) 
			GradientOverlay._contentLoadedHandlers[i]();
	};
	GradientOverlay._notRenderedInstancesCount = 0;
	GradientOverlay._allItemsRenderedHandlers = [];
	GradientOverlay._instanceRendered = function () {
		GradientOverlay._notRenderedInstancesCount -= 1;
		if (GradientOverlay._notRenderedInstancesCount === 0) {
			var now = +new Date,
				domLoadedTime = GradientOverlay._contentLoaded - startTime,
				allRenderedTime = now - GradientOverlay._contentLoaded,
				evnt = {
					'StartTimestamp': startTime,
					'DomLoadedTimestamp': GradientOverlay._contentLoaded,
					'AllRenderedTimestamp': now,
					'DomLoadedTime': domLoadedTime / 1000,
					'AllRenderedTime': allRenderedTime / 1000,
				};
			GradientOverlay._allItemsRenderedHandlers.forEach(function(item){
				item(evnt);
			});
		}
	};
	GradientOverlay.Process = function (querySelectorResult, colors, callback) {
		return GradientOverlay().Process(querySelectorResult, colors, callback);
	};
	GradientOverlay.GetInstance = function (elm) {
		return GradientOverlay().GetInstance(elm);
	};
	GradientOverlay.AddAllItemsRenderedHandler = function (handler) {
		GradientOverlay._allItemsRenderedHandlers.push(handler);
		return GradientOverlay;
	};
	GradientOverlay.prototype = {
		'GetInstance': function (elm) {
			return this._instances[elm[GradientOverlay.GRADIENT_OVERLAY_ID]];
		},
		_singletonConstructor: function () {
			this._instances = {};
			this._canvasSupport = !!document.createElement('canvas');
			if (!this._canvasSupport) console.error('Canvas element is not supported by this browser.');
		},
		_initColors: function (colors) {
			var item = null,
				result = true;
			for (var i = 0, l = colors.length; i < l; i += 1) {
				item = colors[i];
				if (typeof(item) == 'string') {
					item = Colors.HexToRgb(item);
					if (!item) {
						result = false;
						console.error('Wrong hexadecimal color format: ' + colors[i]);
						break;
					}
					colors[i] = item;
				} else if (typeof(item) == 'object' && item.length) {
					if (item.length != 3) {
						result = false;
						console.error('Wrong rgb color format: ' + JSON.encode(item));
						break;
					}
					colors[i] = {
						r: item[0],
						g: item[1],
						b: item[2]
					}
				}
			}
			return {
				success: result, 
				data: colors
			};
		},
		_initGradient: function (colors) {
			var gradient = [],
				diffs = {
					r: colors[1].r - colors[0].r,
					g: colors[1].g - colors[0].g,
					b: colors[1].b - colors[0].b
				},
				mod = 0.0;
			for (var i = 0, l = 256; i < l; i += 1) {
				mod = 1 / 256 * i;
				gradient.push([
					colors[0].r + (mod * diffs.r),
					colors[0].g + (mod * diffs.g),
					colors[0].b + (mod * diffs.b)
				]);
			}
			return gradient;
		},
		'Process': function (querySelectorResult, colors, callback) {
			if (!this._canvasSupport) return;
			if (!querySelectorResult) {
				if (colors) console.error(GradientOverlay.UNKNOWN_QUERY_SELECTOR_ERROR_MSG);
				return;
			}
			var node = typeof(querySelectorResult.nodeType) == 'number',
				colorsResult = this._initColors(colors),
				gradient = [];
			if (!colorsResult.success) return;
			gradient = this._initGradient(colorsResult.data);
			if (!node && querySelectorResult.length) {
				for (var i = 0, l = querySelectorResult.length; i < l; i += 1) 
					this._processInstance(querySelectorResult[i], gradient, callback);
			} else if (node) {
				this._processInstance(querySelectorResult, gradient, callback);
			} else {
				console.error(GradientOverlay.UNKNOWN_QUERY_SELECTOR_ERROR_MSG);
			}
		},
		_processInstance: function (elm, gradient, callback) {
			if (elm[GradientOverlay.GRADIENT_OVERLAY_ID]) return;
			var id = 'id' + (GradientOverlay.GRADIENT_OVERLAY_COUNTER += 1);
			GradientOverlay._notRenderedInstancesCount += 1;
			this._instances[id] = new GradientOverlay.Element(id, elm, gradient, callback);
		}
	};
	
	GradientOverlay.Element = function (id, elm, gradient, callback) {
		this._id = id;
		this._elm = elm;
		this._gradient = gradient;
		this._callback = callback;
		this._elm[GradientOverlay.GRADIENT_OVERLAY_ID] = id;
		this._type = elm.nodeName.toLowerCase() == 'img' 
			? GradientOverlay.TYPE_IMG
			: GradientOverlay.TYPE_DIV;
		this._img = null;
		this._canvas = null;
		this._ctx = null;
		this._imgUrl = '';
		this._imageNaturSizes = {
			width: 0, height: 0
		};
		this._targetSizes = {
			nodata: false,
			cover: false,
			contain: false,
			width: {fix: true, raw: .0, val: 0},
			height: {fix: true, raw: .0, val: 0}, 
		};
		this._canvasPositions = {
			x: {fix: true, raw: .0, val: 0}, 
			y: {fix: true, raw: .0, val: 0}
		};
		this._canvas = document.createElement('canvas');
		this._ctx = this._canvas.getContext('2d');
		this._loadImageOrDivBackgroundImage();
	};
	GradientOverlay.Element.prototype = {
		
		_loadImageOrDivBackgroundImage: function () {
			if (this._type == GradientOverlay.TYPE_IMG) {
				var hiddenImg = document.createElement('img');
				this._img = hiddenImg;
				hiddenImg.addEventListener('load', this._onLoadHandlerImageElement.bind(this));
				this._imgUrl = this._elm.src;
				hiddenImg.src = this._imgUrl;
			} else if (this._type == GradientOverlay.TYPE_DIV) {
				if (GradientOverlay._contentLoaded) {
					this._onLoadHandlerDomContent();
				} else {
					GradientOverlay._contentLoadedHandlers.push(this._onLoadHandlerDomContent.bind(this));
				}
			}
		},
		
		/** image onload, document onload, hidden images onload and window onresize handling **********/
		
		_onLoadHandlerImageElement: function () {
			this._parseImageNaturSizes();
			this._processRedrawImageElementToCanvas();
			this._processGradientOverlayOnCanvasContent();
			this._finalizeImageAndCanvasVisibility();
			this._finalizeRunInstanceCallback();
		},
		_onLoadHandlerDomContent: function () {
			var img = document.createElement('img'),
				divStyle = window.getComputedStyle(this._elm);
			this._parseDivBackgroundUrl(divStyle);
			this._parseDivBackgroundRawPositions(divStyle);
			this._parseDivBackgroundRawSizes(divStyle);
			/*
			img.style.position = 'absolute';
			img.style.top = '-10000px';
			img = document.body.insertBefore(img, document.body.firstChild);
			*/
			img.addEventListener('load', this._onLoadHandlerDivBgImage.bind(this));
			this._img = img;
			img.src = this._imgUrl;
		},
		_onLoadHandlerDivBgImage: function () {
			this._parseImageNaturSizes();
			this._onLoadAndOnResizeHandlerDivBgImage();
			if (GradientOverlay.MSIE_VERSION) {
				var timeoutId = 0;
				window.addEventListener('resize', function() {
					clearTimeout(timeoutId);
					timeoutId = setTimeout(function () {
						this._onLoadAndOnResizeHandlerDivBgImage();
					}.bind(this), 100);
				}.bind(this));
			} else {
				window.addEventListener('resize', this._onLoadAndOnResizeHandlerDivBgImage.bind(this));	
			}
			this._finalizeDivBackgroundAndCanvasVisibility();
			this._finalizeRunInstanceCallback();
		},
		_onLoadAndOnResizeHandlerDivBgImage: function () {
			this._prepareDivBgSizes();
			this._prepareDivBgPositions();
			this._processRedrawDivBgImageToCanvas();
			this._processGradientOverlayOnCanvasContent();
		},
		
		/** css values parsing ************************************************************************/
		
		_parseImageNaturSizes: function () {
			var img = this._img,
				imageNaturSizes = this._imageNaturSizes,
				w = img.naturalWidth,
				h = img.naturalHeight;
			if (!w) w = img.offsetWidth;
			if (!h) h = img.offsetHeight;
			imageNaturSizes.width = w;
			imageNaturSizes.height = h;
		},
		_parseDivBackgroundUrl: function (divStyle) {
			var bgStr = 'background',
				backgroundImage = this._parseCssValue(divStyle, bgStr+'-image');
			if (!backgroundImage) backgroundImage = this._parseCssValue(divStyle, bgStr);
			this._imgUrl = backgroundImage.replace(/url\(([^\)]*)\)/g, "$1").trim("\"'");
			if (this._imgUrl === 'none') console.error('Element has no `background` or `background-image` css property defined.', this._elm);
		},
		_parseDivBackgroundRawPositions: function (divStyle) {
			var bgPosStr = 'background-position-',
				xBgPos = this._parseCssValue(divStyle, bgPosStr+'x'),
				yBgPos = this._parseCssValue(divStyle, bgPosStr+'y'),
				canvasXPos = this._canvasPositions.x,
				canvasYPos = this._canvasPositions.y;
			if (xBgPos.indexOf('left') > -1) xBgPos = '100%';
			if (xBgPos.indexOf('center') > -1) xBgPos = '50%';
			if (xBgPos.indexOf('right') > -1) xBgPos = '0%';
			canvasXPos.raw = parseFloat(xBgPos);
			if (xBgPos.indexOf('%') > -1) {
				canvasXPos.fix = false;
				canvasXPos.raw /= 100;
			}
			if (yBgPos.indexOf('top') > -1) yBgPos = '100%';
			if (yBgPos.indexOf('middle') > -1) yBgPos = '50%';
			if (yBgPos.indexOf('bottom') > -1) yBgPos = '0%';
			canvasYPos.raw = parseFloat(yBgPos);
			if (yBgPos.indexOf('%') > -1) {
				canvasYPos.fix = false;
				canvasYPos.raw /= 100;
			}
		},
		_parseDivBackgroundRawSizes: function (divStyle) {
			var divStyle = window.getComputedStyle(this._elm),
				targetSizes = this._targetSizes,
				backgroundSize = this._parseCssValue(divStyle, 'background-size'),
				backgroundSizes = [],
				result = [],
				resultItem = {},
				itemStr = '',
				itemFloat = 0.0,
				fixedValue = true,
				autoStr = 'auto';
			if (backgroundSize == 'auto' || !backgroundSize.length) {
				targetSizes.nodata = true;
				return;
			}
			if (backgroundSize == 'cover') {
				targetSizes.cover = true;
				return;
			}
			if (backgroundSize == 'contain') {
				targetSizes.contain = true;
				return;
			}
			backgroundSizes = backgroundSize.split(' ');
			if (backgroundSizes.length === 1) backgroundSizes[1] = 'auto';
			for (var i = 0, l = backgroundSizes.length; i < l; i += 1) {
				itemFloat = .0;
				itemStr = backgroundSizes[i];
				resultItem = {
					percentage: itemStr.indexOf('%') > -1,
					auto: false,
					raw: itemFloat,
					val: .0
				}
				result[i] = resultItem;
				if (itemStr == autoStr) {
					resultItem.auto = true;
					continue;
				}
				resultItem.raw = parseInt(itemStr, 10);
			}
			targetSizes.width = result[0];
			targetSizes.height = result[1];
		},
		_parseDivBorderSizes: function (divStyle) {
			var borderStr = 'border-', widthStr = '-width', asFloat = true;
			return [
				this._parseCssValue(divStyle, borderStr+'top'+widthStr, asFloat),
				this._parseCssValue(divStyle, borderStr+'right'+widthStr, asFloat),
				this._parseCssValue(divStyle, borderStr+'bottom'+widthStr, asFloat),
				this._parseCssValue(divStyle, borderStr+'left'+widthStr, asFloat)
			]
		},
		_parseCssValue: function (elmComputedStyle, propertyName, asFloat) {
			var str = elmComputedStyle.getPropertyValue(propertyName).replace(' !important','').trim();
			if (asFloat) return parseFloat(str);
			return str;
		},
		
		/** preparing exact sizes for onload and resize canvas drawing and pixel processing ***********/ 
		
		_prepareDivBgSizes: function () {
			var autoStr = 'auto',
				elm = this._elm,
				divStyle = null,
				elmWidth = elm.offsetWidth,
				elmHeight = elm.offsetHeight,
				imageNaturSizes = this._imageNaturSizes,
				imgNaturWidth = imageNaturSizes.width,
				imgNaturHeight = imageNaturSizes.height,
				targetSizesWidth = this._targetSizes.width,
				targetSizesHeight = this._targetSizes.height;
			if (this._targetSizes.nodata) {
				targetSizesWidth.val = imgNaturWidth;
				targetSizesHeight.val = imgNaturHeight;
			} else if (this._targetSizes.contain) {
				this._prepareDivBgSizesToContain(
					targetSizesWidth, targetSizesHeight, 
					imgNaturWidth, imgNaturHeight, 
					elmWidth, elmHeight
				);
			} else if (this._targetSizes.cover) {
				this._prepareDivBgSizesToCover(
					targetSizesWidth, targetSizesHeight, 
					imgNaturWidth, imgNaturHeight, 
					elmWidth, elmHeight
				);
			} else {
				divStyle = window.getComputedStyle(elm);
				this._prepareDivBgSize(targetSizesWidth, elmWidth, divStyle, 0);
				this._prepareDivBgSize(targetSizesHeight, elmHeight, divStyle, 1);
				//source:400x300 => target:AUTOx200 => calc:400/300*200
				if (targetSizesWidth.auto) {
					targetSizesWidth.val = Math.round(
						imageNaturSizes.width/imageNaturSizes.height*targetSizesHeight.val
					);
				}
				//source:400x300 => target:200xAUTO => calc:300/400*200
				if (targetSizesHeight.auto) 
					targetSizesHeight.val = Math.round(
						imageNaturSizes.height/imageNaturSizes.width*targetSizesWidth.val
					);
			}
		},
		_prepareDivBgSizesToContain: function (targetWidth, targetHeight, imgNaturWidth, imgNaturHeight, elmWidth, elmHeight) {
			if (imgNaturWidth > elmWidth) {
				targetWidth.val = elmWidth;
				targetHeight.val = elmWidth / imgNaturWidth * imgNaturHeight;
				if (targetHeight.val > elmHeight) {
					targetHeight.val = elmHeight;
					targetWidth.val = elmHeight / imgNaturHeight * imgNaturWidth;
				}
			} else if (imgNaturHeight > elmHeight) {
				targetHeight.val = elmHeight;
				targetWidth.val = elmHeight / imgNaturHeight * imgNaturWidth;
				if (targetWidth.val > elmWidth) {
					targetWidth.val = elmWidth;
					targetHeight.val = elmWidth / imgNaturWidth * imgNaturHeight;
				}
			}
		},
		_prepareDivBgSizesToCover: function (targetWidth, targetHeight, imgNaturWidth, imgNaturHeight, elmWidth, elmHeight) {
			if (imgNaturWidth < elmWidth) {
				targetWidth.val = elmWidth;
				targetHeight.val = elmWidth / imgNaturWidth * imgNaturHeight;
				if (targetHeight.val < elmHeight) {
					targetHeight.val = elmHeight;
					targetWidth.val = elmHeight / imgNaturHeight * imgNaturWidth;
				}
			} else if (imgNaturHeight < elmHeight) {
				targetHeight.val = elmHeight;
				targetWidth.val = elmHeight / imgNaturHeight * imgNaturWidth;
				if (targetWidth.val < elmWidth) {
					targetWidth.val = elmWidth;
					targetHeight.val = elmWidth / imgNaturWidth * imgNaturHeight;
				}
			} else if (imgNaturWidth > elmWidth) {
				targetWidth.val = elmWidth;
				targetHeight.val = elmWidth / imgNaturWidth * imgNaturHeight;
				if (targetHeight.val < elmHeight) {
					targetHeight.val = elmHeight;
					targetWidth.val = elmHeight / imgNaturHeight * imgNaturWidth;
				}
			} else if (imgNaturHeight > elmHeight) {
				targetHeight.val = elmHeight;
				targetWidth.val = elmHeight / imgNaturHeight * imgNaturWidth;
				if (targetWidth.val < elmWidth) {
					targetWidth.val = elmWidth;
					targetHeight.val = elmWidth / imgNaturWidth * imgNaturHeight;
				}
			}
		},
		_prepareDivBgSize: function (targetSizeItem, divSize, divStyle, i) {
			var bordersSizes = [],
				msieFix = GradientOverlay.MSIE_VERSION;
			if (msieFix) bordersSizes = this._parseDivBorderSizes(divStyle);
			if (targetSizeItem.percentage) {
				targetSizeItem.val = targetSizeItem.raw / 100 * divSize
			} else if (
				msieFix && divSize == targetSizeItem.raw + (
					i === 0 
						? bordersSizes[1] + bordersSizes[3] 
						: bordersSizes[0] + bordersSizes[2]
					)
			) {
				targetSizeItem.val = divSize;
			} else {
				targetSizeItem.val = targetSizeItem.raw;
			}
		},
		_prepareDivBgPositions: function () {
			var canvasXPos = this._canvasPositions.x,
				canvasYPos = this._canvasPositions.y;
			if (canvasXPos.fix) {
				canvasXPos.val = - canvasXPos.raw;
			} else {
				canvasXPos.val = - ((this._elm.offsetWidth - this._targetSizes.width.val) * canvasXPos.raw);
			}
			if (canvasYPos.fix) {
				canvasYPos.val = - canvasYPos.raw;
			} else {
				canvasYPos.val = - ((this._elm.offsetHeight - this._targetSizes.height.val) * canvasYPos.raw);
			}
			if (canvasXPos.val === -0) canvasXPos.val = 0;
			if (canvasYPos.val === -0) canvasYPos.val = 0;
		},
		
		/** canvas drawing and pixel processing *******************************************************/
		
		_processRedrawImageElementToCanvas: function () {
			var imageNaturSizes = this._imageNaturSizes,
				w = imageNaturSizes.width, 
				h = imageNaturSizes.height;
			this._canvas.width = w;
			this._canvas.height = h;
			this._ctx.drawImage(this._img, 0, 0, w, h, 0, 0, w, h);
		},
		_processRedrawDivBgImageToCanvas: function () {
			var imageNaturSizes = this._imageNaturSizes,
				targetSizes = this._targetSizes,
				targetWidth = targetSizes.width.val,
				targetHeight = targetSizes.height.val,
				w = this._elm.offsetWidth,
				h = this._elm.offsetHeight,
				canvasXPos = this._canvasPositions.x,
				canvasYPos = this._canvasPositions.y;
			this._resizedCanvas = document.createElement('canvas'),
			this._resizedCtx = this._resizedCanvas.getContext('2d');
			/*
			// DEVEL:
			this._resizedCanvas.style.position = 'absolute';
			this._resizedCanvas = document.body.insertBefore(this._resizedCanvas, document.body.firstChild);
			*/
			this._resizedCanvas.width = targetWidth;
			this._resizedCanvas.height = targetHeight;
			this._resizedCtx.drawImage(
				this._img, 
				0, 0, imageNaturSizes.width, imageNaturSizes.height,
				0, 0, targetWidth, targetHeight
			);
			this._canvas.width = w;
			this._canvas.height = h;
			
			this._ctx.drawImage(
				this._resizedCanvas, 
				Math.max(0, canvasXPos.val),
				Math.max(0, canvasYPos.val),
				w, h,
				canvasXPos.val < 0 ? Math.abs(canvasXPos.val) : 0, 
				canvasYPos.val < 0 ? Math.abs(canvasYPos.val) : 0, 
				w, h
			);
			/*
			var args = [
				this._resizedCanvas, 
				Math.max(0, canvasXPos.val),
				Math.max(0, canvasYPos.val),
				w, h,
				canvasXPos.val < 0 ? Math.abs(canvasXPos.val) : 0, 
				canvasYPos.val < 0 ? Math.abs(canvasYPos.val) : 0, 
				w, h
			];
			console.log(args, [this._resizedCanvas.width, this._resizedCanvas.height]);
			this._ctx.drawImage.apply(this._ctx, args);
			*/
		},
		_processGradientOverlayOnCanvasContent: function () {
			var w = this._canvas.width,
				h = this._canvas.height,
				imgData = this._ctx.getImageData(0, 0, w, h),
				data = imgData.data,
				i = 0,
				rgb = [],
				hsl = [],
				rgbIndex = 0,
				hslIndex = 0,
				index = 0;
			for (var y = 0; y < h; y += 1) {
				for (var x = 0; x < w; x += 1) {
					rgb = [data[i], data[i+1], data[i+2]];
					hsl = Colors.RgbToHsl(rgb);
					hslIndex = Math.round((hsl[2] * 255) - (hsl[1] * 127));
					if (hslIndex < 0) hslIndex = 0;
					rgbIndex = Math.round((rgb[0] + rgb[1] + rgb[2]) / 3);
					index = Math.round((rgbIndex + hslIndex) / 2);
					rgb = this._gradient[index];
					data[i] = rgb[0];
					data[i+1] = rgb[1];
					data[i+2] = rgb[2];
					i += 4;
				}
			}
			this._ctx.putImageData(imgData, 0, 0);
		},
		
		/** finalizing ********************************************************************************/
		
		_finalizeRunInstanceCallback: function () {
			if (this._callback) {
				var fn = this._callback;
				var now = +new Date,
					domLoadedTime = GradientOverlay._contentLoaded - startTime,
					allRenderedTime = now - GradientOverlay._contentLoaded,
					evnt = {
						'StartTimestamp': startTime,
						'DomLoadedTimestamp': GradientOverlay._contentLoaded,
						'AllRenderedTimestamp': now,
						'DomLoadedTime': domLoadedTime / 1000,
						'AllRenderedTime': allRenderedTime / 1000,
					};
				try {
					fn(evnt);
				} catch (e) {}
			}
		},
		_finalizeImageAndCanvasVisibility: function () {
			this._canvas = this._elm.parentNode.insertBefore(this._canvas, this._elm);
			this._elm.parentNode.removeChild(this._elm);
			this._canvas.className = this._elm.className+' '+GradientOverlay.DIV_ELM_RENDERED_CLASSNAME;
			this._img = null;
			GradientOverlay._instanceRendered();
		},
		_finalizeDivBackgroundAndCanvasVisibility: function () {
			var bgStr = 'background',
				divStyle = window.getComputedStyle(this._elm),
				background = this._parseCssValue(divStyle, bgStr);
			this._canvas = this._elm.parentNode.insertBefore(this._canvas, this._elm);
			this._elm.style[bgStr+'-image'] = '';
			if (background.indexOf(this._img.src) > -1)
				this._elm.style.background = background.replace(/^(.*)url\(([^\)]*)\)(.*)$/g, "$1$3");
			if (this._img.parentNode) this._img.parentNode.removeChild(this._img);
			this._canvas.className = this._elm.className;
			this._elm.className += ' '+GradientOverlay.DIV_ELM_RENDERED_CLASSNAME;
			GradientOverlay._instanceRendered();
		}
	};
	
	ContentLoaded(window, GradientOverlay._contentLoadedHandler);
	
	return GradientOverlay;
})();