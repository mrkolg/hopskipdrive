jQuery(function() {
	initBrowserDetect(true, false);
	isAndroid();
	initMobileNav();
	initMobileNavOpener();
	initSlickSlider();
	// initAOS();
	initBtnPlayIframe();
	initCustomForms();
	initOpenClose();
	initStickBar();
	initPopupMessage();
	if(jQuery('.statistic').length){
		initCountUpDown();
	}
	// if(jQuery("#map").length) {
	// 	initMap();
	// }
	if(jQuery(".datepicker").length) {
		initDatepicker();
	}
	initFitVids();
	initMenuEmptyHeight();
	initDropDownForm();
	// initScrollClass();
});

jQuery(window).on('load resize orientationchange', function(){
	initTouchNav();
	if(innerWidth >= 1024){
		jQuery('#nav li.actives').find('.drop').css('display', 'none');
		jQuery('#nav li.actives').removeClass('actives');
	}
});

jQuery(window).on('load', function(){
	jQuery('.address_state label').append('<span class="gfield_required">*</span>');
	if(jQuery('.video-section').length){
		setTimeout(initVidYardPlayBtn, 200);

	}
})

function isAndroid(){
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1;
	if(isAndroid) {
		jQuery('html').addClass('android');
	}
}

/*
* Browser Detect script
*/
function initBrowserDetect(addVersionOS, addBrowserMinorVersion) {
	window.BrowserDetect = (function() {
		// script settings
		var options = {
			osVersion: addVersionOS,
			minorBrowserVersion: addBrowserMinorVersion
		};

		// browser data
		var browserData = {
			browsers: {
				edge: uaMatch(/ Edge\/([0-9\.]*)/),
				chrome: uaMatch(/Chrome\/([0-9\.]*)/),
				firefox: uaMatch(/Firefox\/([0-9\.]*)/),
				safari: uaMatch(/Version\/([0-9\.]*).*Safari/),
				opera: uaMatch(/Opera\/.*Version\/([0-9\.]*)/, /Opera\/([0-9\.]*)/),
				msie: uaMatch(/MSIE ([0-9\.]*)/, /Trident.*rv:([0-9\.]*)/)
			},
			engines: {
				edgehtml: uaContains(' Edge\/'),
				webkit: uaContains('AppleWebKit'),
				trident: uaMatch(/(MSIE|Trident)/),
				gecko: uaContains('Gecko'),
				presto: uaContains('Presto')
			},
			platforms: {
				win: uaMatch(/Windows NT ([0-9\.]*)/),
				mac: uaMatch(/Mac OS X ([0-9_\.]*)/),
				linux: uaContains('X11', 'Linux')
			}
		};

		// perform detection
		var ua = navigator.userAgent;
		var detectData = {
			platform: detectItem(browserData.platforms),
			browser: detectItem(browserData.browsers),
			engine: detectItem(browserData.engines)
		};

		// private functions
		function uaMatch() {
			var regs = Array.prototype.slice.apply(arguments);
			return function() {
				for (var i = 0, result; i < regs.length; i++) {
					result = regs[i].exec(ua);
					if (result) {
						return result[1];
					}
				}
			};
		}
		function uaContains(word) {
			var words = Array.prototype.slice.apply(arguments);
			return function() {
				for(var i = 0; i < words.length; i++) {
					if(ua.indexOf(words[i]) < 0) {
						return;
					}
				}
				return true;
			};
		}
		function detectItem(items) {
			var detectedItem = null, itemName, detectValue;
			for(itemName in items) {
				if(items.hasOwnProperty(itemName)) {
					detectValue = items[itemName]();
					if(detectValue) {
						return {
							name: itemName,
							value: detectValue
						};
					}
				}
			}
		}

		// add classes to root element
		(function() {
			// helper functions
			var addClass = function(cls) {
				var html = document.documentElement;
				html.className += (html.className ? ' ' : '') + cls;
			};
			var getVersion = function(ver) {
				return typeof ver === 'string' ? ver.replace(/\./g, '_') : 'unknown';
			};

			// add classes
			if(detectData.platform) {
				addClass(detectData.platform.name);
				if(options.osVersion) {
					addClass(detectData.platform.name + '-' + getVersion(detectData.platform.value));
				}
			}
			if(detectData.engine) {
				addClass(detectData.engine.name);
			}
			if(detectData.browser) {
				addClass(detectData.browser.name);
				addClass(detectData.browser.name + '-' + parseInt(detectData.browser.value, 10));
				if(options.minorBrowserVersion) {
					addClass(detectData.browser.name + '-' + getVersion(detectData.browser.value));
				}
			}
		}());

		// export detection information
		return detectData;
	}());
}

// handle flexible video size
function initFitVids() {
	jQuery('body').fitVids();
}

// vidyard play button lightbox
function initVidYardPlayBtn(){
	jQuery('.vidyard-lightbox-centering .play-button').append('<span>Watch Now</span>')
}

function initPopupMessage(){
	jQuery('.cta-popup .btn-close').on('click', function(){
		jQuery(this).closest('.cta-popup').fadeOut(400);
	})
}

// //initMap
// function initMap() {
// 	var locations = [
// 	[
// 	"P.O. Box 21-423",
// 	34.052232,
// 	-118.243685,
// 	"././assets/img/pin-dark.png",
// 	"Los Angeles",
// 	"CA 90021",
// 	"(844) 467 - 7547"
// 	]
// 	];
// 	var map = new google.maps.Map(document.getElementById("map"), {
// 		zoom: 10,
// 		center: new google.maps.LatLng(34.052232, -118.243685),
// 		mapTypeId: google.maps.MapTypeId.ROADMAP
// 	});
// 	var infoWindow = new google.maps.InfoWindow();
// 	var marker, i;
// 	for (i = 0; i < locations.length; i++) {
// 		var lat = locations[i][1];
// 		var lng = locations[i][2];
// 		var pin = locations[i][3];
// 		marker = new google.maps.Marker({
// 			position: new google.maps.LatLng(lat, lng),
// 			animation: google.maps.Animation.DROP,
// 			icon: pin,
// 			map: map
// 		});
// 		google.maps.event.addListener(marker, "click", (function(marker, i) {
// 			var title = (locations[i][0] !== undefined) ? locations[i][0] : '';
// 			var city = (locations[i][4] !== undefined) ? locations[i][4] : '';
// 			var address = (locations[i][5] !== undefined) ? locations[i][5] : '';
// 			var tel = (locations[i][6] !== undefined) ? locations[i][6] : '';
// 			var telCall = tel.replace(/[^+0-9]/g,'');
// 			// console.log(tel2);
// 			var html = ( (title !== '') ? "<h3>" + title + "</h3>" : title ) + ( (city !== '') ? "<h4>" + city + "</h4>" : city ) + ( (address !== '') ? "<p>" + address + "</p>" : address ) + ( (tel !== '') ? "<a href=tel:" + telCall + ">" + tel + "</a>" : tel ) ;

// 			return function() {
// 				infoWindow.setOptions({
// 					content:html
// 				});
// 				infoWindow.open(map, marker);
// 			};
// 		})(marker, i)
// 		);
// 	}
// }

// initialize custom form elements
function initCustomForms() {
	jcf.setOptions('Select', {
		fakeDropInBody: false,
	});
	jcf.replaceAll();
}

function initDatepicker() {
	jQuery('.datepicker button').datepicker({
		orientation: "bottom",
		autoHide: true,
		autoPick: true,
		container:'.datepicker .datetime',
		maxViewMode: "1",
		startDate: 'date',
		format:'mm ddth, yyyy',
	});
	var month = jQuery('.datepicker button').datepicker('getMonthName', true);
	var arr = [];
	arr = jQuery('.datepicker button').datepicker('getDate', true).split(" ");
	arr.splice(0, 1, month);
	var newDate = arr[0] + ' ' + arr[1] + ' ' + arr[2];
	jQuery(".datepicker button").html(newDate);
	jQuery(".datepicker button").on('pick.datepicker', function () {
		var month2 = jQuery('.datepicker button').datepicker('getMonthName', true);
		var arr2 = jQuery(this).datepicker('getDate', true).split(" ");
		arr2.splice(0, 1, month2);
		var newDate2 = arr2[0] + ' ' + arr2[1] + ' ' + arr2[2];
		setTimeout(function() {
			jQuery(".datepicker button").html(newDate2);
		}, 10);
	});
}

// Play Buttons for YouTube Videos
function initBtnPlayIframe(){

	jQuery('.video-fluid').find('iframe').attr('src','');

	jQuery('.btn-play-video').on('click touchstart', function(event){
		event.preventDefault();

		var videoBlock = jQuery('.video-fluid'),
		dataVideo = jQuery(this).closest(videoBlock).attr('data-video'),
		iframe = jQuery(this).closest(videoBlock).find('iframe'),

		videoBlockVidyard = jQuery('.video-fluid.vidyard'),
		iframeVidyard = jQuery(this).closest(videoBlockVidyard).find('iframe');

		videoBlock.find('iframe').attr('src','');
		videoBlock.removeClass('active');

		iframe.attr('src', dataVideo + '?&autoplay=1&rel=0&fs=0&showinfo=0&autohide=3&modestbranding=1');
		iframeVidyard.attr('src', dataVideo + '?disable_popouts=1&v=4.2.23&type=inline&autoplay=1');

		jQuery(this).closest(videoBlock).addClass('active');
	});

}

function initAOS(){
	AOS.init({
		disable: function () {
			var maxWidth = 1024;
			return window.innerWidth < maxWidth;
		}
	});
}

function initCountUpDown(){
	var options = {
		useEasing : true,
		useGrouping : true,
		separator : ',',
		suffix : ''
	};
	var target, dataText, key, text;
	var arr = [];
	jQuery('.counter-block').each(function(){
		target = jQuery(this).find('.counter').data('count');
		arr.push(target);
		for (key in options) {
			if (key == 'suffix'){
				dataText = jQuery(this).find('.counter').data('text');
				text = jQuery(this).find('.counter-text');
				text.html(dataText);
			}
		}
	});
	var target1 = new CountUp("target1", 0, arr[0], 0, 3.5);
	target1.start();
	var target2 = new CountUp("target2", 0, arr[1], 0, 4.5);
	target2.start();
	var target3 = new CountUp("target3", 0, arr[2], 0, 1.5);
	target3.start();
}

// mobile menu init
function initMobileNav() {
	ResponsiveHelper.addRange({
		'..1023': {
			on: function() {
				jQuery('body').mobileNav({
					menuActiveClass: 'nav-active',
					menuOpener: '.nav-opener',
					hideOnClickOutside: true,
					menuDrop: 'ul'
				});
			},
			off: function() {
				jQuery('body').mobileNav('destroy');
			}
		}
	});
}

// Slick Slider
function initSlickSlider() {
	jQuery('.slider').slick({
		slide: '.slide',
		infinite: true,
		draggable: true,
		autoplay:true,
		swipe: true,
		speed: 400,
		dots: false,
		arrows: true
	});
	jQuery('.hero-section-slider').slick({
		slide: '.slide',
		infinite: true,
		adaptiveHeight: true,
		autoplay:true,
		autoplaySpeed: 4000,
		speed: 500,
		dots: false,
		arrows: false,
		pauseOnHover: false,
		pauseOnFocus: false
	});
}

// init sticky block on single post page
function initStickBar(){
	jQuery(".sticky-block .social-networks").stick_in_parent({
		offset_top:20,
	});
};

// mobile navopener init
function initMobileNavOpener() {
	jQuery("#nav").find(".drop").parent('li').append('<span class="drop-opener"></span>');
	var opener = jQuery("#nav").find(".drop-opener").parent();
	jQuery("#nav").on("click", ".drop-opener", function() {
		var $this = jQuery(this);
		if ($this.parent().hasClass("actives")) {
			$this.parent().removeClass("actives").children('.drop').stop().slideUp();
		}else {
			$this.parent().siblings().removeClass("actives").children('.drop').stop().slideUp();
			$this.parent().addClass("actives").children('.drop').stop().slideDown();
		}
		if($this.siblings('.drop').find('li').hasClass("actives")){
			opener.removeClass("actives").children('.drop').stop().slideUp();
		}
		return false;
	});
	jQuery(document).click(function() {
		if (opener.hasClass("actives")) {
			opener.removeClass("actives").children('.drop').stop().slideUp();
		}
	});
}

// open-close init
function initOpenClose() {
	jQuery('.open-close').openClose({
		activeClass: 'active',
		opener: '.block-opener',
		slider: '.block-slide',
		animSpeed: 400,
		// hideOnClickOutside: true,
		effect: 'slide'
	});
}

// find empty menu's items and set them height accordingly to height of icon
function initMenuEmptyHeight(){
	ResponsiveHelper.addRange({
		'1024..': {
			// on: function() {
			// 	jQuery(document).ready(function(){
			// 		jQuery('#nav .empty-description').each(function(){
			// 			var heightImg = jQuery(this).find('i').height();
			// 			var strong = jQuery(this).find('strong');
			// 			strong.css({"height":heightImg});
			// 		})
			// 	})
			// },
			// off: function() {
			// 	jQuery(document).ready(function(){
			// 		jQuery('#nav .empty-description').css({"height":"auto"});
			// 	})
			// }
			on: function() {
				jQuery('#nav li').hover(function(){
					var emptyDrop = jQuery(this).children('.drop').find('.empty-description');
					setTimeout(function() {
						emptyDrop.each(function(){
							var heightImg = jQuery(this).find('i').height();
							var strong = jQuery(this).find('strong');
							strong.css({"height":heightImg});
						});
					}, 10);
				})
			},
			off: function() {}
		},
		'..1023': {
			on: function() {
				jQuery('#nav .drop-opener').on('click', function(){
					var emptyDropMob = jQuery(this).siblings('.drop').find('.empty-description');
					setTimeout(function() {
						emptyDropMob.each(function(){
							var heightImgMob = jQuery(this).find('i').height();
							var strongTag = jQuery(this).find('strong');
							strongTag.css({"height":heightImgMob});
						});
					}, 250);
				})
			},
			off: function() {}
		}
	});
};

// form on fare estimate
function initDropDownForm(){
	jQuery('.dropdown button').on('click', function(){
		jQuery(this).siblings('.dropdown-menu').toggleClass('dropdown-open');
	});
	jQuery(document).on('click', function(e) {
		if (!jQuery(e.target).closest('.dropdown').length){
			jQuery('.dropdown-menu').removeClass('dropdown-open');
		}
		e.stopPropagation();
	});
	jQuery('#ampm').on('click', function(e){
		e.preventDefault();
		jQuery(this).text( jQuery(this).text() == 'PM' ? "AM" : "PM"); // using ternary operator.
	});
	jQuery("#add-stop").click(function(){
		// var count = jQuery('.location-container-section.address .field-container');
		jQuery(".location-container-section.address .field-container").last().after().append('<div class="field-title">To</div><div class="field"><input class="hsd-input input-component" type="text" placeholder="Type address" name="drop-off-location"></div>');
	});
}

// handle dropdowns on mobile devices
function initTouchNav() {
	ResponsiveHelper.addRange({
		'1024..': {
			on: function() {
				jQuery('#nav').each(function() {
					new TouchNav({
						navBlock: this
					});
				});
			},
			off: function() {
				jQuery('#nav').each(function() {
					new TouchNav({
						navBlock: null
					});
				});
			}
		}
	});
}

// function initScrollClass() {
//   var scrollClass = 'page-scrolled';
//   var body = jQuery('body');
//   var main = jQuery('main');
//   var win = jQuery(window);
//   var headerHeight = jQuery('#header').innerHeight();
//   win.on('load resize orientationchange', function () {
//     headerHeight = jQuery('#header').innerHeight() + 'px';
//   })
//   win.on('load scroll resize orientationchange', function () {
//     main.css("padding-top", headerHeight);
//     if (win.scrollTop() > 0) {
//       body.addClass(scrollClass);
//     } else {
//       body.removeClass(scrollClass);
//     }
//     return false;
//   });
// }


/*
* Simple Mobile Navigation
*/
;(function($) {
	function MobileNav(options) {
		this.options = $.extend({
			container: null,
			hideOnClickOutside: false,
			menuActiveClass: 'nav-active',
			menuOpener: '.nav-opener',
			menuDrop: '.nav-drop',
			toggleEvent: 'click',
			outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
		}, options);
		this.initStructure();
		this.attachEvents();
	}
	MobileNav.prototype = {
		initStructure: function() {
			this.page = $('html');
			this.container = $(this.options.container);
			this.opener = this.container.find(this.options.menuOpener);
			this.drop = this.container.find(this.options.menuDrop);
		},
		attachEvents: function() {
			var self = this;

			if(activateResizeHandler) {
				activateResizeHandler();
				activateResizeHandler = null;
			}

			this.outsideClickHandler = function(e) {
				if(self.isOpened()) {
					var target = $(e.target);
					if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
						self.hide();
					}
				}
			};

			this.openerClickHandler = function(e) {
				e.preventDefault();
				self.toggle();
			};

			this.opener.on(this.options.toggleEvent, this.openerClickHandler);
		},
		isOpened: function() {
			return this.container.hasClass(this.options.menuActiveClass);
		},
		show: function() {
			this.container.addClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		hide: function() {
			this.container.removeClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		toggle: function() {
			if(this.isOpened()) {
				this.hide();
			} else {
				this.show();
			}
		},
		destroy: function() {
			this.container.removeClass(this.options.menuActiveClass);
			this.opener.off(this.options.toggleEvent, this.clickHandler);
			this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
		}
	};

	var activateResizeHandler = function() {
		var win = $(window),
		doc = $('html'),
		resizeClass = 'resize-active',
		flag, timer;
		var removeClassHandler = function() {
			flag = false;
			doc.removeClass(resizeClass);
		};
		var resizeHandler = function() {
			if(!flag) {
				flag = true;
				doc.addClass(resizeClass);
			}
			clearTimeout(timer);
			timer = setTimeout(removeClassHandler, 500);
		};
		win.on('resize orientationchange', resizeHandler);
	};

	$.fn.mobileNav = function(opt) {
		var args = Array.prototype.slice.call(arguments);
		var method = args[0];

		return this.each(function() {
			var $container = jQuery(this);
			var instance = $container.data('MobileNav');

			if (typeof opt === 'object' || typeof opt === 'undefined') {
				$container.data('MobileNav', new MobileNav($.extend({
					container: this
				}, opt)));
			} else if (typeof method === 'string' && instance) {
				if (typeof instance[method] === 'function') {
					args.shift();
					instance[method].apply(instance, args);
				}
			}
		});
	};
}(jQuery));

/*
* Responsive Layout helper
*/
window.ResponsiveHelper = (function($){
	// init variables
	var handlers = [],
	prevWinWidth,
	win = $(window),
	nativeMatchMedia = false;

	// detect match media support
	if(window.matchMedia) {
		if(window.Window && window.matchMedia === Window.prototype.matchMedia) {
			nativeMatchMedia = true;
		} else if(window.matchMedia.toString().indexOf('native') > -1) {
			nativeMatchMedia = true;
		}
	}

	// prepare resize handler
	function resizeHandler() {
		var winWidth = win.width();
		if(winWidth !== prevWinWidth) {
			prevWinWidth = winWidth;

			// loop through range groups
			$.each(handlers, function(index, rangeObject){
				// disable current active area if needed
				$.each(rangeObject.data, function(property, item) {
					if(item.currentActive && !matchRange(item.range[0], item.range[1])) {
						item.currentActive = false;
						if(typeof item.disableCallback === 'function') {
							item.disableCallback();
						}
					}
				});

				// enable areas that match current width
				$.each(rangeObject.data, function(property, item) {
					if(!item.currentActive && matchRange(item.range[0], item.range[1])) {
						// make callback
						item.currentActive = true;
						if(typeof item.enableCallback === 'function') {
							item.enableCallback();
						}
					}
				});
			});
		}
	}
	win.bind('load resize orientationchange', resizeHandler);

	// test range
	function matchRange(r1, r2) {
		var mediaQueryString = '';
		if(r1 > 0) {
			mediaQueryString += '(min-width: ' + r1 + 'px)';
		}
		if(r2 < Infinity) {
			mediaQueryString += (mediaQueryString ? ' and ' : '') + '(max-width: ' + r2 + 'px)';
		}
		return matchQuery(mediaQueryString, r1, r2);
	}

	// media query function
	function matchQuery(query, r1, r2) {
		if(window.matchMedia && nativeMatchMedia) {
			return matchMedia(query).matches;
		} else if(window.styleMedia) {
			return styleMedia.matchMedium(query);
		} else if(window.media) {
			return media.matchMedium(query);
		} else {
			return prevWinWidth >= r1 && prevWinWidth <= r2;
		}
	}

	// range parser
	function parseRange(rangeStr) {
		var rangeData = rangeStr.split('..');
		var x1 = parseInt(rangeData[0], 10) || -Infinity;
		var x2 = parseInt(rangeData[1], 10) || Infinity;
		return [x1, x2].sort(function(a, b){
			return a - b;
		});
	}

	// export public functions
	return {
		addRange: function(ranges) {
			// parse data and add items to collection
			var result = {data:{}};
			$.each(ranges, function(property, data){
				result.data[property] = {
					range: parseRange(property),
					enableCallback: data.on,
					disableCallback: data.off
				};
			});
			handlers.push(result);

			// call resizeHandler to recalculate all events
			prevWinWidth = null;
			resizeHandler();
		}
	};
}(jQuery));


/*
 * jQuery Open/Close plugin
 */
 ;(function($) {
 	function OpenClose(options) {
 		this.options = $.extend({
 			addClassBeforeAnimation: true,
 			hideOnClickOutside: false,
 			activeClass: 'active',
 			opener: '.opener',
 			slider: '.slide',
 			animSpeed: 400,
 			effect: 'fade',
 			event: 'click'
 		}, options);
 		this.init();
 	}
 	OpenClose.prototype = {
 		init: function() {
 			if (this.options.holder) {
 				this.findElements();
 				this.attachEvents();
 				this.makeCallback('onInit', this);
 			}
 		},
 		findElements: function() {
 			this.holder = $(this.options.holder);
 			this.opener = this.holder.find(this.options.opener);
 			this.slider = this.holder.find(this.options.slider);
 		},
 		attachEvents: function() {
			// add handler
			var self = this;
			this.eventHandler = function(e) {
				e.preventDefault();
				if (self.slider.hasClass(slideHiddenClass)) {
					self.showSlide();
				} else {
					self.hideSlide();
				}
			};
			self.opener.on(self.options.event, this.eventHandler);

			// hover mode handler
			if (self.options.event === 'hover') {
				self.opener.on('mouseenter', function() {
					if (!self.holder.hasClass(self.options.activeClass)) {
						self.showSlide();
					}
				});
				self.holder.on('mouseleave', function() {
					self.hideSlide();
				});
			}

			// outside click handler
			self.outsideClickHandler = function(e) {
				if (self.options.hideOnClickOutside) {
					var target = $(e.target);
					if (!target.is(self.holder) && !target.closest(self.holder).length) {
						self.hideSlide();
					}
				}
			};

			// set initial styles
			if (this.holder.hasClass(this.options.activeClass)) {
				$(document).on('click touchstart', self.outsideClickHandler);
			} else {
				this.slider.addClass(slideHiddenClass);
			}
		},
		showSlide: function() {
			var self = this;
			if (self.options.addClassBeforeAnimation) {
				self.holder.addClass(self.options.activeClass);
			}
			self.slider.removeClass(slideHiddenClass);
			$(document).on('click touchstart', self.outsideClickHandler);

			self.makeCallback('animStart', true);
			toggleEffects[self.options.effect].show({
				box: self.slider,
				speed: self.options.animSpeed,
				complete: function() {
					if (!self.options.addClassBeforeAnimation) {
						self.holder.addClass(self.options.activeClass);
					}
					self.makeCallback('animEnd', true);
				}
			});
		},
		hideSlide: function() {
			var self = this;
			if (self.options.addClassBeforeAnimation) {
				self.holder.removeClass(self.options.activeClass);
			}
			$(document).off('click touchstart', self.outsideClickHandler);

			self.makeCallback('animStart', false);
			toggleEffects[self.options.effect].hide({
				box: self.slider,
				speed: self.options.animSpeed,
				complete: function() {
					if (!self.options.addClassBeforeAnimation) {
						self.holder.removeClass(self.options.activeClass);
					}
					self.slider.addClass(slideHiddenClass);
					self.makeCallback('animEnd', false);
				}
			});
		},
		destroy: function() {
			this.slider.removeClass(slideHiddenClass).css({
				display: ''
			});
			this.opener.off(this.options.event, this.eventHandler);
			this.holder.removeClass(this.options.activeClass).removeData('OpenClose');
			$(document).off('click touchstart', this.outsideClickHandler);
		},
		makeCallback: function(name) {
			if (typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		}
	};

	// add stylesheet for slide on DOMReady
	var slideHiddenClass = 'js-slide-hidden';
	(function() {
		var tabStyleSheet = $('<style type="text/css">')[0];
		var tabStyleRule = '.' + slideHiddenClass;
		tabStyleRule += '{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}';
		if (tabStyleSheet.styleSheet) {
			tabStyleSheet.styleSheet.cssText = tabStyleRule;
		} else {
			tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
		}
		$('head').append(tabStyleSheet);
	}());

	// animation effects
	var toggleEffects = {
		slide: {
			show: function(o) {
				o.box.stop(true).hide().slideDown(o.speed, o.complete);
			},
			hide: function(o) {
				o.box.stop(true).slideUp(o.speed, o.complete);
			}
		},
		fade: {
			show: function(o) {
				o.box.stop(true).hide().fadeIn(o.speed, o.complete);
			},
			hide: function(o) {
				o.box.stop(true).fadeOut(o.speed, o.complete);
			}
		},
		none: {
			show: function(o) {
				o.box.hide().show(0, o.complete);
			},
			hide: function(o) {
				o.box.hide(0, o.complete);
			}
		}
	};

	// jQuery plugin interface
	$.fn.openClose = function(opt) {
		var args = Array.prototype.slice.call(arguments);
		var method = args[0];

		return this.each(function() {
			var $holder = jQuery(this);
			var instance = $holder.data('OpenClose');

			if (typeof opt === 'object' || typeof opt === 'undefined') {
				$holder.data('OpenClose', new OpenClose($.extend({
					holder: this
				}, opt)));
			} else if (typeof method === 'string' && instance) {
				if (typeof instance[method] === 'function') {
					args.shift();
					instance[method].apply(instance, args);
				}
			}
		});
	};
}(jQuery));


// navigation accesibility module
function TouchNav(opt) {
	this.options = {
		hoverClass: 'hover',
		menuItems: 'li',
		menuOpener: 'a',
		menuDrop: 'ul',
		navBlock: null
	};
	for (var p in opt) {
		if (opt.hasOwnProperty(p)) {
			this.options[p] = opt[p];
		}
	}
	this.init();
}
TouchNav.isActiveOn = function(elem) {
	return elem && elem.touchNavActive;
};
TouchNav.prototype = {
	init: function() {
		if (typeof this.options.navBlock === 'string') {
			this.menu = document.getElementById(this.options.navBlock);
		} else if (typeof this.options.navBlock === 'object') {
			this.menu = this.options.navBlock;
		}
		if (this.menu) {
			this.addEvents();
		}
	},
	addEvents: function() {
		// attach event handlers
		var self = this;
		var touchEvent = (navigator.pointerEnabled && 'pointerdown') || (navigator.msPointerEnabled && 'MSPointerDown') || (this.isTouchDevice && 'touchstart');
		this.menuItems = lib.queryElementsBySelector(this.options.menuItems, this.menu);

		var initMenuItem = function(item) {
			var currentDrop = lib.queryElementsBySelector(self.options.menuDrop, item)[0],
			currentOpener = lib.queryElementsBySelector(self.options.menuOpener, item)[0];

			// only for touch input devices
			if (currentDrop && currentOpener && (self.isTouchDevice || self.isPointerDevice)) {
				lib.event.add(currentOpener, 'click', lib.bind(self.clickHandler, self));
				lib.event.add(currentOpener, 'mousedown', lib.bind(self.mousedownHandler, self));
				lib.event.add(currentOpener, touchEvent, function(e) {
					if (!self.isTouchPointerEvent(e)) {
						self.preventCurrentClick = false;
						return;
					}
					self.touchFlag = true;
					self.currentItem = item;
					self.currentLink = currentOpener;
					self.pressHandler.apply(self, arguments);
				});
			}
			// for desktop computers and touch devices
			jQuery(item)
			.bind('mouseenter', function() {
				if (!self.touchFlag) {
					self.currentItem = item;
					self.mouseoverHandler();
				}
			});
			jQuery(item)
			.bind('mouseleave', function() {
				if (!self.touchFlag) {
					self.currentItem = item;
					self.mouseoutHandler();
				}
			});
			item.touchNavActive = true;
		};

		// addd handlers for all menu items
		for (var i = 0; i < this.menuItems.length; i++) {
			initMenuItem(self.menuItems[i]);
		}

		// hide dropdowns when clicking outside navigation
		if (this.isTouchDevice || this.isPointerDevice) {
			lib.event.add(document.documentElement, 'mousedown', lib.bind(this.clickOutsideHandler, this));
			lib.event.add(document.documentElement, touchEvent, lib.bind(this.clickOutsideHandler, this));
		}
	},
	mousedownHandler: function(e) {
		if (this.touchFlag) {
			e.preventDefault();
			this.touchFlag = false;
			this.preventCurrentClick = false;
		}
	},
	mouseoverHandler: function() {
		lib.addClass(this.currentItem, this.options.hoverClass);
		jQuery(this.currentItem)
		.trigger('itemhover');
	},
	mouseoutHandler: function() {
		lib.removeClass(this.currentItem, this.options.hoverClass);
		jQuery(this.currentItem)
		.trigger('itemleave');
	},
	hideActiveDropdown: function() {
		for (var i = 0; i < this.menuItems.length; i++) {
			if (lib.hasClass(this.menuItems[i], this.options.hoverClass)) {
				lib.removeClass(this.menuItems[i], this.options.hoverClass);
				jQuery(this.menuItems[i])
				.trigger('itemleave');
			}
		}
		this.activeParent = null;
	},
	pressHandler: function(e) {
		// hide previous drop (if active)
		if (this.currentItem !== this.activeParent) {
			if (this.activeParent && this.currentItem.parentNode === this.activeParent.parentNode) {
				lib.removeClass(this.activeParent, this.options.hoverClass);
			} else if (!this.isParent(this.activeParent, this.currentLink)) {
				this.hideActiveDropdown();
			}
		}
		// handle current drop
		this.activeParent = this.currentItem;
		if (lib.hasClass(this.currentItem, this.options.hoverClass)) {
			this.preventCurrentClick = false;
		} else {
			e.preventDefault();
			this.preventCurrentClick = true;
			lib.addClass(this.currentItem, this.options.hoverClass);
			jQuery(this.currentItem)
			.trigger('itemhover');
		}
	},
	clickHandler: function(e) {
		// prevent first click on link
		if (this.preventCurrentClick) {
			e.preventDefault();
		}
	},
	clickOutsideHandler: function(event) {
		var e = event.changedTouches ? event.changedTouches[0] : event;
		if (this.activeParent && !this.isParent(this.menu, e.target)) {
			this.hideActiveDropdown();
			this.touchFlag = false;
		}
	},
	isParent: function(parent, child) {
		while (child.parentNode) {
			if (child.parentNode == parent) {
				return true;
			}
			child = child.parentNode;
		}
		return false;
	},
	isTouchPointerEvent: function(e) {
		return (e.type.indexOf('touch') > -1) ||
		(navigator.pointerEnabled && e.pointerType === 'touch') ||
		(navigator.msPointerEnabled && e.pointerType == e.MSPOINTER_TYPE_TOUCH);
	},
	isPointerDevice: (function() {
		return !!(navigator.pointerEnabled || navigator.msPointerEnabled);
	}()),
	isTouchDevice: (function() {
		return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	}())
};

/*
* Utility module
*/
lib = {
	hasClass: function(el,cls) {
		return el && el.className ? el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) : false;
	},
	addClass: function(el,cls) {
		if (el && !this.hasClass(el,cls)) el.className += " "+cls;
		},
		removeClass: function(el,cls) {
			if (el && this.hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
			},
			extend: function(obj) {
				for(var i = 1; i < arguments.length; i++) {
					for(var p in arguments[i]) {
						if(arguments[i].hasOwnProperty(p)) {
							obj[p] = arguments[i][p];
						}
					}
				}
				return obj;
			},
			each: function(obj, callback) {
				var property, len;
				if(typeof obj.length === 'number') {
					for(property = 0, len = obj.length; property < len; property++) {
						if(callback.call(obj[property], property, obj[property]) === false) {
							break;
						}
					}
				} else {
					for(property in obj) {
						if(obj.hasOwnProperty(property)) {
							if(callback.call(obj[property], property, obj[property]) === false) {
								break;
							}
						}
					}
				}
			},
			event: (function() {
				var fixEvent = function(e) {
					e = e || window.event;
					if(e.isFixed) return e; else e.isFixed = true;
						if(!e.target) e.target = e.srcElement;
							e.preventDefault = e.preventDefault || function() {this.returnValue = false;};
							e.stopPropagation = e.stopPropagation || function() {this.cancelBubble = true;};
							return e;
						};
						return {
							add: function(elem, event, handler) {
								if(!elem.events) {
									elem.events = {};
									elem.handle = function(e) {
										var ret, handlers = elem.events[e.type];
										e = fixEvent(e);
										for(var i = 0, len = handlers.length; i < len; i++) {
											if(handlers[i]) {
												ret = handlers[i].call(elem, e);
												if(ret === false) {
													e.preventDefault();
													e.stopPropagation();
												}
											}
										}
									};
								}
								if(!elem.events[event]) {
									elem.events[event] = [];
									if(elem.addEventListener) elem.addEventListener(event, elem.handle, false);
										else if(elem.attachEvent) elem.attachEvent('on'+event, elem.handle);
										}
										elem.events[event].push(handler);
									},
									remove: function(elem, event, handler) {
										var handlers = elem.events[event];
										for(var i = handlers.length - 1; i >= 0; i--) {
											if(handlers[i] === handler) {
												handlers.splice(i,1);
											}
										}
										if(!handlers.length) {
											delete elem.events[event];
											if(elem.removeEventListener) elem.removeEventListener(event, elem.handle, false);
												else if(elem.detachEvent) elem.detachEvent('on'+event, elem.handle);
												}
											}
										};
									}()),
			queryElementsBySelector: function(selector, scope) {
				scope = scope || document;
				if(!selector) return [];
					if(selector === '>*') return scope.children;
						if(typeof document.querySelectorAll === 'function') {
							return scope.querySelectorAll(selector);
						}
						var selectors = selector.split(',');
						var resultList = [];
						for(var s = 0; s < selectors.length; s++) {
							var currentContext = [scope || document];
							var tokens = selectors[s].replace(/^\s+/,'').replace(/\s+$/,'').split(' ');
							for (var i = 0; i < tokens.length; i++) {
								token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');
								if (token.indexOf('#') > -1) {
									var bits = token.split('#'), tagName = bits[0], id = bits[1];
									var element = document.getElementById(id);
									if (element && tagName && element.nodeName.toLowerCase() != tagName) {
										return [];
									}
									currentContext = element ? [element] : [];
									continue;
								}
								if (token.indexOf('.') > -1) {
									var bits = token.split('.'), tagName = bits[0] || '*', className = bits[1], found = [], foundCount = 0;
									for (var h = 0; h < currentContext.length; h++) {
										var elements;
										if (tagName == '*') {
											elements = currentContext[h].getElementsByTagName('*');
										} else {
											elements = currentContext[h].getElementsByTagName(tagName);
										}
										for (var j = 0; j < elements.length; j++) {
											found[foundCount++] = elements[j];
										}
									}
									currentContext = [];
									var currentContextIndex = 0;
									for (var k = 0; k < found.length; k++) {
										if (found[k].className && found[k].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
											currentContext[currentContextIndex++] = found[k];
										}
									}
									continue;
								}
								if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
									var tagName = RegExp.$1 || '*', attrName = RegExp.$2, attrOperator = RegExp.$3, attrValue = RegExp.$4;
									if(attrName.toLowerCase() == 'for' && this.browser.msie && this.browser.version < 8) {
										attrName = 'htmlFor';
									}
									var found = [], foundCount = 0;
									for (var h = 0; h < currentContext.length; h++) {
										var elements;
										if (tagName == '*') {
											elements = currentContext[h].getElementsByTagName('*');
										} else {
											elements = currentContext[h].getElementsByTagName(tagName);
										}
										for (var j = 0; elements[j]; j++) {
											found[foundCount++] = elements[j];
										}
									}
									currentContext = [];
									var currentContextIndex = 0, checkFunction;
									switch (attrOperator) {
										case '=': checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue) }; break;
										case '~': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('(\\s|^)'+attrValue+'(\\s|$)'))) }; break;
										case '|': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))) }; break;
										case '^': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0) }; break;
										case '$': checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length) }; break;
										case '*': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1) }; break;
										default : checkFunction = function(e) { return e.getAttribute(attrName) };
									}
									currentContext = [];
									var currentContextIndex = 0;
									for (var k = 0; k < found.length; k++) {
										if (checkFunction(found[k])) {
											currentContext[currentContextIndex++] = found[k];
										}
									}
									continue;
								}
								tagName = token;
								var found = [], foundCount = 0;
								for (var h = 0; h < currentContext.length; h++) {
									var elements = currentContext[h].getElementsByTagName(tagName);
									for (var j = 0; j < elements.length; j++) {
										found[foundCount++] = elements[j];
									}
								}
								currentContext = found;
							}
							resultList = [].concat(resultList,currentContext);
						}
						return resultList;
					},
					trim: function (str) {
						return str.replace(/^\s+/, '').replace(/\s+$/, '');
					},
					bind: function(f, scope, forceArgs){
						return function() {return f.apply(scope, typeof forceArgs !== 'undefined' ? [forceArgs] : arguments);};
					}
				};


// AOS plugin
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.AOS=t():e.AOS=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="dist/",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=n(1),a=(o(r),n(6)),u=o(a),c=n(7),s=o(c),f=n(8),d=o(f),l=n(9),p=o(l),m=n(10),b=o(m),v=n(11),y=o(v),g=n(14),h=o(g),w=[],k=!1,x={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded",throttleDelay:99,debounceDelay:50,disableMutationObserver:!1},j=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e&&(k=!0),k)return w=(0,y.default)(w,x),(0,b.default)(w,x.once),w},O=function(){w=(0,h.default)(),j()},M=function(){w.forEach(function(e,t){e.node.removeAttribute("data-aos"),e.node.removeAttribute("data-aos-easing"),e.node.removeAttribute("data-aos-duration"),e.node.removeAttribute("data-aos-delay")})},S=function(e){return e===!0||"mobile"===e&&p.default.mobile()||"phone"===e&&p.default.phone()||"tablet"===e&&p.default.tablet()||"function"==typeof e&&e()===!0},_=function(e){x=i(x,e),w=(0,h.default)();var t=document.all&&!window.atob;return S(x.disable)||t?M():(x.disableMutationObserver||d.default.isSupported()||(console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '),x.disableMutationObserver=!0),document.querySelector("body").setAttribute("data-aos-easing",x.easing),document.querySelector("body").setAttribute("data-aos-duration",x.duration),document.querySelector("body").setAttribute("data-aos-delay",x.delay),"DOMContentLoaded"===x.startEvent&&["complete","interactive"].indexOf(document.readyState)>-1?j(!0):"load"===x.startEvent?window.addEventListener(x.startEvent,function(){j(!0)}):document.addEventListener(x.startEvent,function(){j(!0)}),window.addEventListener("resize",(0,s.default)(j,x.debounceDelay,!0)),window.addEventListener("orientationchange",(0,s.default)(j,x.debounceDelay,!0)),window.addEventListener("scroll",(0,u.default)(function(){(0,b.default)(w,x.once)},x.throttleDelay)),x.disableMutationObserver||d.default.ready("[data-aos]",O),w)};e.exports={init:_,refresh:j,refreshHard:O}},function(e,t){},,,,,function(e,t){(function(t){"use strict";function n(e,t,n){function o(t){var n=b,o=v;return b=v=void 0,k=t,g=e.apply(o,n)}function r(e){return k=e,h=setTimeout(f,t),M?o(e):g}function a(e){var n=e-w,o=e-k,i=t-n;return S?j(i,y-o):i}function c(e){var n=e-w,o=e-k;return void 0===w||n>=t||n<0||S&&o>=y}function f(){var e=O();return c(e)?d(e):void(h=setTimeout(f,a(e)))}function d(e){return h=void 0,_&&b?o(e):(b=v=void 0,g)}function l(){void 0!==h&&clearTimeout(h),k=0,b=w=v=h=void 0}function p(){return void 0===h?g:d(O())}function m(){var e=O(),n=c(e);if(b=arguments,v=this,w=e,n){if(void 0===h)return r(w);if(S)return h=setTimeout(f,t),o(w)}return void 0===h&&(h=setTimeout(f,t)),g}var b,v,y,g,h,w,k=0,M=!1,S=!1,_=!0;if("function"!=typeof e)throw new TypeError(s);return t=u(t)||0,i(n)&&(M=!!n.leading,S="maxWait"in n,y=S?x(u(n.maxWait)||0,t):y,_="trailing"in n?!!n.trailing:_),m.cancel=l,m.flush=p,m}function o(e,t,o){var r=!0,a=!0;if("function"!=typeof e)throw new TypeError(s);return i(o)&&(r="leading"in o?!!o.leading:r,a="trailing"in o?!!o.trailing:a),n(e,t,{leading:r,maxWait:t,trailing:a})}function i(e){var t="undefined"==typeof e?"undefined":c(e);return!!e&&("object"==t||"function"==t)}function r(e){return!!e&&"object"==("undefined"==typeof e?"undefined":c(e))}function a(e){return"symbol"==("undefined"==typeof e?"undefined":c(e))||r(e)&&k.call(e)==d}function u(e){if("number"==typeof e)return e;if(a(e))return f;if(i(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=i(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(l,"");var n=m.test(e);return n||b.test(e)?v(e.slice(2),n?2:8):p.test(e)?f:+e}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s="Expected a function",f=NaN,d="[object Symbol]",l=/^\s+|\s+$/g,p=/^[-+]0x[0-9a-f]+$/i,m=/^0b[01]+$/i,b=/^0o[0-7]+$/i,v=parseInt,y="object"==("undefined"==typeof t?"undefined":c(t))&&t&&t.Object===Object&&t,g="object"==("undefined"==typeof self?"undefined":c(self))&&self&&self.Object===Object&&self,h=y||g||Function("return this")(),w=Object.prototype,k=w.toString,x=Math.max,j=Math.min,O=function(){return h.Date.now()};e.exports=o}).call(t,function(){return this}())},function(e,t){(function(t){"use strict";function n(e,t,n){function i(t){var n=b,o=v;return b=v=void 0,O=t,g=e.apply(o,n)}function r(e){return O=e,h=setTimeout(f,t),M?i(e):g}function u(e){var n=e-w,o=e-O,i=t-n;return S?x(i,y-o):i}function s(e){var n=e-w,o=e-O;return void 0===w||n>=t||n<0||S&&o>=y}function f(){var e=j();return s(e)?d(e):void(h=setTimeout(f,u(e)))}function d(e){return h=void 0,_&&b?i(e):(b=v=void 0,g)}function l(){void 0!==h&&clearTimeout(h),O=0,b=w=v=h=void 0}function p(){return void 0===h?g:d(j())}function m(){var e=j(),n=s(e);if(b=arguments,v=this,w=e,n){if(void 0===h)return r(w);if(S)return h=setTimeout(f,t),i(w)}return void 0===h&&(h=setTimeout(f,t)),g}var b,v,y,g,h,w,O=0,M=!1,S=!1,_=!0;if("function"!=typeof e)throw new TypeError(c);return t=a(t)||0,o(n)&&(M=!!n.leading,S="maxWait"in n,y=S?k(a(n.maxWait)||0,t):y,_="trailing"in n?!!n.trailing:_),m.cancel=l,m.flush=p,m}function o(e){var t="undefined"==typeof e?"undefined":u(e);return!!e&&("object"==t||"function"==t)}function i(e){return!!e&&"object"==("undefined"==typeof e?"undefined":u(e))}function r(e){return"symbol"==("undefined"==typeof e?"undefined":u(e))||i(e)&&w.call(e)==f}function a(e){if("number"==typeof e)return e;if(r(e))return s;if(o(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=o(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(d,"");var n=p.test(e);return n||m.test(e)?b(e.slice(2),n?2:8):l.test(e)?s:+e}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c="Expected a function",s=NaN,f="[object Symbol]",d=/^\s+|\s+$/g,l=/^[-+]0x[0-9a-f]+$/i,p=/^0b[01]+$/i,m=/^0o[0-7]+$/i,b=parseInt,v="object"==("undefined"==typeof t?"undefined":u(t))&&t&&t.Object===Object&&t,y="object"==("undefined"==typeof self?"undefined":u(self))&&self&&self.Object===Object&&self,g=v||y||Function("return this")(),h=Object.prototype,w=h.toString,k=Math.max,x=Math.min,j=function(){return g.Date.now()};e.exports=n}).call(t,function(){return this}())},function(e,t){"use strict";function n(e){var t=void 0,o=void 0,i=void 0;for(t=0;t<e.length;t+=1){if(o=e[t],o.dataset&&o.dataset.aos)return!0;if(i=o.children&&n(o.children))return!0}return!1}function o(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}function i(){return!!o()}function r(e,t){var n=window.document,i=o(),r=new i(a);u=t,r.observe(n.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}function a(e){e&&e.forEach(function(e){var t=Array.prototype.slice.call(e.addedNodes),o=Array.prototype.slice.call(e.removedNodes),i=t.concat(o);if(n(i))return u()})}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){};t.default={isSupported:i,ready:r}},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(){return navigator.userAgent||navigator.vendor||window.opera||""}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,a=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,u=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,c=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,s=function(){function e(){n(this,e)}return i(e,[{key:"phone",value:function(){var e=o();return!(!r.test(e)&&!a.test(e.substr(0,4)))}},{key:"mobile",value:function(){var e=o();return!(!u.test(e)&&!c.test(e.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),e}();t.default=new s},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t,n){var o=e.node.getAttribute("data-aos-once");t>e.position?e.node.classList.add("aos-animate"):"undefined"!=typeof o&&("false"===o||!n&&"true"!==o)&&e.node.classList.remove("aos-animate")},o=function(e,t){var o=window.pageYOffset,i=window.innerHeight;e.forEach(function(e,r){n(e,i+o,t)})};t.default=o},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(12),r=o(i),a=function(e,t){return e.forEach(function(e,n){e.node.classList.add("aos-init"),e.position=(0,r.default)(e.node,t.offset)}),e};t.default=a},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(13),r=o(i),a=function(e,t){var n=0,o=0,i=window.innerHeight,a={offset:e.getAttribute("data-aos-offset"),anchor:e.getAttribute("data-aos-anchor"),anchorPlacement:e.getAttribute("data-aos-anchor-placement")};switch(a.offset&&!isNaN(a.offset)&&(o=parseInt(a.offset)),a.anchor&&document.querySelectorAll(a.anchor)&&(e=document.querySelectorAll(a.anchor)[0]),n=(0,r.default)(e).top,a.anchorPlacement){case"top-bottom":break;case"center-bottom":n+=e.offsetHeight/2;break;case"bottom-bottom":n+=e.offsetHeight;break;case"top-center":n+=i/2;break;case"bottom-center":n+=i/2+e.offsetHeight;break;case"center-center":n+=i/2+e.offsetHeight/2;break;case"top-top":n+=i;break;case"bottom-top":n+=e.offsetHeight+i;break;case"center-top":n+=e.offsetHeight/2+i}return a.anchorPlacement||a.offset||isNaN(t)||(o=t),n+o};t.default=a},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){for(var t=0,n=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft-("BODY"!=e.tagName?e.scrollLeft:0),n+=e.offsetTop-("BODY"!=e.tagName?e.scrollTop:0),e=e.offsetParent;return{top:n,left:t}};t.default=n},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return e=e||document.querySelectorAll("[data-aos]"),Array.prototype.map.call(e,function(e){return{node:e}})};t.default=n}])});



/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
 ;(function(root, factory) {
 	'use strict';
 	if (typeof define === 'function' && define.amd) {
 		define(['jquery'], factory);
 	} else if (typeof exports === 'object') {
 		module.exports = factory(require('jquery'));
 	} else {
 		root.jcf = factory(jQuery);
 	}
 }(this, function($) {
 	'use strict';

	// define version
	var version = '1.1.3';

	// private variables
	var customInstances = [];

	// default global options
	var commonOptions = {
		optionsKey: 'jcf',
		dataKey: 'jcf-instance',
		rtlClass: 'jcf-rtl',
		focusClass: 'jcf-focus',
		pressedClass: 'jcf-pressed',
		disabledClass: 'jcf-disabled',
		hiddenClass: 'jcf-hidden',
		resetAppearanceClass: 'jcf-reset-appearance',
		unselectableClass: 'jcf-unselectable'
	};

	// detect device type
	var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
	isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
	commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);

	var isIOS = /(iPad|iPhone).*OS ([0-9_]*) .*/.exec(navigator.userAgent);
	if(isIOS) isIOS = parseFloat(isIOS[2].replace(/_/g, '.'));
		commonOptions.ios = isIOS;

	// create global stylesheet if custom forms are used
	var createStyleSheet = function() {
		var styleTag = $('<style>').appendTo('head'),
		styleSheet = styleTag.prop('sheet') || styleTag.prop('styleSheet');

		// crossbrowser style handling
		var addCSSRule = function(selector, rules, index) {
			if (styleSheet.insertRule) {
				styleSheet.insertRule(selector + '{' + rules + '}', index);
			} else {
				styleSheet.addRule(selector, rules, index);
			}
		};

		// add special rules
		addCSSRule('.' + commonOptions.hiddenClass, 'position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none');
		addCSSRule('.' + commonOptions.rtlClass + ' .' + commonOptions.hiddenClass, 'right:-9999px !important; left: auto !important');
		addCSSRule('.' + commonOptions.unselectableClass, '-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);');
		addCSSRule('.' + commonOptions.resetAppearanceClass, 'background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);');

		// detect rtl pages
		var html = $('html'), body = $('body');
		if (html.css('direction') === 'rtl' || body.css('direction') === 'rtl') {
			html.addClass(commonOptions.rtlClass);
		}

		// handle form reset event
		html.on('reset', function() {
			setTimeout(function() {
				api.refreshAll();
			}, 0);
		});

		// mark stylesheet as created
		commonOptions.styleSheetCreated = true;
	};

	// simplified pointer events handler
	(function() {
		var pointerEventsSupported = navigator.pointerEnabled || navigator.msPointerEnabled,
		touchEventsSupported = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
		eventList, eventMap = {}, eventPrefix = 'jcf-';

		// detect events to attach
		if (pointerEventsSupported) {
			eventList = {
				pointerover: navigator.pointerEnabled ? 'pointerover' : 'MSPointerOver',
				pointerdown: navigator.pointerEnabled ? 'pointerdown' : 'MSPointerDown',
				pointermove: navigator.pointerEnabled ? 'pointermove' : 'MSPointerMove',
				pointerup: navigator.pointerEnabled ? 'pointerup' : 'MSPointerUp'
			};
		} else {
			eventList = {
				pointerover: 'mouseover',
				pointerdown: 'mousedown' + (touchEventsSupported ? ' touchstart' : ''),
				pointermove: 'mousemove' + (touchEventsSupported ? ' touchmove' : ''),
				pointerup: 'mouseup' + (touchEventsSupported ? ' touchend' : '')
			};
		}

		// create event map
		$.each(eventList, function(targetEventName, fakeEventList) {
			$.each(fakeEventList.split(' '), function(index, fakeEventName) {
				eventMap[fakeEventName] = targetEventName;
			});
		});

		// jQuery event hooks
		$.each(eventList, function(eventName, eventHandlers) {
			eventHandlers = eventHandlers.split(' ');
			$.event.special[eventPrefix + eventName] = {
				setup: function() {
					var self = this;
					$.each(eventHandlers, function(index, fallbackEvent) {
						if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
							else self['on' + fallbackEvent] = fixEvent;
						});
				},
				teardown: function() {
					var self = this;
					$.each(eventHandlers, function(index, fallbackEvent) {
						if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
							else self['on' + fallbackEvent] = null;
						});
				}
			};
		});

		// check that mouse event are not simulated by mobile browsers
		var lastTouch = null;
		var mouseEventSimulated = function(e) {
			var dx = Math.abs(e.pageX - lastTouch.x),
			dy = Math.abs(e.pageY - lastTouch.y),
			rangeDistance = 25;

			if (dx <= rangeDistance && dy <= rangeDistance) {
				return true;
			}
		};

		// normalize event
		var fixEvent = function(e) {
			var origEvent = e || window.event,
			touchEventData = null,
			targetEventName = eventMap[origEvent.type];

			e = $.event.fix(origEvent);
			e.type = eventPrefix + targetEventName;

			if (origEvent.pointerType) {
				switch (origEvent.pointerType) {
					case 2: e.pointerType = 'touch'; break;
					case 3: e.pointerType = 'pen'; break;
					case 4: e.pointerType = 'mouse'; break;
					default: e.pointerType = origEvent.pointerType;
				}
			} else {
				e.pointerType = origEvent.type.substr(0, 5); // "mouse" or "touch" word length
			}

			if (!e.pageX && !e.pageY) {
				touchEventData = origEvent.changedTouches ? origEvent.changedTouches[0] : origEvent;
				e.pageX = touchEventData.pageX;
				e.pageY = touchEventData.pageY;
			}

			if (origEvent.type === 'touchend') {
				lastTouch = { x: e.pageX, y: e.pageY };
			}
			if (e.pointerType === 'mouse' && lastTouch && mouseEventSimulated(e)) {
				return;
			} else {
				return ($.event.dispatch || $.event.handle).call(this, e);
			}
		};
	}());

	// custom mousewheel/trackpad handler
	(function() {
		var wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll').split(' '),
		shimEventName = 'jcf-mousewheel';

		$.event.special[shimEventName] = {
			setup: function() {
				var self = this;
				$.each(wheelEvents, function(index, fallbackEvent) {
					if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
						else self['on' + fallbackEvent] = fixEvent;
					});
			},
			teardown: function() {
				var self = this;
				$.each(wheelEvents, function(index, fallbackEvent) {
					if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
						else self['on' + fallbackEvent] = null;
					});
			}
		};

		var fixEvent = function(e) {
			var origEvent = e || window.event;
			e = $.event.fix(origEvent);
			e.type = shimEventName;

			// old wheel events handler
			if ('detail'      in origEvent) { e.deltaY = -origEvent.detail;      }
				if ('wheelDelta'  in origEvent) { e.deltaY = -origEvent.wheelDelta;  }
					if ('wheelDeltaY' in origEvent) { e.deltaY = -origEvent.wheelDeltaY; }
						if ('wheelDeltaX' in origEvent) { e.deltaX = -origEvent.wheelDeltaX; }

			// modern wheel event handler
			if ('deltaY' in origEvent) {
				e.deltaY = origEvent.deltaY;
			}
			if ('deltaX' in origEvent) {
				e.deltaX = origEvent.deltaX;
			}

			// handle deltaMode for mouse wheel
			e.delta = e.deltaY || e.deltaX;
			if (origEvent.deltaMode === 1) {
				var lineHeight = 16;
				e.delta *= lineHeight;
				e.deltaY *= lineHeight;
				e.deltaX *= lineHeight;
			}

			return ($.event.dispatch || $.event.handle).call(this, e);
		};
	}());

	// extra module methods
	var moduleMixin = {
		// provide function for firing native events
		fireNativeEvent: function(elements, eventName) {
			$(elements).each(function() {
				var element = this, eventObject;
				if (element.dispatchEvent) {
					eventObject = document.createEvent('HTMLEvents');
					eventObject.initEvent(eventName, true, true);
					element.dispatchEvent(eventObject);
				} else if (document.createEventObject) {
					eventObject = document.createEventObject();
					eventObject.target = element;
					element.fireEvent('on' + eventName, eventObject);
				}
			});
		},
		// bind event handlers for module instance (functions beggining with "on")
		bindHandlers: function() {
			var self = this;
			$.each(self, function(propName, propValue) {
				if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
					// dont use $.proxy here because it doesn't create unique handler
					self[propName] = function() {
						return propValue.apply(self, arguments);
					};
				}
			});
		}
	};

	// public API
	var api = {
		version: version,
		modules: {},
		getOptions: function() {
			return $.extend({}, commonOptions);
		},
		setOptions: function(moduleName, moduleOptions) {
			if (arguments.length > 1) {
				// set module options
				if (this.modules[moduleName]) {
					$.extend(this.modules[moduleName].prototype.options, moduleOptions);
				}
			} else {
				// set common options
				$.extend(commonOptions, moduleName);
			}
		},
		addModule: function(proto) {
			// add module to list
			var Module = function(options) {
				// save instance to collection
				if (!options.element.data(commonOptions.dataKey)) {
					options.element.data(commonOptions.dataKey, this);
				}
				customInstances.push(this);

				// save options
				this.options = $.extend({}, commonOptions, this.options, getInlineOptions(options.element), options);

				// bind event handlers to instance
				this.bindHandlers();

				// call constructor
				this.init.apply(this, arguments);
			};

			// parse options from HTML attribute
			var getInlineOptions = function(element) {
				var dataOptions = element.data(commonOptions.optionsKey),
				attrOptions = element.attr(commonOptions.optionsKey);

				if (dataOptions) {
					return dataOptions;
				} else if (attrOptions) {
					try {
						return $.parseJSON(attrOptions);
					} catch (e) {
						// ignore invalid attributes
					}
				}
			};

			// set proto as prototype for new module
			Module.prototype = proto;

			// add mixin methods to module proto
			$.extend(proto, moduleMixin);
			if (proto.plugins) {
				$.each(proto.plugins, function(pluginName, plugin) {
					$.extend(plugin.prototype, moduleMixin);
				});
			}

			// override destroy method
			var originalDestroy = Module.prototype.destroy;
			Module.prototype.destroy = function() {
				this.options.element.removeData(this.options.dataKey);

				for (var i = customInstances.length - 1; i >= 0; i--) {
					if (customInstances[i] === this) {
						customInstances.splice(i, 1);
						break;
					}
				}

				if (originalDestroy) {
					originalDestroy.apply(this, arguments);
				}
			};

			// save module to list
			this.modules[proto.name] = Module;
		},
		getInstance: function(element) {
			return $(element).data(commonOptions.dataKey);
		},
		replace: function(elements, moduleName, customOptions) {
			var self = this,
			instance;

			if (!commonOptions.styleSheetCreated) {
				createStyleSheet();
			}

			$(elements).each(function() {
				var moduleOptions,
				element = $(this);

				instance = element.data(commonOptions.dataKey);
				if (instance) {
					instance.refresh();
				} else {
					if (!moduleName) {
						$.each(self.modules, function(currentModuleName, module) {
							if (module.prototype.matchElement.call(module.prototype, element)) {
								moduleName = currentModuleName;
								return false;
							}
						});
					}
					if (moduleName) {
						moduleOptions = $.extend({ element: element }, customOptions);
						instance = new self.modules[moduleName](moduleOptions);
					}
				}
			});
			return instance;
		},
		refresh: function(elements) {
			$(elements).each(function() {
				var instance = $(this).data(commonOptions.dataKey);
				if (instance) {
					instance.refresh();
				}
			});
		},
		destroy: function(elements) {
			$(elements).each(function() {
				var instance = $(this).data(commonOptions.dataKey);
				if (instance) {
					instance.destroy();
				}
			});
		},
		replaceAll: function(context) {
			var self = this;
			$.each(this.modules, function(moduleName, module) {
				$(module.prototype.selector, context).each(function() {
					if (this.className.indexOf('jcf-ignore') < 0) {
						self.replace(this, moduleName);
					}
				});
			});
		},
		refreshAll: function(context) {
			if (context) {
				$.each(this.modules, function(moduleName, module) {
					$(module.prototype.selector, context).each(function() {
						var instance = $(this).data(commonOptions.dataKey);
						if (instance) {
							instance.refresh();
						}
					});
				});
			} else {
				for (var i = customInstances.length - 1; i >= 0; i--) {
					customInstances[i].refresh();
				}
			}
		},
		destroyAll: function(context) {
			if (context) {
				$.each(this.modules, function(moduleName, module) {
					$(module.prototype.selector, context).each(function(index, element) {
						var instance = $(element).data(commonOptions.dataKey);
						if (instance) {
							instance.destroy();
						}
					});
				});
			} else {
				while (customInstances.length) {
					customInstances[0].destroy();
				}
			}
		}
	};

	// always export API to the global window object
	window.jcf = api;

	return api;
}));

 /*!
 * JavaScript Custom Forms : Select Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
 ;(function($, window) {
 	'use strict';

 	jcf.addModule({
 		name: 'Select',
 		selector: 'select',
 		options: {
 			element: null,
 			multipleCompactStyle: false
 		},
 		plugins: {
 			ListBox: ListBox,
 			ComboBox: ComboBox,
 			SelectList: SelectList
 		},
 		matchElement: function(element) {
 			return element.is('select');
 		},
 		init: function() {
 			this.element = $(this.options.element);
 			this.createInstance();
 		},
 		isListBox: function() {
 			return this.element.is('[size]:not([jcf-size]), [multiple]');
 		},
 		createInstance: function() {
 			if (this.instance) {
 				this.instance.destroy();
 			}
 			if (this.isListBox() && !this.options.multipleCompactStyle) {
 				this.instance = new ListBox(this.options);
 			} else {
 				this.instance = new ComboBox(this.options);
 			}
 		},
 		refresh: function() {
 			var typeMismatch = (this.isListBox() && this.instance instanceof ComboBox) ||
 			(!this.isListBox() && this.instance instanceof ListBox);

 			if (typeMismatch) {
 				this.createInstance();
 			} else {
 				this.instance.refresh();
 			}
 		},
 		destroy: function() {
 			this.instance.destroy();
 		}
 	});

	// combobox module
	function ComboBox(options) {
		this.options = $.extend({
			wrapNative: true,
			wrapNativeOnMobile: true,
			fakeDropInBody: true,
			useCustomScroll: true,
			flipDropToFit: true,
			maxVisibleItems: 10,
			fakeAreaStructure: '<span class="jcf-select"><span class="jcf-select-text"></span><span class="jcf-select-opener"></span></span>',
			fakeDropStructure: '<div class="jcf-select-drop"><div class="jcf-select-drop-content"></div></div>',
			optionClassPrefix: 'jcf-option-',
			selectClassPrefix: 'jcf-select-',
			dropContentSelector: '.jcf-select-drop-content',
			selectTextSelector: '.jcf-select-text',
			dropActiveClass: 'jcf-drop-active',
			flipDropClass: 'jcf-drop-flipped'
		}, options);
		this.init();
	}
	$.extend(ComboBox.prototype, {
		init: function() {
			this.initStructure();
			this.bindHandlers();
			this.attachEvents();
			this.refresh();
		},
		initStructure: function() {
			// prepare structure
			this.win = $(window);
			this.doc = $(document);
			this.realElement = $(this.options.element);
			this.fakeElement = $(this.options.fakeAreaStructure).insertAfter(this.realElement);
			this.selectTextContainer = this.fakeElement.find(this.options.selectTextSelector);
			this.selectText = $('<span></span>').appendTo(this.selectTextContainer);
			makeUnselectable(this.fakeElement);

			// copy classes from original select
			this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));

			// handle compact multiple style
			if (this.realElement.prop('multiple')) {
				this.fakeElement.addClass('jcf-compact-multiple');
			}

			// detect device type and dropdown behavior
			if (this.options.isMobileDevice && this.options.wrapNativeOnMobile && !this.options.wrapNative) {
				this.options.wrapNative = true;
			}

			if (this.options.wrapNative) {
				// wrap native select inside fake block
				this.realElement.prependTo(this.fakeElement).css({
					position: 'absolute',
					height: '100%',
					width: '100%'
				}).addClass(this.options.resetAppearanceClass);
			} else {
				// just hide native select
				this.realElement.addClass(this.options.hiddenClass);
				this.fakeElement.attr('title', this.realElement.attr('title'));
				this.fakeDropTarget = this.options.fakeDropInBody ? $('body') : this.fakeElement;
			}
		},
		attachEvents: function() {
			// delayed refresh handler
			var self = this;
			this.delayedRefresh = function() {
				setTimeout(function() {
					self.refresh();
					if (self.list) {
						self.list.refresh();
						self.list.scrollToActiveOption();
					}
				}, 1);
			};

			// native dropdown event handlers
			if (this.options.wrapNative) {
				this.realElement.on({
					focus: this.onFocus,
					change: this.onChange,
					click: this.onChange,
					keydown: this.onChange
				});
			} else {
				// custom dropdown event handlers
				this.realElement.on({
					focus: this.onFocus,
					change: this.onChange,
					keydown: this.onKeyDown
				});
				this.fakeElement.on({
					'jcf-pointerdown': this.onSelectAreaPress
				});
			}
		},
		onKeyDown: function(e) {
			if (e.which === 13) {
				this.toggleDropdown();
			} else if (this.dropActive) {
				this.delayedRefresh();
			}
		},
		onChange: function() {
			this.refresh();
		},
		onFocus: function() {
			if (!this.pressedFlag || !this.focusedFlag) {
				this.fakeElement.addClass(this.options.focusClass);
				this.realElement.on('blur', this.onBlur);
				this.toggleListMode(true);
				this.focusedFlag = true;
			}
		},
		onBlur: function() {
			if (!this.pressedFlag) {
				this.fakeElement.removeClass(this.options.focusClass);
				this.realElement.off('blur', this.onBlur);
				this.toggleListMode(false);
				this.focusedFlag = false;
			}
		},
		onResize: function() {
			if (this.dropActive) {
				this.hideDropdown();
			}
		},
		onSelectDropPress: function() {
			this.pressedFlag = true;
		},
		onSelectDropRelease: function(e, pointerEvent) {
			this.pressedFlag = false;
			if (pointerEvent.pointerType === 'mouse') {
				this.realElement.focus();
			}
		},
		onSelectAreaPress: function(e) {
			// skip click if drop inside fake element or real select is disabled
			var dropClickedInsideFakeElement = !this.options.fakeDropInBody && $(e.target).closest(this.dropdown).length;
			if (dropClickedInsideFakeElement || e.button > 1 || this.realElement.is(':disabled')) {
				return;
			}

			// toggle dropdown visibility
			this.selectOpenedByEvent = e.pointerType;
			this.toggleDropdown();

			// misc handlers
			if (!this.focusedFlag) {
				if (e.pointerType === 'mouse') {
					this.realElement.focus();
				} else {
					this.onFocus(e);
				}
			}
			this.pressedFlag = true;
			this.fakeElement.addClass(this.options.pressedClass);
			this.doc.on('jcf-pointerup', this.onSelectAreaRelease);
		},
		onSelectAreaRelease: function(e) {
			if (this.focusedFlag && e.pointerType === 'mouse') {
				this.realElement.focus();
			}
			this.pressedFlag = false;
			this.fakeElement.removeClass(this.options.pressedClass);
			this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
		},
		onOutsideClick: function(e) {
			var target = $(e.target),
			clickedInsideSelect = target.closest(this.fakeElement).length || target.closest(this.dropdown).length;

			if (!clickedInsideSelect) {
				this.hideDropdown();
			}
		},
		onSelect: function() {
			this.refresh();

			if (this.realElement.prop('multiple')) {
				this.repositionDropdown();
			} else {
				this.hideDropdown();
			}

			this.fireNativeEvent(this.realElement, 'change');
		},
		toggleListMode: function(state) {
			if (!this.options.wrapNative) {
				if (state) {
					// temporary change select to list to avoid appearing of native dropdown
					this.realElement.attr({
						size: 4,
						'jcf-size': ''
					});
				} else {
					// restore select from list mode to dropdown select
					if (!this.options.wrapNative) {
						this.realElement.removeAttr('size jcf-size');
					}
				}
			}
		},
		createDropdown: function() {
			// destroy previous dropdown if needed
			if (this.dropdown) {
				this.list.destroy();
				this.dropdown.remove();
			}

			// create new drop container
			this.dropdown = $(this.options.fakeDropStructure).appendTo(this.fakeDropTarget);
			this.dropdown.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
			makeUnselectable(this.dropdown);

			// handle compact multiple style
			if (this.realElement.prop('multiple')) {
				this.dropdown.addClass('jcf-compact-multiple');
			}

			// set initial styles for dropdown in body
			if (this.options.fakeDropInBody) {
				this.dropdown.css({
					position: 'absolute',
					top: -9999
				});
			}

			// create new select list instance
			this.list = new SelectList({
				useHoverClass: true,
				handleResize: false,
				alwaysPreventMouseWheel: true,
				maxVisibleItems: this.options.maxVisibleItems,
				useCustomScroll: this.options.useCustomScroll,
				holder: this.dropdown.find(this.options.dropContentSelector),
				multipleSelectWithoutKey: this.realElement.prop('multiple'),
				element: this.realElement
			});
			$(this.list).on({
				select: this.onSelect,
				press: this.onSelectDropPress,
				release: this.onSelectDropRelease
			});
		},
		repositionDropdown: function() {
			var selectOffset = this.fakeElement.offset(),
			selectWidth = this.fakeElement.outerWidth(),
			selectHeight = this.fakeElement.outerHeight(),
			dropHeight = this.dropdown.css('width', selectWidth).outerHeight(),
			winScrollTop = this.win.scrollTop(),
			winHeight = this.win.height(),
			calcTop, calcLeft, bodyOffset, needFlipDrop = false;

			// check flip drop position
			if (selectOffset.top + selectHeight + dropHeight > winScrollTop + winHeight && selectOffset.top - dropHeight > winScrollTop) {
				needFlipDrop = true;
			}

			if (this.options.fakeDropInBody) {
				bodyOffset = this.fakeDropTarget.css('position') !== 'static' ? this.fakeDropTarget.offset().top : 0;
				if (this.options.flipDropToFit && needFlipDrop) {
					// calculate flipped dropdown position
					calcLeft = selectOffset.left;
					calcTop = selectOffset.top - dropHeight - bodyOffset;
				} else {
					// calculate default drop position
					calcLeft = selectOffset.left;
					calcTop = selectOffset.top + selectHeight - bodyOffset;
				}

				// update drop styles
				this.dropdown.css({
					width: selectWidth,
					left: calcLeft,
					top: calcTop
				});
			}

			// refresh flipped class
			this.dropdown.add(this.fakeElement).toggleClass(this.options.flipDropClass, this.options.flipDropToFit && needFlipDrop);
		},
		showDropdown: function() {
			// do not show empty custom dropdown
			if (!this.realElement.prop('options').length) {
				return;
			}

			// create options list if not created
			if (!this.dropdown) {
				this.createDropdown();
			}

			// show dropdown
			this.dropActive = true;
			this.dropdown.appendTo(this.fakeDropTarget);
			this.fakeElement.addClass(this.options.dropActiveClass);
			this.refreshSelectedText();
			this.repositionDropdown();
			this.list.setScrollTop(this.savedScrollTop);
			this.list.refresh();

			// add temporary event handlers
			this.win.on('resize', this.onResize);
			this.doc.on('jcf-pointerdown', this.onOutsideClick);
		},
		hideDropdown: function() {
			if (this.dropdown) {
				this.savedScrollTop = this.list.getScrollTop();
				this.fakeElement.removeClass(this.options.dropActiveClass + ' ' + this.options.flipDropClass);
				this.dropdown.removeClass(this.options.flipDropClass).detach();
				this.doc.off('jcf-pointerdown', this.onOutsideClick);
				this.win.off('resize', this.onResize);
				this.dropActive = false;
				if (this.selectOpenedByEvent === 'touch') {
					this.onBlur();
				}
			}
		},
		toggleDropdown: function() {
			if (this.dropActive) {
				this.hideDropdown();
			} else {
				this.showDropdown();
			}
		},
		refreshSelectedText: function() {
			// redraw selected area
			var selectedIndex = this.realElement.prop('selectedIndex'),
			selectedOption = this.realElement.prop('options')[selectedIndex],
			selectedOptionImage = selectedOption ? selectedOption.getAttribute('data-image') : null,
			selectedOptionText = '',
			selectedOptionClasses,
			self = this;

			if (this.realElement.prop('multiple')) {
				$.each(this.realElement.prop('options'), function(index, option) {
					if (option.selected) {
						selectedOptionText += (selectedOptionText ? ', ' : '') + option.innerHTML;
					}
				});
				if (!selectedOptionText) {
					selectedOptionText = self.realElement.attr('placeholder') || '';
				}
				this.selectText.removeAttr('class').html(selectedOptionText);
			} else if (!selectedOption) {
				if (this.selectImage) {
					this.selectImage.hide();
				}
				this.selectText.removeAttr('class').empty();
			} else if (this.currentSelectedText !== selectedOption.innerHTML || this.currentSelectedImage !== selectedOptionImage) {
				selectedOptionClasses = getPrefixedClasses(selectedOption.className, this.options.optionClassPrefix);
				this.selectText.attr('class', selectedOptionClasses).html(selectedOption.innerHTML);

				if (selectedOptionImage) {
					if (!this.selectImage) {
						this.selectImage = $('<img>').prependTo(this.selectTextContainer).hide();
					}
					this.selectImage.attr('src', selectedOptionImage).show();
				} else if (this.selectImage) {
					this.selectImage.hide();
				}

				this.currentSelectedText = selectedOption.innerHTML;
				this.currentSelectedImage = selectedOptionImage;
			}
		},
		refresh: function() {
			// refresh fake select visibility
			if (this.realElement.prop('style').display === 'none') {
				this.fakeElement.hide();
			} else {
				this.fakeElement.show();
			}

			// refresh selected text
			this.refreshSelectedText();

			// handle disabled state
			this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
		},
		destroy: function() {
			// restore structure
			if (this.options.wrapNative) {
				this.realElement.insertBefore(this.fakeElement).css({
					position: '',
					height: '',
					width: ''
				}).removeClass(this.options.resetAppearanceClass);
			} else {
				this.realElement.removeClass(this.options.hiddenClass);
				if (this.realElement.is('[jcf-size]')) {
					this.realElement.removeAttr('size jcf-size');
				}
			}

			// removing element will also remove its event handlers
			this.fakeElement.remove();

			// remove other event handlers
			this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
			this.realElement.off({
				focus: this.onFocus
			});
		}
	});

	// listbox module
	function ListBox(options) {
		this.options = $.extend({
			wrapNative: true,
			useCustomScroll: true,
			fakeStructure: '<span class="jcf-list-box"><span class="jcf-list-wrapper"></span></span>',
			selectClassPrefix: 'jcf-select-',
			listHolder: '.jcf-list-wrapper'
		}, options);
		this.init();
	}
	$.extend(ListBox.prototype, {
		init: function() {
			this.bindHandlers();
			this.initStructure();
			this.attachEvents();
		},
		initStructure: function() {
			this.realElement = $(this.options.element);
			this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
			this.listHolder = this.fakeElement.find(this.options.listHolder);
			makeUnselectable(this.fakeElement);

			// copy classes from original select
			this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
			this.realElement.addClass(this.options.hiddenClass);

			this.list = new SelectList({
				useCustomScroll: this.options.useCustomScroll,
				holder: this.listHolder,
				selectOnClick: false,
				element: this.realElement
			});
		},
		attachEvents: function() {
			// delayed refresh handler
			var self = this;
			this.delayedRefresh = function(e) {
				if (e && e.which === 16) {
					// ignore SHIFT key
					return;
				} else {
					clearTimeout(self.refreshTimer);
					self.refreshTimer = setTimeout(function() {
						self.refresh();
						self.list.scrollToActiveOption();
					}, 1);
				}
			};

			// other event handlers
			this.realElement.on({
				focus: this.onFocus,
				click: this.delayedRefresh,
				keydown: this.delayedRefresh
			});

			// select list event handlers
			$(this.list).on({
				select: this.onSelect,
				press: this.onFakeOptionsPress,
				release: this.onFakeOptionsRelease
			});
		},
		onFakeOptionsPress: function(e, pointerEvent) {
			this.pressedFlag = true;
			if (pointerEvent.pointerType === 'mouse') {
				this.realElement.focus();
			}
		},
		onFakeOptionsRelease: function(e, pointerEvent) {
			this.pressedFlag = false;
			if (pointerEvent.pointerType === 'mouse') {
				this.realElement.focus();
			}
		},
		onSelect: function() {
			this.fireNativeEvent(this.realElement, 'change');
			this.fireNativeEvent(this.realElement, 'click');
		},
		onFocus: function() {
			if (!this.pressedFlag || !this.focusedFlag) {
				this.fakeElement.addClass(this.options.focusClass);
				this.realElement.on('blur', this.onBlur);
				this.focusedFlag = true;
			}
		},
		onBlur: function() {
			if (!this.pressedFlag) {
				this.fakeElement.removeClass(this.options.focusClass);
				this.realElement.off('blur', this.onBlur);
				this.focusedFlag = false;
			}
		},
		refresh: function() {
			this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
			this.list.refresh();
		},
		destroy: function() {
			this.list.destroy();
			this.realElement.insertBefore(this.fakeElement).removeClass(this.options.hiddenClass);
			this.fakeElement.remove();
		}
	});

	// options list module
	function SelectList(options) {
		this.options = $.extend({
			holder: null,
			maxVisibleItems: 10,
			selectOnClick: true,
			useHoverClass: false,
			useCustomScroll: false,
			handleResize: true,
			multipleSelectWithoutKey: false,
			alwaysPreventMouseWheel: false,
			indexAttribute: 'data-index',
			cloneClassPrefix: 'jcf-option-',
			containerStructure: '<span class="jcf-list"><span class="jcf-list-content"></span></span>',
			containerSelector: '.jcf-list-content',
			captionClass: 'jcf-optgroup-caption',
			disabledClass: 'jcf-disabled',
			optionClass: 'jcf-option',
			groupClass: 'jcf-optgroup',
			hoverClass: 'jcf-hover',
			selectedClass: 'jcf-selected',
			scrollClass: 'jcf-scroll-active'
		}, options);
		this.init();
	}
	$.extend(SelectList.prototype, {
		init: function() {
			this.initStructure();
			this.refreshSelectedClass();
			this.attachEvents();
		},
		initStructure: function() {
			this.element = $(this.options.element);
			this.indexSelector = '[' + this.options.indexAttribute + ']';
			this.container = $(this.options.containerStructure).appendTo(this.options.holder);
			this.listHolder = this.container.find(this.options.containerSelector);
			this.lastClickedIndex = this.element.prop('selectedIndex');
			this.rebuildList();
		},
		attachEvents: function() {
			this.bindHandlers();
			this.listHolder.on('jcf-pointerdown', this.indexSelector, this.onItemPress);
			this.listHolder.on('jcf-pointerdown', this.onPress);

			if (this.options.useHoverClass) {
				this.listHolder.on('jcf-pointerover', this.indexSelector, this.onHoverItem);
			}
		},
		onPress: function(e) {
			$(this).trigger('press', e);
			this.listHolder.on('jcf-pointerup', this.onRelease);
		},
		onRelease: function(e) {
			$(this).trigger('release', e);
			this.listHolder.off('jcf-pointerup', this.onRelease);
		},
		onHoverItem: function(e) {
			var hoverIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute));
			this.fakeOptions.removeClass(this.options.hoverClass).eq(hoverIndex).addClass(this.options.hoverClass);
		},
		onItemPress: function(e) {
			if (e.pointerType === 'touch' || this.options.selectOnClick) {
				// select option after "click"
				this.tmpListOffsetTop = this.list.offset().top;
				this.listHolder.on('jcf-pointerup', this.indexSelector, this.onItemRelease);
			} else {
				// select option immediately
				this.onSelectItem(e);
			}
		},
		onItemRelease: function(e) {
			// remove event handlers and temporary data
			this.listHolder.off('jcf-pointerup', this.indexSelector, this.onItemRelease);

			// simulate item selection
			if (this.tmpListOffsetTop === this.list.offset().top) {
				this.listHolder.on('click', this.indexSelector, { savedPointerType: e.pointerType }, this.onSelectItem);
			}
			delete this.tmpListOffsetTop;
		},
		onSelectItem: function(e) {
			var clickedIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute)),
			pointerType = e.data && e.data.savedPointerType || e.pointerType || 'mouse',
			range;

			// remove click event handler
			this.listHolder.off('click', this.indexSelector, this.onSelectItem);

			// ignore clicks on disabled options
			if (e.button > 1 || this.realOptions[clickedIndex].disabled) {
				return;
			}

			if (this.element.prop('multiple')) {
				if (e.metaKey || e.ctrlKey || pointerType === 'touch' || this.options.multipleSelectWithoutKey) {
					// if CTRL/CMD pressed or touch devices - toggle selected option
					this.realOptions[clickedIndex].selected = !this.realOptions[clickedIndex].selected;
				} else if (e.shiftKey) {
					// if SHIFT pressed - update selection
					range = [this.lastClickedIndex, clickedIndex].sort(function(a, b) {
						return a - b;
					});
					this.realOptions.each(function(index, option) {
						option.selected = (index >= range[0] && index <= range[1]);
					});
				} else {
					// set single selected index
					this.element.prop('selectedIndex', clickedIndex);
				}
			} else {
				this.element.prop('selectedIndex', clickedIndex);
			}

			// save last clicked option
			if (!e.shiftKey) {
				this.lastClickedIndex = clickedIndex;
			}

			// refresh classes
			this.refreshSelectedClass();

			// scroll to active item in desktop browsers
			if (pointerType === 'mouse') {
				this.scrollToActiveOption();
			}

			// make callback when item selected
			$(this).trigger('select');
		},
		rebuildList: function() {
			// rebuild options
			var self = this,
			rootElement = this.element[0];

			// recursively create fake options
			this.storedSelectHTML = rootElement.innerHTML;
			this.optionIndex = 0;
			this.list = $(this.createOptionsList(rootElement));
			this.listHolder.empty().append(this.list);
			this.realOptions = this.element.find('option');
			this.fakeOptions = this.list.find(this.indexSelector);
			this.fakeListItems = this.list.find('.' + this.options.captionClass + ',' + this.indexSelector);
			delete this.optionIndex;

			// detect max visible items
			var maxCount = this.options.maxVisibleItems,
			sizeValue = this.element.prop('size');
			if (sizeValue > 1 && !this.element.is('[jcf-size]')) {
				maxCount = sizeValue;
			}

			// handle scrollbar
			var needScrollBar = this.fakeOptions.length > maxCount;
			this.container.toggleClass(this.options.scrollClass, needScrollBar);
			if (needScrollBar) {
				// change max-height
				this.listHolder.css({
					maxHeight: this.getOverflowHeight(maxCount),
					overflow: 'auto'
				});

				if (this.options.useCustomScroll && jcf.modules.Scrollable) {
					// add custom scrollbar if specified in options
					jcf.replace(this.listHolder, 'Scrollable', {
						handleResize: this.options.handleResize,
						alwaysPreventMouseWheel: this.options.alwaysPreventMouseWheel
					});
					return;
				}
			}

			// disable edge wheel scrolling
			if (this.options.alwaysPreventMouseWheel) {
				this.preventWheelHandler = function(e) {
					var currentScrollTop = self.listHolder.scrollTop(),
					maxScrollTop = self.listHolder.prop('scrollHeight') - self.listHolder.innerHeight();

					// check edge cases
					if ((currentScrollTop <= 0 && e.deltaY < 0) || (currentScrollTop >= maxScrollTop && e.deltaY > 0)) {
						e.preventDefault();
					}
				};
				this.listHolder.on('jcf-mousewheel', this.preventWheelHandler);
			}
		},
		refreshSelectedClass: function() {
			var self = this,
			selectedItem,
			isMultiple = this.element.prop('multiple'),
			selectedIndex = this.element.prop('selectedIndex');

			if (isMultiple) {
				this.realOptions.each(function(index, option) {
					self.fakeOptions.eq(index).toggleClass(self.options.selectedClass, !!option.selected);
				});
			} else {
				this.fakeOptions.removeClass(this.options.selectedClass + ' ' + this.options.hoverClass);
				selectedItem = this.fakeOptions.eq(selectedIndex).addClass(this.options.selectedClass);
				if (this.options.useHoverClass) {
					selectedItem.addClass(this.options.hoverClass);
				}
			}
		},
		scrollToActiveOption: function() {
			// scroll to target option
			var targetOffset = this.getActiveOptionOffset();
			if (typeof targetOffset === 'number') {
				this.listHolder.prop('scrollTop', targetOffset);
			}
		},
		getSelectedIndexRange: function() {
			var firstSelected = -1, lastSelected = -1;
			this.realOptions.each(function(index, option) {
				if (option.selected) {
					if (firstSelected < 0) {
						firstSelected = index;
					}
					lastSelected = index;
				}
			});
			return [firstSelected, lastSelected];
		},
		getChangedSelectedIndex: function() {
			var selectedIndex = this.element.prop('selectedIndex'),
			targetIndex;

			if (this.element.prop('multiple')) {
				// multiple selects handling
				if (!this.previousRange) {
					this.previousRange = [selectedIndex, selectedIndex];
				}
				this.currentRange = this.getSelectedIndexRange();
				targetIndex = this.currentRange[this.currentRange[0] !== this.previousRange[0] ? 0 : 1];
				this.previousRange = this.currentRange;
				return targetIndex;
			} else {
				// single choice selects handling
				return selectedIndex;
			}
		},
		getActiveOptionOffset: function() {
			// calc values
			var dropHeight = this.listHolder.height(),
			dropScrollTop = this.listHolder.prop('scrollTop'),
			currentIndex = this.getChangedSelectedIndex(),
			fakeOption = this.fakeOptions.eq(currentIndex),
			fakeOptionOffset = fakeOption.offset().top - this.list.offset().top,
			fakeOptionHeight = fakeOption.innerHeight();

			// scroll list
			if (fakeOptionOffset + fakeOptionHeight >= dropScrollTop + dropHeight) {
				// scroll down (always scroll to option)
				return fakeOptionOffset - dropHeight + fakeOptionHeight;
			} else if (fakeOptionOffset < dropScrollTop) {
				// scroll up to option
				return fakeOptionOffset;
			}
		},
		getOverflowHeight: function(sizeValue) {
			var item = this.fakeListItems.eq(sizeValue - 1),
			listOffset = this.list.offset().top,
			itemOffset = item.offset().top,
			itemHeight = item.innerHeight();

			return itemOffset + itemHeight - listOffset;
		},
		getScrollTop: function() {
			return this.listHolder.scrollTop();
		},
		setScrollTop: function(value) {
			this.listHolder.scrollTop(value);
		},
		createOption: function(option) {
			var newOption = document.createElement('span');
			newOption.className = this.options.optionClass;
			newOption.innerHTML = option.innerHTML;
			newOption.setAttribute(this.options.indexAttribute, this.optionIndex++);

			var optionImage, optionImageSrc = option.getAttribute('data-image');
			if (optionImageSrc) {
				optionImage = document.createElement('img');
				optionImage.src = optionImageSrc;
				newOption.insertBefore(optionImage, newOption.childNodes[0]);
			}
			if (option.disabled) {
				newOption.className += ' ' + this.options.disabledClass;
			}
			if (option.className) {
				newOption.className += ' ' + getPrefixedClasses(option.className, this.options.cloneClassPrefix);
			}
			return newOption;
		},
		createOptGroup: function(optgroup) {
			var optGroupContainer = document.createElement('span'),
			optGroupName = optgroup.getAttribute('label'),
			optGroupCaption, optGroupList;

			// create caption
			optGroupCaption = document.createElement('span');
			optGroupCaption.className = this.options.captionClass;
			optGroupCaption.innerHTML = optGroupName;
			optGroupContainer.appendChild(optGroupCaption);

			// create list of options
			if (optgroup.children.length) {
				optGroupList = this.createOptionsList(optgroup);
				optGroupContainer.appendChild(optGroupList);
			}

			optGroupContainer.className = this.options.groupClass;
			return optGroupContainer;
		},
		createOptionContainer: function() {
			var optionContainer = document.createElement('li');
			return optionContainer;
		},
		createOptionsList: function(container) {
			var self = this,
			list = document.createElement('ul');

			$.each(container.children, function(index, currentNode) {
				var item = self.createOptionContainer(currentNode),
				newNode;

				switch (currentNode.tagName.toLowerCase()) {
					case 'option': newNode = self.createOption(currentNode); break;
					case 'optgroup': newNode = self.createOptGroup(currentNode); break;
				}
				list.appendChild(item).appendChild(newNode);
			});
			return list;
		},
		refresh: function() {
			// check for select innerHTML changes
			if (this.storedSelectHTML !== this.element.prop('innerHTML')) {
				this.rebuildList();
			}

			// refresh custom scrollbar
			var scrollInstance = jcf.getInstance(this.listHolder);
			if (scrollInstance) {
				scrollInstance.refresh();
			}

			// refresh selectes classes
			this.refreshSelectedClass();
		},
		destroy: function() {
			this.listHolder.off('jcf-mousewheel', this.preventWheelHandler);
			this.listHolder.off('jcf-pointerdown', this.indexSelector, this.onSelectItem);
			this.listHolder.off('jcf-pointerover', this.indexSelector, this.onHoverItem);
			this.listHolder.off('jcf-pointerdown', this.onPress);
		}
	});

	// helper functions
	var getPrefixedClasses = function(className, prefixToAdd) {
		return className ? className.replace(/[\s]*([\S]+)+[\s]*/gi, prefixToAdd + '$1 ') : '';
	};
	var makeUnselectable = (function() {
		var unselectableClass = jcf.getOptions().unselectableClass;
		function preventHandler(e) {
			e.preventDefault();
		}
		return function(node) {
			node.addClass(unselectableClass).on('selectstart', preventHandler);
		};
	}());

}(jQuery, this));


 /*!
 * JavaScript Custom Forms : Radio Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
 ;(function($) {
 	'use strict';

 	jcf.addModule({
 		name: 'Radio',
 		selector: 'input[type="radio"]',
 		options: {
 			wrapNative: true,
 			checkedClass: 'jcf-checked',
 			uncheckedClass: 'jcf-unchecked',
 			labelActiveClass: 'jcf-label-active',
 			fakeStructure: '<span class="jcf-radio"><span></span></span>'
 		},
 		matchElement: function(element) {
 			return element.is(':radio');
 		},
 		init: function() {
 			this.initStructure();
 			this.attachEvents();
 			this.refresh();
 		},
 		initStructure: function() {
			// prepare structure
			this.doc = $(document);
			this.realElement = $(this.options.element);
			this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
			this.labelElement = this.getLabelFor();

			if (this.options.wrapNative) {
				// wrap native radio inside fake block
				this.realElement.prependTo(this.fakeElement).css({
					position: 'absolute',
					opacity: 0
				});
			} else {
				// just hide native radio
				this.realElement.addClass(this.options.hiddenClass);
			}
		},
		attachEvents: function() {
			// add event handlers
			this.realElement.on({
				focus: this.onFocus,
				click: this.onRealClick
			});
			this.fakeElement.on('click', this.onFakeClick);
			this.fakeElement.on('jcf-pointerdown', this.onPress);
		},
		onRealClick: function(e) {
			// redraw current radio and its group (setTimeout handles click that might be prevented)
			var self = this;
			this.savedEventObject = e;
			setTimeout(function() {
				self.refreshRadioGroup();
			}, 0);
		},
		onFakeClick: function(e) {
			// skip event if clicked on real element inside wrapper
			if (this.options.wrapNative && this.realElement.is(e.target)) {
				return;
			}

			// toggle checked class
			if (!this.realElement.is(':disabled')) {
				delete this.savedEventObject;
				this.currentActiveRadio = this.getCurrentActiveRadio();
				this.stateChecked = this.realElement.prop('checked');
				this.realElement.prop('checked', true);
				this.fireNativeEvent(this.realElement, 'click');
				if (this.savedEventObject && this.savedEventObject.isDefaultPrevented()) {
					this.realElement.prop('checked', this.stateChecked);
					this.currentActiveRadio.prop('checked', true);
				} else {
					this.fireNativeEvent(this.realElement, 'change');
				}
				delete this.savedEventObject;
			}
		},
		onFocus: function() {
			if (!this.pressedFlag || !this.focusedFlag) {
				this.focusedFlag = true;
				this.fakeElement.addClass(this.options.focusClass);
				this.realElement.on('blur', this.onBlur);
			}
		},
		onBlur: function() {
			if (!this.pressedFlag) {
				this.focusedFlag = false;
				this.fakeElement.removeClass(this.options.focusClass);
				this.realElement.off('blur', this.onBlur);
			}
		},
		onPress: function(e) {
			if (!this.focusedFlag && e.pointerType === 'mouse') {
				this.realElement.focus();
			}
			this.pressedFlag = true;
			this.fakeElement.addClass(this.options.pressedClass);
			this.doc.on('jcf-pointerup', this.onRelease);
		},
		onRelease: function(e) {
			if (this.focusedFlag && e.pointerType === 'mouse') {
				this.realElement.focus();
			}
			this.pressedFlag = false;
			this.fakeElement.removeClass(this.options.pressedClass);
			this.doc.off('jcf-pointerup', this.onRelease);
		},
		getCurrentActiveRadio: function() {
			return this.getRadioGroup(this.realElement).filter(':checked');
		},
		getRadioGroup: function(radio) {
			// find radio group for specified radio button
			var name = radio.attr('name'),
			parentForm = radio.parents('form');

			if (name) {
				if (parentForm.length) {
					return parentForm.find('input[name="' + name + '"]');
				} else {
					return $('input[name="' + name + '"]:not(form input)');
				}
			} else {
				return radio;
			}
		},
		getLabelFor: function() {
			var parentLabel = this.realElement.closest('label'),
			elementId = this.realElement.prop('id');

			if (!parentLabel.length && elementId) {
				parentLabel = $('label[for="' + elementId + '"]');
			}
			return parentLabel.length ? parentLabel : null;
		},
		refreshRadioGroup: function() {
			// redraw current radio and its group
			this.getRadioGroup(this.realElement).each(function() {
				jcf.refresh(this);
			});
		},
		refresh: function() {
			// redraw current radio button
			var isChecked = this.realElement.is(':checked'),
			isDisabled = this.realElement.is(':disabled');

			this.fakeElement.toggleClass(this.options.checkedClass, isChecked)
			.toggleClass(this.options.uncheckedClass, !isChecked)
			.toggleClass(this.options.disabledClass, isDisabled);

			if (this.labelElement) {
				this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
			}
		},
		destroy: function() {
			// restore structure
			if (this.options.wrapNative) {
				this.realElement.insertBefore(this.fakeElement).css({
					position: '',
					width: '',
					height: '',
					opacity: '',
					margin: ''
				});
			} else {
				this.realElement.removeClass(this.options.hiddenClass);
			}

			// removing element will also remove its event handlers
			this.fakeElement.off('jcf-pointerdown', this.onPress);
			this.fakeElement.remove();

			// remove other event handlers
			this.doc.off('jcf-pointerup', this.onRelease);
			this.realElement.off({
				blur: this.onBlur,
				focus: this.onFocus,
				click: this.onRealClick
			});
		}
	});

}(jQuery));


 /*!
 * JavaScript Custom Forms : Checkbox Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
 ;(function($) {
 	'use strict';

 	jcf.addModule({
 		name: 'Checkbox',
 		selector: 'input[type="checkbox"]',
 		options: {
 			wrapNative: true,
 			checkedClass: 'jcf-checked',
 			uncheckedClass: 'jcf-unchecked',
 			labelActiveClass: 'jcf-label-active',
 			fakeStructure: '<span class="jcf-checkbox"><span></span></span>'
 		},
 		matchElement: function(element) {
 			return element.is(':checkbox');
 		},
 		init: function() {
 			this.initStructure();
 			this.attachEvents();
 			this.refresh();
 		},
 		initStructure: function() {
			// prepare structure
			this.doc = $(document);
			this.realElement = $(this.options.element);
			this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
			this.labelElement = this.getLabelFor();

			if (this.options.wrapNative) {
				// wrap native checkbox inside fake block
				this.realElement.appendTo(this.fakeElement).css({
					position: 'absolute',
					height: '100%',
					width: '100%',
					opacity: 0,
					margin: 0
				});
			} else {
				// just hide native checkbox
				this.realElement.addClass(this.options.hiddenClass);
			}
		},
		attachEvents: function() {
			// add event handlers
			this.realElement.on({
				focus: this.onFocus,
				click: this.onRealClick
			});
			this.fakeElement.on('click', this.onFakeClick);
			this.fakeElement.on('jcf-pointerdown', this.onPress);
		},
		onRealClick: function(e) {
			// just redraw fake element (setTimeout handles click that might be prevented)
			var self = this;
			this.savedEventObject = e;
			setTimeout(function() {
				self.refresh();
			}, 0);
		},
		onFakeClick: function(e) {
			// skip event if clicked on real element inside wrapper
			if (this.options.wrapNative && this.realElement.is(e.target)) {
				return;
			}

			// toggle checked class
			if (!this.realElement.is(':disabled')) {
				delete this.savedEventObject;
				this.stateChecked = this.realElement.prop('checked');
				this.realElement.prop('checked', !this.stateChecked);
				this.fireNativeEvent(this.realElement, 'click');
				if (this.savedEventObject && this.savedEventObject.isDefaultPrevented()) {
					this.realElement.prop('checked', this.stateChecked);
				} else {
					this.fireNativeEvent(this.realElement, 'change');
				}
				delete this.savedEventObject;
			}
		},
		onFocus: function() {
			if (!this.pressedFlag || !this.focusedFlag) {
				this.focusedFlag = true;
				this.fakeElement.addClass(this.options.focusClass);
				this.realElement.on('blur', this.onBlur);
			}
		},
		onBlur: function() {
			if (!this.pressedFlag) {
				this.focusedFlag = false;
				this.fakeElement.removeClass(this.options.focusClass);
				this.realElement.off('blur', this.onBlur);
			}
		},
		onPress: function(e) {
			if (!this.focusedFlag && e.pointerType === 'mouse') {
				this.realElement.focus();
			}
			this.pressedFlag = true;
			this.fakeElement.addClass(this.options.pressedClass);
			this.doc.on('jcf-pointerup', this.onRelease);
		},
		onRelease: function(e) {
			if (this.focusedFlag && e.pointerType === 'mouse') {
				this.realElement.focus();
			}
			this.pressedFlag = false;
			this.fakeElement.removeClass(this.options.pressedClass);
			this.doc.off('jcf-pointerup', this.onRelease);
		},
		getLabelFor: function() {
			var parentLabel = this.realElement.closest('label'),
			elementId = this.realElement.prop('id');

			if (!parentLabel.length && elementId) {
				parentLabel = $('label[for="' + elementId + '"]');
			}
			return parentLabel.length ? parentLabel : null;
		},
		refresh: function() {
			// redraw custom checkbox
			var isChecked = this.realElement.is(':checked'),
			isDisabled = this.realElement.is(':disabled');

			this.fakeElement.toggleClass(this.options.checkedClass, isChecked)
			.toggleClass(this.options.uncheckedClass, !isChecked)
			.toggleClass(this.options.disabledClass, isDisabled);

			if (this.labelElement) {
				this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
			}
		},
		destroy: function() {
			// restore structure
			if (this.options.wrapNative) {
				this.realElement.insertBefore(this.fakeElement).css({
					position: '',
					width: '',
					height: '',
					opacity: '',
					margin: ''
				});
			} else {
				this.realElement.removeClass(this.options.hiddenClass);
			}

			// removing element will also remove its event handlers
			this.fakeElement.off('jcf-pointerdown', this.onPress);
			this.fakeElement.remove();

			// remove other event handlers
			this.doc.off('jcf-pointerup', this.onRelease);
			this.realElement.off({
				focus: this.onFocus,
				click: this.onRealClick
			});
		}
	});

}(jQuery));


/*!
 * Datepicker v1.0.9
 * https://fengyuanchen.github.io/datepicker
 *
 * Copyright 2014-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2019-09-21T06:57:34.100Z
 */

 (function (global, factory) {
 	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
 	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
 	(global = global || self, factory(global.jQuery));
 }(this, function ($) { 'use strict';

 	$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

 	function _classCallCheck(instance, Constructor) {
 		if (!(instance instanceof Constructor)) {
 			throw new TypeError("Cannot call a class as a function");
 		}
 	}

 	function _defineProperties(target, props) {
 		for (var i = 0; i < props.length; i++) {
 			var descriptor = props[i];
 			descriptor.enumerable = descriptor.enumerable || false;
 			descriptor.configurable = true;
 			if ("value" in descriptor) descriptor.writable = true;
 				Object.defineProperty(target, descriptor.key, descriptor);
 			}
 		}

 		function _createClass(Constructor, protoProps, staticProps) {
 			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
 				if (staticProps) _defineProperties(Constructor, staticProps);
 					return Constructor;
 				}

 				var DEFAULTS = {
    // Show the datepicker automatically when initialized
    autoShow: false,
    // Hide the datepicker automatically when picked
    autoHide: false,
    // Pick the initial date automatically when initialized
    autoPick: false,
    // Enable inline mode
    inline: false,
    // A element (or selector) for putting the datepicker
    container: null,
    // A element (or selector) for triggering the datepicker
    trigger: null,
    // The ISO language code (built-in: en-US)
    language: '',
    // The date string format
    format: 'mm/dd/yyyy',
    // The initial date
    date: null,
    // The start view date
    startDate: null,
    // The end view date
    endDate: null,
    // The start view when initialized
    startView: 0,
    // 0 for days, 1 for months, 2 for years
    // The start day of the week
    // 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday,
    // 4 for Thursday, 5 for Friday, 6 for Saturday
    weekStart: 0,
    // Show year before month on the datepicker header
    yearFirst: false,
    // A string suffix to the year number.
    yearSuffix: '',
    // Days' name of the week.
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    // Shorter days' name
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    // Shortest days' name
    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    // Months' name
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    // Shorter months' name
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    // A element tag for each item of years, months and days
    itemTag: 'li',
    // A class (CSS) for muted date item
    mutedClass: 'muted',
    // A class (CSS) for picked date item
    pickedClass: 'picked',
    // A class (CSS) for disabled date item
    disabledClass: 'disabled',
    // A class (CSS) for highlight date item
    highlightedClass: 'highlighted',
    // The template of the datepicker
    template: '<div class="datepicker-container">' + '<div class="datepicker-panel" data-view="years picker">' + '<ul>' + '<li data-view="years prev">&lsaquo;</li>' + '<li data-view="years current"></li>' + '<li data-view="years next">&rsaquo;</li>' + '</ul>' + '<ul data-view="years"></ul>' + '</div>' + '<div class="datepicker-panel" data-view="months picker">' + '<ul>' + '<li data-view="year prev">&lsaquo;</li>' + '<li data-view="year current"></li>' + '<li data-view="year next">&rsaquo;</li>' + '</ul>' + '<ul data-view="months"></ul>' + '</div>' + '<div class="datepicker-panel" data-view="days picker">' + '<ul>' + '<li data-view="month prev">&lsaquo;</li>' + '<li data-view="month current"></li>' + '<li data-view="month next">&rsaquo;</li>' + '</ul>' + '<ul data-view="week"></ul>' + '<ul data-view="days"></ul>' + '</div>' + '</div>',
    // The offset top or bottom of the datepicker from the element
    offset: 10,
    // The `z-index` of the datepicker
    zIndex: 1000,
    // Filter each date item (return `false` to disable a date item)
    filter: null,
    // Event shortcuts
    show: null,
    hide: null,
    pick: null
};

var IS_BROWSER = typeof window !== 'undefined';
var WINDOW = IS_BROWSER ? window : {};
var IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in WINDOW.document.documentElement : false;
var NAMESPACE = 'datepicker';
var EVENT_CLICK = "click.".concat(NAMESPACE);
var EVENT_FOCUS = "focus.".concat(NAMESPACE);
var EVENT_HIDE = "hide.".concat(NAMESPACE);
var EVENT_KEYUP = "keyup.".concat(NAMESPACE);
var EVENT_PICK = "pick.".concat(NAMESPACE);
var EVENT_RESIZE = "resize.".concat(NAMESPACE);
var EVENT_SCROLL = "scroll.".concat(NAMESPACE);
var EVENT_SHOW = "show.".concat(NAMESPACE);
var EVENT_TOUCH_START = "touchstart.".concat(NAMESPACE);
var CLASS_HIDE = "".concat(NAMESPACE, "-hide");
var LANGUAGES = {};
var VIEWS = {
	DAYS: 0,
	MONTHS: 1,
	YEARS: 2
};

var toString = Object.prototype.toString;
function typeOf(obj) {
	return toString.call(obj).slice(8, -1).toLowerCase();
}
function isString(value) {
	return typeof value === 'string';
}
var isNaN = Number.isNaN || WINDOW.isNaN;
function isNumber(value) {
	return typeof value === 'number' && !isNaN(value);
}
function isUndefined(value) {
	return typeof value === 'undefined';
}
function isDate(value) {
	return typeOf(value) === 'date' && !isNaN(value.getTime());
}
function proxy(fn, context) {
	for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		args[_key - 2] = arguments[_key];
	}

	return function () {
		for (var _len2 = arguments.length, args2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args2[_key2] = arguments[_key2];
		}

		return fn.apply(context, args.concat(args2));
	};
}
function selectorOf(view) {
	return "[data-view=\"".concat(view, "\"]");
}
function isLeapYear(year) {
	return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function getDaysInMonth(year, month) {
	return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}
function getMinDay(year, month, day) {
	return Math.min(day, getDaysInMonth(year, month));
}
var formatParts = /(y|m|d)+/g;
function parseFormat(format) {
	var source = String(format).toLowerCase();
	var parts = source.match(formatParts);

	if (!parts || parts.length === 0) {
		throw new Error('Invalid date format.');
	}

	format = {
		source: source,
		parts: parts
	};
	$.each(parts, function (i, part) {
		switch (part) {
			case 'dd':
				case 'd':
					format.hasDay = true;
					break;

					case 'mm':
						case 'm':
							format.hasMonth = true;
							break;

							case 'yyyy':
								case 'yy':
									format.hasYear = true;
									break;

									default:
									}
								});
	return format;
}
function getScrollParent(element) {
	var includeHidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	var $element = $(element);
	var position = $element.css('position');
	var excludeStaticParent = position === 'absolute';
	var overflowRegex = includeHidden ? /auto|scroll|hidden/ : /auto|scroll/;
	var scrollParent = $element.parents().filter(function (index, parent) {
		var $parent = $(parent);

		if (excludeStaticParent && $parent.css('position') === 'static') {
			return false;
		}

		return overflowRegex.test($parent.css('overflow') + $parent.css('overflow-y') + $parent.css('overflow-x'));
	}).eq(0);
	return position === 'fixed' || !scrollParent.length ? $(element.ownerDocument || document) : scrollParent;
}
  /**
   * Add leading zeroes to the given value
   * @param {number} value - The value to add.
   * @param {number} [length=1] - The expected value length.
   * @returns {string} Returns converted value.
   */

   function addLeadingZero(value) {
   	var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
   	var str = String(Math.abs(value));
   	var i = str.length;
   	var result = '';

   	if (value < 0) {
   		result += '-';
   	}

   	while (i < length) {
   		i += 1;
   		result += '0';
   	}

   	return result + str;
   }

   var REGEXP_DIGITS = /\d+/g;
   var methods = {
    // Show the datepicker
    show: function show() {
    	if (!this.built) {
    		this.build();
    	}

    	if (this.shown) {
    		return;
    	}

    	if (this.trigger(EVENT_SHOW).isDefaultPrevented()) {
    		return;
    	}

    	this.shown = true;
    	this.$picker.removeClass(CLASS_HIDE).on(EVENT_CLICK, $.proxy(this.click, this));
    	this.showView(this.options.startView);

    	if (!this.inline) {
    		this.$scrollParent.on(EVENT_SCROLL, $.proxy(this.place, this));
    		$(window).on(EVENT_RESIZE, this.onResize = proxy(this.place, this));
    		$(document).on(EVENT_CLICK, this.onGlobalClick = proxy(this.globalClick, this));
    		$(document).on(EVENT_KEYUP, this.onGlobalKeyup = proxy(this.globalKeyup, this));

    		if (IS_TOUCH_DEVICE) {
    			$(document).on(EVENT_TOUCH_START, this.onTouchStart = proxy(this.touchstart, this));
    		}

    		this.place();
    	}
    },
    // Hide the datepicker
    hide: function hide() {
    	if (!this.shown) {
    		return;
    	}

    	if (this.trigger(EVENT_HIDE).isDefaultPrevented()) {
    		return;
    	}

    	this.shown = false;
    	this.$picker.addClass(CLASS_HIDE).off(EVENT_CLICK, this.click);

    	if (!this.inline) {
    		this.$scrollParent.off(EVENT_SCROLL, this.place);
    		$(window).off(EVENT_RESIZE, this.onResize);
    		$(document).off(EVENT_CLICK, this.onGlobalClick);
    		$(document).off(EVENT_KEYUP, this.onGlobalKeyup);

    		if (IS_TOUCH_DEVICE) {
    			$(document).off(EVENT_TOUCH_START, this.onTouchStart);
    		}
    	}
    },
    toggle: function toggle() {
    	if (this.shown) {
    		this.hide();
    	} else {
    		this.show();
    	}
    },
    // Update the datepicker with the current input value
    update: function update() {
    	var value = this.getValue();

    	if (value === this.oldValue) {
    		return;
    	}

    	this.setDate(value, true);
    	this.oldValue = value;
    },

    /**
     * Pick the current date to the element
     *
     * @param {String} _view (private)
     */
     pick: function pick(_view) {
     	var $this = this.$element;
     	var date = this.date;

     	if (this.trigger(EVENT_PICK, {
     		view: _view || '',
     		date: date
     	}).isDefaultPrevented()) {
     		return;
     	}

     	date = this.formatDate(this.date);
     	this.setValue(date);

     	if (this.isInput) {
     		$this.trigger('input');
     		$this.trigger('change');
     	}
     },
    // Reset the datepicker
    reset: function reset() {
    	this.setDate(this.initialDate, true);
    	this.setValue(this.initialValue);

    	if (this.shown) {
    		this.showView(this.options.startView);
    	}
    },

    /**
     * Get the month name with given argument or the current date
     *
     * @param {Number} month (optional)
     * @param {Boolean} shortForm (optional)
     * @return {String} (month name)
     */
     getMonthName: function getMonthName(month, shortForm) {
     	var options = this.options;
     	var monthsShort = options.monthsShort;
     	var months = options.months;

     	if ($.isNumeric(month)) {
     		month = Number(month);
     	} else if (isUndefined(shortForm)) {
     		shortForm = month;
     	}

     	if (shortForm === true) {
     		months = monthsShort;
     	}

     	return months[isNumber(month) ? month : this.date.getMonth()];
     },

    /**
     * Get the day name with given argument or the current date
     *
     * @param {Number} day (optional)
     * @param {Boolean} shortForm (optional)
     * @param {Boolean} min (optional)
     * @return {String} (day name)
     */
     getDayName: function getDayName(day, shortForm, min) {
     	var options = this.options;
     	var days = options.days;

     	if ($.isNumeric(day)) {
     		day = Number(day);
     	} else {
     		if (isUndefined(min)) {
     			min = shortForm;
     		}

     		if (isUndefined(shortForm)) {
     			shortForm = day;
     		}
     	}

     	if (min) {
     		days = options.daysMin;
     	} else if (shortForm) {
     		days = options.daysShort;
     	}

     	return days[isNumber(day) ? day : this.date.getDay()];
     },

    /**
     * Get the current date
     *
     * @param {Boolean} formatted (optional)
     * @return {Date|String} (date)
     */
     getDate: function getDate(formatted) {
     	var date = this.date;
     	return formatted ? this.formatDate(date) : new Date(date);
     },

    /**
     * Set the current date with a new date
     *
     * @param {Date} date
     * @param {Boolean} _updated (private)
     */
     setDate: function setDate(date, _updated) {
     	var filter = this.options.filter;

     	if (isDate(date) || isString(date)) {
     		date = this.parseDate(date);

     		if ($.isFunction(filter) && filter.call(this.$element, date, 'day') === false) {
     			return;
     		}

     		this.date = date;
     		this.viewDate = new Date(date);

     		if (!_updated) {
     			this.pick();
     		}

     		if (this.built) {
     			this.render();
     		}
     	}
     },

    /**
     * Set the start view date with a new date
     *
     * @param {Date|string|null} date
     */
     setStartDate: function setStartDate(date) {
     	if (isDate(date) || isString(date)) {
     		this.startDate = this.parseDate(date);
     	} else {
     		this.startDate = null;
     	}

     	if (this.built) {
     		this.render();
     	}
     },

    /**
     * Set the end view date with a new date
     *
     * @param {Date|string|null} date
     */
     setEndDate: function setEndDate(date) {
     	if (isDate(date) || isString(date)) {
     		this.endDate = this.parseDate(date);
     	} else {
     		this.endDate = null;
     	}

     	if (this.built) {
     		this.render();
     	}
     },

    /**
     * Parse a date string with the set date format
     *
     * @param {String} date
     * @return {Date} (parsed date)
     */
     parseDate: function parseDate(date) {
     	var format = this.format;
     	var parts = [];

     	if (!isDate(date)) {
     		if (isString(date)) {
     			parts = date.match(REGEXP_DIGITS) || [];
     		}

     		date = date ? new Date(date) : new Date();

     		if (!isDate(date)) {
     			date = new Date();
     		}

     		if (parts.length === format.parts.length) {
          // Set year and month first
          $.each(parts, function (i, part) {
          	var value = parseInt(part, 10);

          	switch (format.parts[i]) {
          		case 'yy':
          			date.setFullYear(2000 + value);
          			break;

          			case 'yyyy':
                // Converts 2-digit year to 2000+
                date.setFullYear(part.length === 2 ? 2000 + value : value);
                break;

                case 'mm':
                	case 'm':
                		date.setMonth(value - 1);
                		break;

                		default:
                		}
          }); // Set day in the last to avoid converting `31/10/2019` to `01/10/2019`

          $.each(parts, function (i, part) {
          	var value = parseInt(part, 10);

          	switch (format.parts[i]) {
          		case 'dd':
          			case 'd':
          				date.setDate(value);
          				break;

          				default:
          				}
          			});
      }
      } // Ignore hours, minutes, seconds and milliseconds to avoid side effect (#192)


      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  },

    /**
     * Format a date object to a string with the set date format
     *
     * @param {Date} date
     * @return {String} (formatted date)
     */
     formatDate: function formatDate(date) {
     	var format = this.format;
     	var formatted = '';

     	if (isDate(date)) {
     		var year = date.getFullYear();
     		var month = date.getMonth();
     		var day = date.getDate();
     		var values = {
     			d: day,
     			dd: addLeadingZero(day, 2),
     			m: month + 1,
     			mm: addLeadingZero(month + 1, 2),
     			yy: String(year).substring(2),
     			yyyy: addLeadingZero(year, 4)
     		};
     		formatted = format.source;
     		$.each(format.parts, function (i, part) {
     			formatted = formatted.replace(part, values[part]);
     		});
     	}

     	return formatted;
     },
    // Destroy the datepicker and remove the instance from the target element
    destroy: function destroy() {
    	this.unbind();
    	this.unbuild();
    	this.$element.removeData(NAMESPACE);
    }
};

var handlers = {
	click: function click(e) {
		var $target = $(e.target);
		var options = this.options,
		date = this.date,
		viewDate = this.viewDate,
		format = this.format;
		e.stopPropagation();
		e.preventDefault();

		if ($target.hasClass('disabled')) {
			return;
		}

		var view = $target.data('view');
		var viewYear = viewDate.getFullYear();
		var viewMonth = viewDate.getMonth();
		var viewDay = viewDate.getDate();

		switch (view) {
			case 'years prev':
			case 'years next':
			{
				viewYear = view === 'years prev' ? viewYear - 10 : viewYear + 10;
				viewDate.setFullYear(viewYear);
				viewDate.setDate(getMinDay(viewYear, viewMonth, viewDay));
				this.renderYears();
				break;
			}

			case 'year prev':
			case 'year next':
			viewYear = view === 'year prev' ? viewYear - 1 : viewYear + 1;
			viewDate.setFullYear(viewYear);
			viewDate.setDate(getMinDay(viewYear, viewMonth, viewDay));
			this.renderMonths();
			break;

			case 'year current':
			if (format.hasYear) {
				this.showView(VIEWS.YEARS);
			}

			break;

			case 'year picked':
			if (format.hasMonth) {
				this.showView(VIEWS.MONTHS);
			} else {
				$target.siblings(".".concat(options.pickedClass)).removeClass(options.pickedClass).data('view', 'year');
				this.hideView();
			}

			this.pick('year');
			break;

			case 'year':
          viewYear = parseInt($target.text(), 10); // Set date first to avoid month changing (#195)

          date.setDate(getMinDay(viewYear, viewMonth, viewDay));
          date.setFullYear(viewYear);
          viewDate.setDate(getMinDay(viewYear, viewMonth, viewDay));
          viewDate.setFullYear(viewYear);

          if (format.hasMonth) {
          	this.showView(VIEWS.MONTHS);
          } else {
          	$target.addClass(options.pickedClass).data('view', 'year picked').siblings(".".concat(options.pickedClass)).removeClass(options.pickedClass).data('view', 'year');
          	this.hideView();
          }

          this.pick('year');
          break;

          case 'month prev':
          case 'month next':
          viewMonth = view === 'month prev' ? viewMonth - 1 : viewMonth + 1;

          if (viewMonth < 0) {
          	viewYear -= 1;
          	viewMonth += 12;
          } else if (viewMonth > 11) {
          	viewYear += 1;
          	viewMonth -= 12;
          }

          viewDate.setFullYear(viewYear);
          viewDate.setDate(getMinDay(viewYear, viewMonth, viewDay));
          viewDate.setMonth(viewMonth);
          this.renderDays();
          break;

          case 'month current':
          if (format.hasMonth) {
          	this.showView(VIEWS.MONTHS);
          }

          break;

          case 'month picked':
          if (format.hasDay) {
          	this.showView(VIEWS.DAYS);
          } else {
          	$target.siblings(".".concat(options.pickedClass)).removeClass(options.pickedClass).data('view', 'month');
          	this.hideView();
          }

          this.pick('month');
          break;

          case 'month':
          	viewMonth = $.inArray($target.text(), options.monthsShort);
          date.setFullYear(viewYear); // Set date before month to avoid month changing (#195)

          date.setDate(getMinDay(viewYear, viewMonth, viewDay));
          date.setMonth(viewMonth);
          viewDate.setFullYear(viewYear);
          viewDate.setDate(getMinDay(viewYear, viewMonth, viewDay));
          viewDate.setMonth(viewMonth);

          if (format.hasDay) {
          	this.showView(VIEWS.DAYS);
          } else {
          	$target.addClass(options.pickedClass).data('view', 'month picked').siblings(".".concat(options.pickedClass)).removeClass(options.pickedClass).data('view', 'month');
          	this.hideView();
          }

          this.pick('month');
          break;

          case 'day prev':
          case 'day next':
          case 'day':
          	if (view === 'day prev') {
          		viewMonth -= 1;
          	} else if (view === 'day next') {
          		viewMonth += 1;
          	}

          viewDay = parseInt($target.text(), 10); // Set date to 1 to avoid month changing (#195)

          date.setDate(1);
          date.setFullYear(viewYear);
          date.setMonth(viewMonth);
          date.setDate(viewDay);
          viewDate.setDate(1);
          viewDate.setFullYear(viewYear);
          viewDate.setMonth(viewMonth);
          viewDate.setDate(viewDay);
          this.renderDays();

          if (view === 'day') {
          	this.hideView();
          }

          this.pick('day');
          break;

          case 'day picked':
          this.hideView();
          this.pick('day');
          break;

          default:
          }
      },
      globalClick: function globalClick(_ref) {
      	var target = _ref.target;
      	var element = this.element,
      	$trigger = this.$trigger;
      	var trigger = $trigger[0];
      	var hidden = true;

      	while (target !== document) {
      		if (target === trigger || target === element) {
      			hidden = false;
      			break;
      		}

      		target = target.parentNode;
      	}

      	if (hidden) {
      		this.hide();
      	}
      },
      keyup: function keyup() {
      	this.update();
      },
      globalKeyup: function globalKeyup(_ref2) {
      	var target = _ref2.target,
      	key = _ref2.key,
      	keyCode = _ref2.keyCode;

      	if (this.isInput && target !== this.element && this.shown && (key === 'Tab' || keyCode === 9)) {
      		this.hide();
      	}
      },
      touchstart: function touchstart(_ref3) {
      	var target = _ref3.target;

      // Emulate click in touch devices to support hiding the picker automatically (#197).
      if (this.isInput && target !== this.element && !$.contains(this.$picker[0], target)) {
      	this.hide();
      	this.element.blur();
      }
  }
};

var render = {
	render: function render() {
		this.renderYears();
		this.renderMonths();
		this.renderDays();
	},
	renderWeek: function renderWeek() {
		var _this = this;

		var items = [];
		var _this$options = this.options,
		weekStart = _this$options.weekStart,
		daysMin = _this$options.daysMin;
		weekStart = parseInt(weekStart, 10) % 7;
		daysMin = daysMin.slice(weekStart).concat(daysMin.slice(0, weekStart));
		$.each(daysMin, function (i, day) {
			items.push(_this.createItem({
				text: day
			}));
		});
		this.$week.html(items.join(''));
	},
	renderYears: function renderYears() {
		var options = this.options,
		startDate = this.startDate,
		endDate = this.endDate;
		var disabledClass = options.disabledClass,
		filter = options.filter,
		yearSuffix = options.yearSuffix;
		var viewYear = this.viewDate.getFullYear();
		var now = new Date();
		var thisYear = now.getFullYear();
		var year = this.date.getFullYear();
		var start = -5;
		var end = 6;
		var items = [];
		var prevDisabled = false;
		var nextDisabled = false;
		var i;

		for (i = start; i <= end; i += 1) {
			var date = new Date(viewYear + i, 1, 1);
			var disabled = false;

			if (startDate) {
				disabled = date.getFullYear() < startDate.getFullYear();

				if (i === start) {
					prevDisabled = disabled;
				}
			}

			if (!disabled && endDate) {
				disabled = date.getFullYear() > endDate.getFullYear();

				if (i === end) {
					nextDisabled = disabled;
				}
			}

			if (!disabled && filter) {
				disabled = filter.call(this.$element, date, 'year') === false;
			}

			var picked = viewYear + i === year;
			var view = picked ? 'year picked' : 'year';
			items.push(this.createItem({
				picked: picked,
				disabled: disabled,
				text: viewYear + i,
				view: disabled ? 'year disabled' : view,
				highlighted: date.getFullYear() === thisYear
			}));
		}

		this.$yearsPrev.toggleClass(disabledClass, prevDisabled);
		this.$yearsNext.toggleClass(disabledClass, nextDisabled);
		this.$yearsCurrent.toggleClass(disabledClass, true).html("".concat(viewYear + start + yearSuffix, " - ").concat(viewYear + end).concat(yearSuffix));
		this.$years.html(items.join(''));
	},
	renderMonths: function renderMonths() {
		var options = this.options,
		startDate = this.startDate,
		endDate = this.endDate,
		viewDate = this.viewDate;
		var disabledClass = options.disabledClass || '';
		var months = options.monthsShort;
		var filter = $.isFunction(options.filter) && options.filter;
		var viewYear = viewDate.getFullYear();
		var now = new Date();
		var thisYear = now.getFullYear();
		var thisMonth = now.getMonth();
		var year = this.date.getFullYear();
		var month = this.date.getMonth();
		var items = [];
		var prevDisabled = false;
		var nextDisabled = false;
		var i;

		for (i = 0; i <= 11; i += 1) {
			var date = new Date(viewYear, i, 1);
			var disabled = false;

			if (startDate) {
				prevDisabled = date.getFullYear() === startDate.getFullYear();
				disabled = prevDisabled && date.getMonth() < startDate.getMonth();
			}

			if (!disabled && endDate) {
				nextDisabled = date.getFullYear() === endDate.getFullYear();
				disabled = nextDisabled && date.getMonth() > endDate.getMonth();
			}

			if (!disabled && filter) {
				disabled = filter.call(this.$element, date, 'month') === false;
			}

			var picked = viewYear === year && i === month;
			var view = picked ? 'month picked' : 'month';
			items.push(this.createItem({
				disabled: disabled,
				picked: picked,
				highlighted: viewYear === thisYear && date.getMonth() === thisMonth,
				index: i,
				text: months[i],
				view: disabled ? 'month disabled' : view
			}));
		}

		this.$yearPrev.toggleClass(disabledClass, prevDisabled);
		this.$yearNext.toggleClass(disabledClass, nextDisabled);
		this.$yearCurrent.toggleClass(disabledClass, prevDisabled && nextDisabled).html(viewYear + options.yearSuffix || '');
		this.$months.html(items.join(''));
	},
	renderDays: function renderDays() {
		var $element = this.$element,
		options = this.options,
		startDate = this.startDate,
		endDate = this.endDate,
		viewDate = this.viewDate,
		currentDate = this.date;
		var disabledClass = options.disabledClass,
		filter = options.filter,
		months = options.months,
		weekStart = options.weekStart,
		yearSuffix = options.yearSuffix;
		var viewYear = viewDate.getFullYear();
		var viewMonth = viewDate.getMonth();
		var now = new Date();
		var thisYear = now.getFullYear();
		var thisMonth = now.getMonth();
		var thisDay = now.getDate();
		var year = currentDate.getFullYear();
		var month = currentDate.getMonth();
		var day = currentDate.getDate();
		var length;
		var i;
      var n; // Days of prev month
      // -----------------------------------------------------------------------

      var prevItems = [];
      var prevViewYear = viewYear;
      var prevViewMonth = viewMonth;
      var prevDisabled = false;

      if (viewMonth === 0) {
      	prevViewYear -= 1;
      	prevViewMonth = 11;
      } else {
      	prevViewMonth -= 1;
      } // The length of the days of prev month


      length = getDaysInMonth(prevViewYear, prevViewMonth); // The first day of current month

      var firstDay = new Date(viewYear, viewMonth, 1); // The visible length of the days of prev month
      // [0,1,2,3,4,5,6] - [0,1,2,3,4,5,6] => [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6]

      n = firstDay.getDay() - parseInt(weekStart, 10) % 7; // [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6] => [1,2,3,4,5,6,7]

      if (n <= 0) {
      	n += 7;
      }

      if (startDate) {
      	prevDisabled = firstDay.getTime() <= startDate.getTime();
      }

      for (i = length - (n - 1); i <= length; i += 1) {
      	var prevViewDate = new Date(prevViewYear, prevViewMonth, i);
      	var disabled = false;

      	if (startDate) {
      		disabled = prevViewDate.getTime() < startDate.getTime();
      	}

      	if (!disabled && filter) {
      		disabled = filter.call($element, prevViewDate, 'day') === false;
      	}

      	prevItems.push(this.createItem({
      		disabled: disabled,
      		highlighted: prevViewYear === thisYear && prevViewMonth === thisMonth && prevViewDate.getDate() === thisDay,
      		muted: true,
      		picked: prevViewYear === year && prevViewMonth === month && i === day,
      		text: i,
      		view: 'day prev'
      	}));
      } // Days of next month
      // -----------------------------------------------------------------------


      var nextItems = [];
      var nextViewYear = viewYear;
      var nextViewMonth = viewMonth;
      var nextDisabled = false;

      if (viewMonth === 11) {
      	nextViewYear += 1;
      	nextViewMonth = 0;
      } else {
      	nextViewMonth += 1;
      } // The length of the days of current month


      length = getDaysInMonth(viewYear, viewMonth); // The visible length of next month (42 means 6 rows and 7 columns)

      n = 42 - (prevItems.length + length); // The last day of current month

      var lastDate = new Date(viewYear, viewMonth, length);

      if (endDate) {
      	nextDisabled = lastDate.getTime() >= endDate.getTime();
      }

      for (i = 1; i <= n; i += 1) {
      	var date = new Date(nextViewYear, nextViewMonth, i);
      	var picked = nextViewYear === year && nextViewMonth === month && i === day;
      	var _disabled = false;

      	if (endDate) {
      		_disabled = date.getTime() > endDate.getTime();
      	}

      	if (!_disabled && filter) {
      		_disabled = filter.call($element, date, 'day') === false;
      	}

      	nextItems.push(this.createItem({
      		disabled: _disabled,
      		picked: picked,
      		highlighted: nextViewYear === thisYear && nextViewMonth === thisMonth && date.getDate() === thisDay,
      		muted: true,
      		text: i,
      		view: 'day next'
      	}));
      } // Days of current month
      // -----------------------------------------------------------------------


      var items = [];

      for (i = 1; i <= length; i += 1) {
      	var _date = new Date(viewYear, viewMonth, i);

      	var _disabled2 = false;

      	if (startDate) {
      		_disabled2 = _date.getTime() < startDate.getTime();
      	}

      	if (!_disabled2 && endDate) {
      		_disabled2 = _date.getTime() > endDate.getTime();
      	}

      	if (!_disabled2 && filter) {
      		_disabled2 = filter.call($element, _date, 'day') === false;
      	}

      	var _picked = viewYear === year && viewMonth === month && i === day;

      	var view = _picked ? 'day picked' : 'day';
      	items.push(this.createItem({
      		disabled: _disabled2,
      		picked: _picked,
      		highlighted: viewYear === thisYear && viewMonth === thisMonth && _date.getDate() === thisDay,
      		text: i,
      		view: _disabled2 ? 'day disabled' : view
      	}));
      } // Render days picker
      // -----------------------------------------------------------------------


      this.$monthPrev.toggleClass(disabledClass, prevDisabled);
      this.$monthNext.toggleClass(disabledClass, nextDisabled);
      this.$monthCurrent.toggleClass(disabledClass, prevDisabled && nextDisabled).html(options.yearFirst ? "".concat(viewYear + yearSuffix, " ").concat(months[viewMonth]) : "".concat(months[viewMonth], " ").concat(viewYear).concat(yearSuffix));
      this.$days.html(prevItems.join('') + items.join('') + nextItems.join(''));
  }
};

var CLASS_TOP_LEFT = "".concat(NAMESPACE, "-top-left");
var CLASS_TOP_RIGHT = "".concat(NAMESPACE, "-top-right");
var CLASS_BOTTOM_LEFT = "".concat(NAMESPACE, "-bottom-left");
var CLASS_BOTTOM_RIGHT = "".concat(NAMESPACE, "-bottom-right");
var CLASS_PLACEMENTS = [CLASS_TOP_LEFT, CLASS_TOP_RIGHT, CLASS_BOTTOM_LEFT, CLASS_BOTTOM_RIGHT].join(' ');

var Datepicker =
/*#__PURE__*/
function () {
	function Datepicker(element) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, Datepicker);

		this.$element = $(element);
		this.element = element;
		this.options = $.extend({}, DEFAULTS, LANGUAGES[options.language], $.isPlainObject(options) && options);
		this.$scrollParent = getScrollParent(element, true);
		this.built = false;
		this.shown = false;
		this.isInput = false;
		this.inline = false;
		this.initialValue = '';
		this.initialDate = null;
		this.startDate = null;
		this.endDate = null;
		this.init();
	}

	_createClass(Datepicker, [{
		key: "init",
		value: function init() {
			var $this = this.$element,
			options = this.options;
			var startDate = options.startDate,
			endDate = options.endDate,
			date = options.date;
			this.$trigger = $(options.trigger);
			this.isInput = $this.is('input') || $this.is('textarea');
			this.inline = options.inline && (options.container || !this.isInput);
			this.format = parseFormat(options.format);
			var initialValue = this.getValue();
			this.initialValue = initialValue;
			this.oldValue = initialValue;
			date = this.parseDate(date || initialValue);

			if (startDate) {
				startDate = this.parseDate(startDate);

				if (date.getTime() < startDate.getTime()) {
					date = new Date(startDate);
				}

				this.startDate = startDate;
			}

			if (endDate) {
				endDate = this.parseDate(endDate);

				if (startDate && endDate.getTime() < startDate.getTime()) {
					endDate = new Date(startDate);
				}

				if (date.getTime() > endDate.getTime()) {
					date = new Date(endDate);
				}

				this.endDate = endDate;
			}

			this.date = date;
			this.viewDate = new Date(date);
			this.initialDate = new Date(this.date);
			this.bind();

			if (options.autoShow || this.inline) {
				this.show();
			}

			if (options.autoPick) {
				this.pick();
			}
		}
	}, {
		key: "build",
		value: function build() {
			if (this.built) {
				return;
			}

			this.built = true;
			var $this = this.$element,
			options = this.options;
			var $picker = $(options.template);
			this.$picker = $picker;
        this.$week = $picker.find(selectorOf('week')); // Years view

        this.$yearsPicker = $picker.find(selectorOf('years picker'));
        this.$yearsPrev = $picker.find(selectorOf('years prev'));
        this.$yearsNext = $picker.find(selectorOf('years next'));
        this.$yearsCurrent = $picker.find(selectorOf('years current'));
        this.$years = $picker.find(selectorOf('years')); // Months view

        this.$monthsPicker = $picker.find(selectorOf('months picker'));
        this.$yearPrev = $picker.find(selectorOf('year prev'));
        this.$yearNext = $picker.find(selectorOf('year next'));
        this.$yearCurrent = $picker.find(selectorOf('year current'));
        this.$months = $picker.find(selectorOf('months')); // Days view

        this.$daysPicker = $picker.find(selectorOf('days picker'));
        this.$monthPrev = $picker.find(selectorOf('month prev'));
        this.$monthNext = $picker.find(selectorOf('month next'));
        this.$monthCurrent = $picker.find(selectorOf('month current'));
        this.$days = $picker.find(selectorOf('days'));

        if (this.inline) {
        	$(options.container || $this).append($picker.addClass("".concat(NAMESPACE, "-inline")));
        } else {
        	$(document.body).append($picker.addClass("".concat(NAMESPACE, "-dropdown")));
        	$picker.addClass(CLASS_HIDE).css({
        		zIndex: parseInt(options.zIndex, 10)
        	});
        }

        this.renderWeek();
    }
}, {
	key: "unbuild",
	value: function unbuild() {
		if (!this.built) {
			return;
		}

		this.built = false;
		this.$picker.remove();
	}
}, {
	key: "bind",
	value: function bind() {
		var options = this.options,
		$this = this.$element;

		if ($.isFunction(options.show)) {
			$this.on(EVENT_SHOW, options.show);
		}

		if ($.isFunction(options.hide)) {
			$this.on(EVENT_HIDE, options.hide);
		}

		if ($.isFunction(options.pick)) {
			$this.on(EVENT_PICK, options.pick);
		}

		if (this.isInput) {
			$this.on(EVENT_KEYUP, $.proxy(this.keyup, this));
		}

		if (!this.inline) {
			if (options.trigger) {
				this.$trigger.on(EVENT_CLICK, $.proxy(this.toggle, this));
			} else if (this.isInput) {
				$this.on(EVENT_FOCUS, $.proxy(this.show, this));
			} else {
				$this.on(EVENT_CLICK, $.proxy(this.show, this));
			}
		}
	}
}, {
	key: "unbind",
	value: function unbind() {
		var $this = this.$element,
		options = this.options;

		if ($.isFunction(options.show)) {
			$this.off(EVENT_SHOW, options.show);
		}

		if ($.isFunction(options.hide)) {
			$this.off(EVENT_HIDE, options.hide);
		}

		if ($.isFunction(options.pick)) {
			$this.off(EVENT_PICK, options.pick);
		}

		if (this.isInput) {
			$this.off(EVENT_KEYUP, this.keyup);
		}

		if (!this.inline) {
			if (options.trigger) {
				this.$trigger.off(EVENT_CLICK, this.toggle);
			} else if (this.isInput) {
				$this.off(EVENT_FOCUS, this.show);
			} else {
				$this.off(EVENT_CLICK, this.show);
			}
		}
	}
}, {
	key: "showView",
	value: function showView(view) {
		var $yearsPicker = this.$yearsPicker,
		$monthsPicker = this.$monthsPicker,
		$daysPicker = this.$daysPicker,
		format = this.format;

		if (format.hasYear || format.hasMonth || format.hasDay) {
			switch (Number(view)) {
				case VIEWS.YEARS:
					$monthsPicker.addClass(CLASS_HIDE);
					$daysPicker.addClass(CLASS_HIDE);

					if (format.hasYear) {
						this.renderYears();
						$yearsPicker.removeClass(CLASS_HIDE);
						this.place();
					} else {
						this.showView(VIEWS.DAYS);
					}

					break;

					case VIEWS.MONTHS:
						$yearsPicker.addClass(CLASS_HIDE);
						$daysPicker.addClass(CLASS_HIDE);

						if (format.hasMonth) {
							this.renderMonths();
							$monthsPicker.removeClass(CLASS_HIDE);
							this.place();
						} else {
							this.showView(VIEWS.YEARS);
						}

						break;
            // case VIEWS.DAYS:

            default:
            	$yearsPicker.addClass(CLASS_HIDE);
            	$monthsPicker.addClass(CLASS_HIDE);

            	if (format.hasDay) {
            		this.renderDays();
            		$daysPicker.removeClass(CLASS_HIDE);
            		this.place();
            	} else {
            		this.showView(VIEWS.MONTHS);
            	}

            }
        }
    }
}, {
	key: "hideView",
	value: function hideView() {
		if (!this.inline && this.options.autoHide) {
			this.hide();
		}
	}
}, {
	key: "place",
	value: function place() {
		if (this.inline) {
			return;
		}

		var $this = this.$element,
		options = this.options,
		$picker = this.$picker;
		var containerWidth = $(document).outerWidth();
		var containerHeight = $(document).outerHeight();
		var elementWidth = $this.outerWidth();
		var elementHeight = $this.outerHeight();
		var width = $picker.width();
		var height = $picker.height();

		var _$this$offset = $this.offset(),
		left = _$this$offset.left,
		top = _$this$offset.top;

		var offset = parseFloat(options.offset);
		var placement = CLASS_TOP_LEFT;

		if (isNaN(offset)) {
			offset = 10;
		}

		if (top > height && top + elementHeight + height > containerHeight) {
			top -= height + offset;
			placement = CLASS_BOTTOM_LEFT;
		} else {
			top += elementHeight + offset;
		}

		if (left + width > containerWidth) {
			left += elementWidth - width;
			placement = placement.replace('left', 'right');
		}

		$picker.removeClass(CLASS_PLACEMENTS).addClass(placement).css({
			top: top,
			left: left
		});
      } // A shortcut for triggering custom events

  }, {
  	key: "trigger",
  	value: function trigger(type, data) {
  		var e = $.Event(type, data);
  		this.$element.trigger(e);
  		return e;
  	}
  }, {
  	key: "createItem",
  	value: function createItem(data) {
  		var options = this.options;
  		var itemTag = options.itemTag;
  		var item = {
  			text: '',
  			view: '',
  			muted: false,
  			picked: false,
  			disabled: false,
  			highlighted: false
  		};
  		var classes = [];
  		$.extend(item, data);

  		if (item.muted) {
  			classes.push(options.mutedClass);
  		}

  		if (item.highlighted) {
  			classes.push(options.highlightedClass);
  		}

  		if (item.picked) {
  			classes.push(options.pickedClass);
  		}

  		if (item.disabled) {
  			classes.push(options.disabledClass);
  		}

  		return "<".concat(itemTag, " class=\"").concat(classes.join(' '), "\" data-view=\"").concat(item.view, "\">").concat(item.text, "</").concat(itemTag, ">");
  	}
  }, {
  	key: "getValue",
  	value: function getValue() {
  		var $this = this.$element;
  		return this.isInput ? $this.val() : $this.text();
  	}
  }, {
  	key: "setValue",
  	value: function setValue() {
  		var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  		var $this = this.$element;

  		if (this.isInput) {
  			$this.val(value);
  		} else if (!this.inline || this.options.container) {
  			$this.text(value);
  		}
  	}
  }], [{
  	key: "setDefaults",
  	value: function setDefaults() {
  		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  		$.extend(DEFAULTS, LANGUAGES[options.language], $.isPlainObject(options) && options);
  	}
  }]);

return Datepicker;
}();

if ($.extend) {
	$.extend(Datepicker.prototype, render, handlers, methods);
}

if ($.fn) {
	var AnotherDatepicker = $.fn.datepicker;

	$.fn.datepicker = function jQueryDatepicker(option) {
		for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		var result;
		this.each(function (i, element) {
			var $element = $(element);
			var isDestroy = option === 'destroy';
			var datepicker = $element.data(NAMESPACE);

			if (!datepicker) {
				if (isDestroy) {
					return;
				}

				var options = $.extend({}, $element.data(), $.isPlainObject(option) && option);
				datepicker = new Datepicker(element, options);
				$element.data(NAMESPACE, datepicker);
			}

			if (isString(option)) {
				var fn = datepicker[option];

				if ($.isFunction(fn)) {
					result = fn.apply(datepicker, args);

					if (isDestroy) {
						$element.removeData(NAMESPACE);
					}
				}
			}
		});
		return !isUndefined(result) ? result : this;
	};

	$.fn.datepicker.Constructor = Datepicker;
	$.fn.datepicker.languages = LANGUAGES;
	$.fn.datepicker.setDefaults = Datepicker.setDefaults;

	$.fn.datepicker.noConflict = function noConflict() {
		$.fn.datepicker = AnotherDatepicker;
		return this;
	};
}

}));



/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

  */
  /* global window, document, define, jQuery, setInterval, clearInterval */
  ;(function(factory) {
  	'use strict';
  	if (typeof define === 'function' && define.amd) {
  		define(['jquery'], factory);
  	} else if (typeof exports !== 'undefined') {
  		module.exports = factory(require('jquery'));
  	} else {
  		factory(jQuery);
  	}

  }(function($) {
  	'use strict';
  	var Slick = window.Slick || {};

  	Slick = (function() {

  		var instanceUid = 0;

  		function Slick(element, settings) {

  			var _ = this, dataSettings;

  			_.defaults = {
  				accessibility: true,
  				adaptiveHeight: false,
  				appendArrows: $(element),
  				appendDots: $(element),
  				arrows: true,
  				asNavFor: null,
  				prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
  				nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
  				autoplay: false,
  				autoplaySpeed: 3000,
  				centerMode: false,
  				centerPadding: '50px',
  				cssEase: 'ease',
  				customPaging: function(slider, i) {
  					return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1);
  				},
  				dots: false,
  				dotsClass: 'slick-dots',
  				draggable: true,
  				easing: 'linear',
  				edgeFriction: 0.35,
  				fade: false,
  				focusOnSelect: false,
  				infinite: true,
  				initialSlide: 0,
  				lazyLoad: 'ondemand',
  				mobileFirst: false,
  				pauseOnHover: true,
  				pauseOnFocus: true,
  				pauseOnDotsHover: false,
  				respondTo: 'window',
  				responsive: null,
  				rows: 1,
  				rtl: false,
  				slide: '',
  				slidesPerRow: 1,
  				slidesToShow: 1,
  				slidesToScroll: 1,
  				speed: 500,
  				swipe: true,
  				swipeToSlide: false,
  				touchMove: true,
  				touchThreshold: 5,
  				useCSS: true,
  				useTransform: true,
  				variableWidth: false,
  				vertical: false,
  				verticalSwiping: false,
  				waitForAnimate: true,
  				zIndex: 1000
  			};

  			_.initials = {
  				animating: false,
  				dragging: false,
  				autoPlayTimer: null,
  				currentDirection: 0,
  				currentLeft: null,
  				currentSlide: 0,
  				direction: 1,
  				$dots: null,
  				listWidth: null,
  				listHeight: null,
  				loadIndex: 0,
  				$nextArrow: null,
  				$prevArrow: null,
  				scrolling: false,
  				slideCount: null,
  				slideWidth: null,
  				$slideTrack: null,
  				$slides: null,
  				sliding: false,
  				slideOffset: 0,
  				swipeLeft: null,
  				swiping: false,
  				$list: null,
  				touchObject: {},
  				transformsEnabled: false,
  				unslicked: false
  			};

  			$.extend(_, _.initials);

  			_.activeBreakpoint = null;
  			_.animType = null;
  			_.animProp = null;
  			_.breakpoints = [];
  			_.breakpointSettings = [];
  			_.cssTransitions = false;
  			_.focussed = false;
  			_.interrupted = false;
  			_.hidden = 'hidden';
  			_.paused = true;
  			_.positionProp = null;
  			_.respondTo = null;
  			_.rowCount = 1;
  			_.shouldClick = true;
  			_.$slider = $(element);
  			_.$slidesCache = null;
  			_.transformType = null;
  			_.transitionType = null;
  			_.visibilityChange = 'visibilitychange';
  			_.windowWidth = 0;
  			_.windowTimer = null;

  			dataSettings = $(element).data('slick') || {};

  			_.options = $.extend({}, _.defaults, settings, dataSettings);

  			_.currentSlide = _.options.initialSlide;

  			_.originalSettings = _.options;

  			if (typeof document.mozHidden !== 'undefined') {
  				_.hidden = 'mozHidden';
  				_.visibilityChange = 'mozvisibilitychange';
  			} else if (typeof document.webkitHidden !== 'undefined') {
  				_.hidden = 'webkitHidden';
  				_.visibilityChange = 'webkitvisibilitychange';
  			}

  			_.autoPlay = $.proxy(_.autoPlay, _);
  			_.autoPlayClear = $.proxy(_.autoPlayClear, _);
  			_.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
  			_.changeSlide = $.proxy(_.changeSlide, _);
  			_.clickHandler = $.proxy(_.clickHandler, _);
  			_.selectHandler = $.proxy(_.selectHandler, _);
  			_.setPosition = $.proxy(_.setPosition, _);
  			_.swipeHandler = $.proxy(_.swipeHandler, _);
  			_.dragHandler = $.proxy(_.dragHandler, _);
  			_.keyHandler = $.proxy(_.keyHandler, _);

  			_.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

Slick.prototype.activateADA = function() {
	var _ = this;

	_.$slideTrack.find('.slick-active').attr({
		'aria-hidden': 'false'
	}).find('a, input, button, select').attr({
		'tabindex': '0'
	});

};

Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

	var _ = this;

	if (typeof(index) === 'boolean') {
		addBefore = index;
		index = null;
	} else if (index < 0 || (index >= _.slideCount)) {
		return false;
	}

	_.unload();

	if (typeof(index) === 'number') {
		if (index === 0 && _.$slides.length === 0) {
			$(markup).appendTo(_.$slideTrack);
		} else if (addBefore) {
			$(markup).insertBefore(_.$slides.eq(index));
		} else {
			$(markup).insertAfter(_.$slides.eq(index));
		}
	} else {
		if (addBefore === true) {
			$(markup).prependTo(_.$slideTrack);
		} else {
			$(markup).appendTo(_.$slideTrack);
		}
	}

	_.$slides = _.$slideTrack.children(this.options.slide);

	_.$slideTrack.children(this.options.slide).detach();

	_.$slideTrack.append(_.$slides);

	_.$slides.each(function(index, element) {
		$(element).attr('data-slick-index', index);
	});

	_.$slidesCache = _.$slides;

	_.reinit();

};

Slick.prototype.animateHeight = function() {
	var _ = this;
	if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
		var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
		_.$list.animate({
			height: targetHeight
		}, _.options.speed);
	}
};

Slick.prototype.animateSlide = function(targetLeft, callback) {

	var animProps = {},
	_ = this;

	_.animateHeight();

	if (_.options.rtl === true && _.options.vertical === false) {
		targetLeft = -targetLeft;
	}
	if (_.transformsEnabled === false) {
		if (_.options.vertical === false) {
			_.$slideTrack.animate({
				left: targetLeft
			}, _.options.speed, _.options.easing, callback);
		} else {
			_.$slideTrack.animate({
				top: targetLeft
			}, _.options.speed, _.options.easing, callback);
		}

	} else {

		if (_.cssTransitions === false) {
			if (_.options.rtl === true) {
				_.currentLeft = -(_.currentLeft);
			}
			$({
				animStart: _.currentLeft
			}).animate({
				animStart: targetLeft
			}, {
				duration: _.options.speed,
				easing: _.options.easing,
				step: function(now) {
					now = Math.ceil(now);
					if (_.options.vertical === false) {
						animProps[_.animType] = 'translate(' +
						now + 'px, 0px)';
						_.$slideTrack.css(animProps);
					} else {
						animProps[_.animType] = 'translate(0px,' +
						now + 'px)';
						_.$slideTrack.css(animProps);
					}
				},
				complete: function() {
					if (callback) {
						callback.call();
					}
				}
			});

		} else {

			_.applyTransition();
			targetLeft = Math.ceil(targetLeft);

			if (_.options.vertical === false) {
				animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
			} else {
				animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
			}
			_.$slideTrack.css(animProps);

			if (callback) {
				setTimeout(function() {

					_.disableTransition();

					callback.call();
				}, _.options.speed);
			}

		}

	}

};

Slick.prototype.getNavTarget = function() {

	var _ = this,
	asNavFor = _.options.asNavFor;

	if ( asNavFor && asNavFor !== null ) {
		asNavFor = $(asNavFor).not(_.$slider);
	}

	return asNavFor;

};

Slick.prototype.asNavFor = function(index) {

	var _ = this,
	asNavFor = _.getNavTarget();

	if ( asNavFor !== null && typeof asNavFor === 'object' ) {
		asNavFor.each(function() {
			var target = $(this).slick('getSlick');
			if(!target.unslicked) {
				target.slideHandler(index, true);
			}
		});
	}

};

Slick.prototype.applyTransition = function(slide) {

	var _ = this,
	transition = {};

	if (_.options.fade === false) {
		transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
	} else {
		transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
	}

	if (_.options.fade === false) {
		_.$slideTrack.css(transition);
	} else {
		_.$slides.eq(slide).css(transition);
	}

};

Slick.prototype.autoPlay = function() {

	var _ = this;

	_.autoPlayClear();

	if ( _.slideCount > _.options.slidesToShow ) {
		_.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
	}

};

Slick.prototype.autoPlayClear = function() {

	var _ = this;

	if (_.autoPlayTimer) {
		clearInterval(_.autoPlayTimer);
	}

};

Slick.prototype.autoPlayIterator = function() {

	var _ = this,
	slideTo = _.currentSlide + _.options.slidesToScroll;

	if ( !_.paused && !_.interrupted && !_.focussed ) {

		if ( _.options.infinite === false ) {

			if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
				_.direction = 0;
			}

			else if ( _.direction === 0 ) {

				slideTo = _.currentSlide - _.options.slidesToScroll;

				if ( _.currentSlide - 1 === 0 ) {
					_.direction = 1;
				}

			}

		}

		_.slideHandler( slideTo );

	}

};

Slick.prototype.buildArrows = function() {

	var _ = this;

	if (_.options.arrows === true ) {

		_.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
		_.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

		if( _.slideCount > _.options.slidesToShow ) {

			_.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
			_.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

			if (_.htmlExpr.test(_.options.prevArrow)) {
				_.$prevArrow.prependTo(_.options.appendArrows);
			}

			if (_.htmlExpr.test(_.options.nextArrow)) {
				_.$nextArrow.appendTo(_.options.appendArrows);
			}

			if (_.options.infinite !== true) {
				_.$prevArrow
				.addClass('slick-disabled')
				.attr('aria-disabled', 'true');
			}

		} else {

			_.$prevArrow.add( _.$nextArrow )

			.addClass('slick-hidden')
			.attr({
				'aria-disabled': 'true',
				'tabindex': '-1'
			});

		}

	}

};

Slick.prototype.buildDots = function() {

	var _ = this,
	i, dot;

	if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

		_.$slider.addClass('slick-dotted');

		dot = $('<ul />').addClass(_.options.dotsClass);

		for (i = 0; i <= _.getDotCount(); i += 1) {
			dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
		}

		_.$dots = dot.appendTo(_.options.appendDots);

		_.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');

	}

};

Slick.prototype.buildOut = function() {

	var _ = this;

	_.$slides =
	_.$slider
	.children( _.options.slide + ':not(.slick-cloned)')
	.addClass('slick-slide');

	_.slideCount = _.$slides.length;

	_.$slides.each(function(index, element) {
		$(element)
		.attr('data-slick-index', index)
		.data('originalStyling', $(element).attr('style') || '');
	});

	_.$slider.addClass('slick-slider');

	_.$slideTrack = (_.slideCount === 0) ?
	$('<div class="slick-track"/>').appendTo(_.$slider) :
	_.$slides.wrapAll('<div class="slick-track"/>').parent();

	_.$list = _.$slideTrack.wrap(
		'<div aria-live="polite" class="slick-list"/>').parent();
	_.$slideTrack.css('opacity', 0);

	if (_.options.centerMode === true || _.options.swipeToSlide === true) {
		_.options.slidesToScroll = 1;
	}

	$('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

	_.setupInfinite();

	_.buildArrows();

	_.buildDots();

	_.updateDots();


	_.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

	if (_.options.draggable === true) {
		_.$list.addClass('draggable');
	}

};

Slick.prototype.buildRows = function() {

	var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

	newSlides = document.createDocumentFragment();
	originalSlides = _.$slider.children();

	if(_.options.rows > 1) {

		slidesPerSection = _.options.slidesPerRow * _.options.rows;
		numOfSlides = Math.ceil(
			originalSlides.length / slidesPerSection
			);

		for(a = 0; a < numOfSlides; a++){
			var slide = document.createElement('div');
			for(b = 0; b < _.options.rows; b++) {
				var row = document.createElement('div');
				for(c = 0; c < _.options.slidesPerRow; c++) {
					var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
					if (originalSlides.get(target)) {
						row.appendChild(originalSlides.get(target));
					}
				}
				slide.appendChild(row);
			}
			newSlides.appendChild(slide);
		}

		_.$slider.empty().append(newSlides);
		_.$slider.children().children().children()
		.css({
			'width':(100 / _.options.slidesPerRow) + '%',
			'display': 'inline-block'
		});

	}

};

Slick.prototype.checkResponsive = function(initial, forceUpdate) {

	var _ = this,
	breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
	var sliderWidth = _.$slider.width();
	var windowWidth = window.innerWidth || $(window).width();

	if (_.respondTo === 'window') {
		respondToWidth = windowWidth;
	} else if (_.respondTo === 'slider') {
		respondToWidth = sliderWidth;
	} else if (_.respondTo === 'min') {
		respondToWidth = Math.min(windowWidth, sliderWidth);
	}

	if ( _.options.responsive &&
		_.options.responsive.length &&
		_.options.responsive !== null) {

		targetBreakpoint = null;

		for (breakpoint in _.breakpoints) {
			if (_.breakpoints.hasOwnProperty(breakpoint)) {
				if (_.originalSettings.mobileFirst === false) {
					if (respondToWidth < _.breakpoints[breakpoint]) {
						targetBreakpoint = _.breakpoints[breakpoint];
					}
				} else {
					if (respondToWidth > _.breakpoints[breakpoint]) {
						targetBreakpoint = _.breakpoints[breakpoint];
					}
				}
			}
		}

		if (targetBreakpoint !== null) {
			if (_.activeBreakpoint !== null) {
				if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
					_.activeBreakpoint =
					targetBreakpoint;
					if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
						_.unslick(targetBreakpoint);
					} else {
						_.options = $.extend({}, _.originalSettings,
							_.breakpointSettings[
							targetBreakpoint]);
						if (initial === true) {
							_.currentSlide = _.options.initialSlide;
						}
						_.refresh(initial);
					}
					triggerBreakpoint = targetBreakpoint;
				}
			} else {
				_.activeBreakpoint = targetBreakpoint;
				if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
					_.unslick(targetBreakpoint);
				} else {
					_.options = $.extend({}, _.originalSettings,
						_.breakpointSettings[
						targetBreakpoint]);
					if (initial === true) {
						_.currentSlide = _.options.initialSlide;
					}
					_.refresh(initial);
				}
				triggerBreakpoint = targetBreakpoint;
			}
		} else {
			if (_.activeBreakpoint !== null) {
				_.activeBreakpoint = null;
				_.options = _.originalSettings;
				if (initial === true) {
					_.currentSlide = _.options.initialSlide;
				}
				_.refresh(initial);
				triggerBreakpoint = targetBreakpoint;
			}
		}

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
            	_.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

    	var _ = this,
    	$target = $(event.currentTarget),
    	indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
        	event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
        	$target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

        	case 'previous':
        		slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
        		if (_.slideCount > _.options.slidesToShow) {
        			_.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
        		}
        		break;

        		case 'next':
        			slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
        			if (_.slideCount > _.options.slidesToShow) {
        				_.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
        			}
        			break;

        			case 'index':
        				var index = event.data.index === 0 ? 0 :
        				event.data.index || $target.index() * _.options.slidesToScroll;

        				_.slideHandler(_.checkNavigable(index), false, dontAnimate);
        				$target.children().trigger('focus');
        				break;

        				default:
        					return;
        				}

        			};

        			Slick.prototype.checkNavigable = function(index) {

        				var _ = this,
        				navigables, prevNavigable;

        				navigables = _.getNavigableIndexes();
        				prevNavigable = 0;
        				if (index > navigables[navigables.length - 1]) {
        					index = navigables[navigables.length - 1];
        				} else {
        					for (var n in navigables) {
        						if (index < navigables[n]) {
        							index = prevNavigable;
        							break;
        						}
        						prevNavigable = navigables[n];
        					}
        				}

        				return index;
        			};

        			Slick.prototype.cleanUpEvents = function() {

        				var _ = this;

        				if (_.options.dots && _.$dots !== null) {

        					$('li', _.$dots)
        					.off('click.slick', _.changeSlide)
        					.off('mouseenter.slick', $.proxy(_.interrupt, _, true))
        					.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

        				}

        				_.$slider.off('focus.slick blur.slick');

        				if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
        					_.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
        					_.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
        				}

        				_.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        				_.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        				_.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        				_.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        				_.$list.off('click.slick', _.clickHandler);

        				$(document).off(_.visibilityChange, _.visibility);

        				_.cleanUpSlideEvents();

        				if (_.options.accessibility === true) {
        					_.$list.off('keydown.slick', _.keyHandler);
        				}

        				if (_.options.focusOnSelect === true) {
        					$(_.$slideTrack).children().off('click.slick', _.selectHandler);
        				}

        				$(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        				$(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        				$('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        				$(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

        			};

        			Slick.prototype.cleanUpSlideEvents = function() {

        				var _ = this;

        				_.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        				_.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

        			};

        			Slick.prototype.cleanUpRows = function() {

        				var _ = this, originalSlides;

        				if(_.options.rows > 1) {
        					originalSlides = _.$slides.children().children();
        					originalSlides.removeAttr('style');
        					_.$slider.empty().append(originalSlides);
        				}

        			};

        			Slick.prototype.clickHandler = function(event) {

        				var _ = this;

        				if (_.shouldClick === false) {
        					event.stopImmediatePropagation();
        					event.stopPropagation();
        					event.preventDefault();
        				}

        			};

        			Slick.prototype.destroy = function(refresh) {

        				var _ = this;

        				_.autoPlayClear();

        				_.touchObject = {};

        				_.cleanUpEvents();

        				$('.slick-cloned', _.$slider).detach();

        				if (_.$dots) {
        					_.$dots.remove();
        				}

        				if ( _.$prevArrow && _.$prevArrow.length ) {

        					_.$prevArrow
        					.removeClass('slick-disabled slick-arrow slick-hidden')
        					.removeAttr('aria-hidden aria-disabled tabindex')
        					.css('display','');

        					if ( _.htmlExpr.test( _.options.prevArrow )) {
        						_.$prevArrow.remove();
        					}
        				}

        				if ( _.$nextArrow && _.$nextArrow.length ) {

        					_.$nextArrow
        					.removeClass('slick-disabled slick-arrow slick-hidden')
        					.removeAttr('aria-hidden aria-disabled tabindex')
        					.css('display','');

        					if ( _.htmlExpr.test( _.options.nextArrow )) {
        						_.$nextArrow.remove();
        					}
        				}


        				if (_.$slides) {

        					_.$slides
        					.removeClass('slick-slide slick-active slick-center slick-visible slick-current')
        					.removeAttr('aria-hidden')
        					.removeAttr('data-slick-index')
        					.each(function(){
        						$(this).attr('style', $(this).data('originalStyling'));
        					});

        					_.$slideTrack.children(this.options.slide).detach();

        					_.$slideTrack.detach();

        					_.$list.detach();

        					_.$slider.append(_.$slides);
        				}

        				_.cleanUpRows();

        				_.$slider.removeClass('slick-slider');
        				_.$slider.removeClass('slick-initialized');
        				_.$slider.removeClass('slick-dotted');

        				_.unslicked = true;

        				if(!refresh) {
        					_.$slider.trigger('destroy', [_]);
        				}

        			};

        			Slick.prototype.disableTransition = function(slide) {

        				var _ = this,
        				transition = {};

        				transition[_.transitionType] = '';

        				if (_.options.fade === false) {
        					_.$slideTrack.css(transition);
        				} else {
        					_.$slides.eq(slide).css(transition);
        				}

        			};

        			Slick.prototype.fadeSlide = function(slideIndex, callback) {

        				var _ = this;

        				if (_.cssTransitions === false) {

        					_.$slides.eq(slideIndex).css({
        						zIndex: _.options.zIndex
        					});

        					_.$slides.eq(slideIndex).animate({
        						opacity: 1
        					}, _.options.speed, _.options.easing, callback);

        				} else {

        					_.applyTransition(slideIndex);

        					_.$slides.eq(slideIndex).css({
        						opacity: 1,
        						zIndex: _.options.zIndex
        					});

        					if (callback) {
        						setTimeout(function() {

        							_.disableTransition(slideIndex);

        							callback.call();
        						}, _.options.speed);
        					}

        				}

        			};

        			Slick.prototype.fadeSlideOut = function(slideIndex) {

        				var _ = this;

        				if (_.cssTransitions === false) {

        					_.$slides.eq(slideIndex).animate({
        						opacity: 0,
        						zIndex: _.options.zIndex - 2
        					}, _.options.speed, _.options.easing);

        				} else {

        					_.applyTransition(slideIndex);

        					_.$slides.eq(slideIndex).css({
        						opacity: 0,
        						zIndex: _.options.zIndex - 2
        					});

        				}

        			};

        			Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        				var _ = this;

        				if (filter !== null) {

        					_.$slidesCache = _.$slides;

        					_.unload();

        					_.$slideTrack.children(this.options.slide).detach();

        					_.$slidesCache.filter(filter).appendTo(_.$slideTrack);

        					_.reinit();

        				}

        			};

        			Slick.prototype.focusHandler = function() {

        				var _ = this;

        				_.$slider
        				.off('focus.slick blur.slick')
        				.on('focus.slick blur.slick',
        					'*:not(.slick-arrow)', function(event) {

        						event.stopImmediatePropagation();
        						var $sf = $(this);

        						setTimeout(function() {

        							if( _.options.pauseOnFocus ) {
        								_.focussed = $sf.is(':focus');
        								_.autoPlay();
        							}

        						}, 0);

        					});
        			};

        			Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        				var _ = this;
        				return _.currentSlide;

        			};

        			Slick.prototype.getDotCount = function() {

        				var _ = this;

        				var breakPoint = 0;
        				var counter = 0;
        				var pagerQty = 0;

        				if (_.options.infinite === true) {
        					while (breakPoint < _.slideCount) {
        						++pagerQty;
        						breakPoint = counter + _.options.slidesToScroll;
        						counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        					}
        				} else if (_.options.centerMode === true) {
        					pagerQty = _.slideCount;
        				} else if(!_.options.asNavFor) {
        					pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        				}else {
        					while (breakPoint < _.slideCount) {
        						++pagerQty;
        						breakPoint = counter + _.options.slidesToScroll;
        						counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        					}
        				}

        				return pagerQty - 1;

        			};

        			Slick.prototype.getLeft = function(slideIndex) {

        				var _ = this,
        				targetLeft,
        				verticalHeight,
        				verticalOffset = 0,
        				targetSlide;

        				_.slideOffset = 0;
        				verticalHeight = _.$slides.first().outerHeight(true);

        				if (_.options.infinite === true) {
        					if (_.slideCount > _.options.slidesToShow) {
        						_.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
        						verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
        					}
        					if (_.slideCount % _.options.slidesToScroll !== 0) {
        						if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
        							if (slideIndex > _.slideCount) {
        								_.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
        								verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
        							} else {
        								_.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
        								verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
        							}
        						}
        					}
        				} else {
        					if (slideIndex + _.options.slidesToShow > _.slideCount) {
        						_.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
        						verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
        					}
        				}

        				if (_.slideCount <= _.options.slidesToShow) {
        					_.slideOffset = 0;
        					verticalOffset = 0;
        				}

        				if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
        					_.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        				} else if (_.options.centerMode === true && _.options.infinite === true) {
        					_.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        				} else if (_.options.centerMode === true) {
        					_.slideOffset = 0;
        					_.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        				}

        				if (_.options.vertical === false) {
        					targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        				} else {
        					targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        				}

        				if (_.options.variableWidth === true) {

        					if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
        						targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
        					} else {
        						targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
        					}

        					if (_.options.rtl === true) {
        						if (targetSlide[0]) {
        							targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
        						} else {
        							targetLeft =  0;
        						}
        					} else {
        						targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
        					}

        					if (_.options.centerMode === true) {
        						if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
        							targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
        						} else {
        							targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
        						}

        						if (_.options.rtl === true) {
        							if (targetSlide[0]) {
        								targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
        							} else {
        								targetLeft =  0;
        							}
        						} else {
        							targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
        						}

        						targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
        					}
        				}

        				return targetLeft;

        			};

        			Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        				var _ = this;

        				return _.options[option];

        			};

        			Slick.prototype.getNavigableIndexes = function() {

        				var _ = this,
        				breakPoint = 0,
        				counter = 0,
        				indexes = [],
        				max;

        				if (_.options.infinite === false) {
        					max = _.slideCount;
        				} else {
        					breakPoint = _.options.slidesToScroll * -1;
        					counter = _.options.slidesToScroll * -1;
        					max = _.slideCount * 2;
        				}

        				while (breakPoint < max) {
        					indexes.push(breakPoint);
        					breakPoint = counter + _.options.slidesToScroll;
        					counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        				}

        				return indexes;

        			};

        			Slick.prototype.getSlick = function() {

        				return this;

        			};

        			Slick.prototype.getSlideCount = function() {

        				var _ = this,
        				slidesTraversed, swipedSlide, centerOffset;

        				centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        				if (_.options.swipeToSlide === true) {
        					_.$slideTrack.find('.slick-slide').each(function(index, slide) {
        						if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
        							swipedSlide = slide;
        							return false;
        						}
        					});

        					slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

        					return slidesTraversed;

        				} else {
        					return _.options.slidesToScroll;
        				}

        			};

        			Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        				var _ = this;

        				_.changeSlide({
        					data: {
        						message: 'index',
        						index: parseInt(slide)
        					}
        				}, dontAnimate);

        			};

        			Slick.prototype.init = function(creation) {

        				var _ = this;

        				if (!$(_.$slider).hasClass('slick-initialized')) {

        					$(_.$slider).addClass('slick-initialized');

        					_.buildRows();
        					_.buildOut();
        					_.setProps();
        					_.startLoad();
        					_.loadSlider();
        					_.initializeEvents();
        					_.updateArrows();
        					_.updateDots();
        					_.checkResponsive(true);
        					_.focusHandler();

        				}

        				if (creation) {
        					_.$slider.trigger('init', [_]);
        				}

        				if (_.options.accessibility === true) {
        					_.initADA();
        				}

        				if ( _.options.autoplay ) {

        					_.paused = false;
        					_.autoPlay();

        				}

        			};

        			Slick.prototype.initADA = function() {
        				var _ = this;
        				_.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
        					'aria-hidden': 'true',
        					'tabindex': '-1'
        				}).find('a, input, button, select').attr({
        					'tabindex': '-1'
        				});

        				_.$slideTrack.attr('role', 'listbox');

        				_.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
        					$(this).attr('role', 'option');

            //Evenly distribute aria-describedby tags through available dots.
            var describedBySlideId = _.options.centerMode ? i : Math.floor(i / _.options.slidesToShow);

            if (_.options.dots === true) {
            	$(this).attr('aria-describedby', 'slick-slide' + _.instanceUid + describedBySlideId + '');
            }
        });

        				if (_.$dots !== null) {
        					_.$dots.attr('role', 'tablist').find('li').each(function(i) {
        						$(this).attr({
        							'role': 'presentation',
        							'aria-selected': 'false',
        							'aria-controls': 'navigation' + _.instanceUid + i + '',
        							'id': 'slick-slide' + _.instanceUid + i + ''
        						});
        					})
        					.first().attr('aria-selected', 'true').end()
        					.find('button').attr('role', 'button').end()
        					.closest('div').attr('role', 'toolbar');
        				}
        				_.activateADA();

        			};

        			Slick.prototype.initArrowEvents = function() {

        				var _ = this;

        				if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
        					_.$prevArrow
        					.off('click.slick')
        					.on('click.slick', {
        						message: 'previous'
        					}, _.changeSlide);
        					_.$nextArrow
        					.off('click.slick')
        					.on('click.slick', {
        						message: 'next'
        					}, _.changeSlide);
        				}

        			};

        			Slick.prototype.initDotEvents = function() {

        				var _ = this;

        				if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
        					$('li', _.$dots).on('click.slick', {
        						message: 'index'
        					}, _.changeSlide);
        				}

        				if ( _.options.dots === true && _.options.pauseOnDotsHover === true ) {

        					$('li', _.$dots)
        					.on('mouseenter.slick', $.proxy(_.interrupt, _, true))
        					.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        				}

        			};

        			Slick.prototype.initSlideEvents = function() {

        				var _ = this;

        				if ( _.options.pauseOnHover ) {

        					_.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
        					_.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        				}

        			};

        			Slick.prototype.initializeEvents = function() {

        				var _ = this;

        				_.initArrowEvents();

        				_.initDotEvents();
        				_.initSlideEvents();

        				_.$list.on('touchstart.slick mousedown.slick', {
        					action: 'start'
        				}, _.swipeHandler);
        				_.$list.on('touchmove.slick mousemove.slick', {
        					action: 'move'
        				}, _.swipeHandler);
        				_.$list.on('touchend.slick mouseup.slick', {
        					action: 'end'
        				}, _.swipeHandler);
        				_.$list.on('touchcancel.slick mouseleave.slick', {
        					action: 'end'
        				}, _.swipeHandler);

        				_.$list.on('click.slick', _.clickHandler);

        				$(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        				if (_.options.accessibility === true) {
        					_.$list.on('keydown.slick', _.keyHandler);
        				}

        				if (_.options.focusOnSelect === true) {
        					$(_.$slideTrack).children().on('click.slick', _.selectHandler);
        				}

        				$(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        				$(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        				$('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        				$(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        				$(_.setPosition);

        			};

        			Slick.prototype.initUI = function() {

        				var _ = this;

        				if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

        					_.$prevArrow.show();
        					_.$nextArrow.show();

        				}

        				if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

        					_.$dots.show();

        				}

        			};

        			Slick.prototype.keyHandler = function(event) {

        				var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
         if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
         	if (event.keyCode === 37 && _.options.accessibility === true) {
         		_.changeSlide({
         			data: {
         				message: _.options.rtl === true ? 'next' :  'previous'
         			}
         		});
         	} else if (event.keyCode === 39 && _.options.accessibility === true) {
         		_.changeSlide({
         			data: {
         				message: _.options.rtl === true ? 'previous' : 'next'
         			}
         		});
         	}
         }

     };

     Slick.prototype.lazyLoad = function() {

     	var _ = this,
     	loadRange, cloneRange, rangeStart, rangeEnd;

     	function loadImages(imagesScope) {

     		$('img[data-lazy]', imagesScope).each(function() {

     			var image = $(this),
     			imageSource = $(this).attr('data-lazy'),
     			imageSrcSet = $(this).attr('data-srcset'),
     			imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
     			imageToLoad = document.createElement('img');

     			imageToLoad.onload = function() {

     				image
     				.animate({ opacity: 0 }, 100, function() {

     					if (imageSrcSet) {
     						image
     						.attr('srcset', imageSrcSet );

     						if (imageSizes) {
     							image
     							.attr('sizes', imageSizes );
     						}
     					}

     					image
     					.attr('src', imageSource)
     					.animate({ opacity: 1 }, 200, function() {
     						image
     						.removeAttr('data-lazy data-srcset data-sizes')
     						.removeClass('slick-loading');
     					});
     					_.$slider.trigger('lazyLoaded', [_, image, imageSource]);
     				});

     			};

     			imageToLoad.onerror = function() {

     				image
     				.removeAttr( 'data-lazy' )
     				.removeClass( 'slick-loading' )
     				.addClass( 'slick-lazyload-error' );

     				_.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

     			};

     			imageToLoad.src = imageSource;

     		});

     	}

     	if (_.options.centerMode === true) {
     		if (_.options.infinite === true) {
     			rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
     			rangeEnd = rangeStart + _.options.slidesToShow + 2;
     		} else {
     			rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
     			rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
     		}
     	} else {
     		rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
     		rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
     		if (_.options.fade === true) {
     			if (rangeStart > 0) rangeStart--;
     				if (rangeEnd <= _.slideCount) rangeEnd++;
     				}
     			}

     			loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

     			if (_.options.lazyLoad === 'anticipated') {
     				var prevSlide = rangeStart - 1,
     				nextSlide = rangeEnd,
     				$slides = _.$slider.find('.slick-slide');

     				for (var i = 0; i < _.options.slidesToScroll; i++) {
     					if (prevSlide < 0) prevSlide = _.slideCount - 1;
     						loadRange = loadRange.add($slides.eq(prevSlide));
     						loadRange = loadRange.add($slides.eq(nextSlide));
     						prevSlide--;
     						nextSlide++;
     					}
     				}

     				loadImages(loadRange);

     				if (_.slideCount <= _.options.slidesToShow) {
     					cloneRange = _.$slider.find('.slick-slide');
     					loadImages(cloneRange);
     				} else
     					if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
     						cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
     						loadImages(cloneRange);
     					} else if (_.currentSlide === 0) {
     						cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
     						loadImages(cloneRange);
     					}

     				};

     				Slick.prototype.loadSlider = function() {

     					var _ = this;

     					_.setPosition();

     					_.$slideTrack.css({
     						opacity: 1
     					});

     					_.$slider.removeClass('slick-loading');

     					_.initUI();

     					if (_.options.lazyLoad === 'progressive') {
     						_.progressiveLazyLoad();
     					}

     				};

     				Slick.prototype.next = Slick.prototype.slickNext = function() {

     					var _ = this;

     					_.changeSlide({
     						data: {
     							message: 'next'
     						}
     					});

     				};

     				Slick.prototype.orientationChange = function() {

     					var _ = this;

     					_.checkResponsive();
     					_.setPosition();

     				};

     				Slick.prototype.pause = Slick.prototype.slickPause = function() {

     					var _ = this;

     					_.autoPlayClear();
     					_.paused = true;

     				};

     				Slick.prototype.play = Slick.prototype.slickPlay = function() {

     					var _ = this;

     					_.autoPlay();
     					_.options.autoplay = true;
     					_.paused = false;
     					_.focussed = false;
     					_.interrupted = false;

     				};

     				Slick.prototype.postSlide = function(index) {

     					var _ = this;

     					if( !_.unslicked ) {

     						_.$slider.trigger('afterChange', [_, index]);

     						_.animating = false;

     						_.setPosition();

     						_.swipeLeft = null;

     						if ( _.options.autoplay ) {
     							_.autoPlay();
     						}

     						if (_.options.accessibility === true) {
     							_.initADA();
     						}

     					}

     				};

     				Slick.prototype.prev = Slick.prototype.slickPrev = function() {

     					var _ = this;

     					_.changeSlide({
     						data: {
     							message: 'previous'
     						}
     					});

     				};

     				Slick.prototype.preventDefault = function(event) {

     					event.preventDefault();

     				};

     				Slick.prototype.progressiveLazyLoad = function( tryCount ) {

     					tryCount = tryCount || 1;

     					var _ = this,
     					$imgsToLoad = $( 'img[data-lazy]', _.$slider ),
     					image,
     					imageSource,
     					imageSrcSet,
     					imageSizes,
     					imageToLoad;

     					if ( $imgsToLoad.length ) {

     						image = $imgsToLoad.first();
     						imageSource = image.attr('data-lazy');
     						imageSrcSet = image.attr('data-srcset');
     						imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
     						imageToLoad = document.createElement('img');

     						imageToLoad.onload = function() {

     							if (imageSrcSet) {
     								image
     								.attr('srcset', imageSrcSet );

     								if (imageSizes) {
     									image
     									.attr('sizes', imageSizes );
     								}
     							}

     							image
     							.attr( 'src', imageSource )
     							.removeAttr('data-lazy data-srcset data-sizes')
     							.removeClass('slick-loading');

     							if ( _.options.adaptiveHeight === true ) {
     								_.setPosition();
     							}

     							_.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
     							_.progressiveLazyLoad();

     						};

     						imageToLoad.onerror = function() {

     							if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                     setTimeout( function() {
                     	_.progressiveLazyLoad( tryCount + 1 );
                     }, 500 );

                 } else {

                 	image
                 	.removeAttr( 'data-lazy' )
                 	.removeClass( 'slick-loading' )
                 	.addClass( 'slick-lazyload-error' );

                 	_.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                 	_.progressiveLazyLoad();

                 }

             };

             imageToLoad.src = imageSource;

         } else {

         	_.$slider.trigger('allImagesLoaded', [ _ ]);

         }

     };

     Slick.prototype.refresh = function( initializing ) {

     	var _ = this, currentSlide, lastVisibleIndex;

     	lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
        	_.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
        	_.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

        	_.changeSlide({
        		data: {
        			message: 'index',
        			index: currentSlide
        		}
        	}, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

    	var _ = this, breakpoint, currentBreakpoint, l,
    	responsiveSettings = _.options.responsive || null;

    	if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

    		_.respondTo = _.options.respondTo || 'window';

    		for ( breakpoint in responsiveSettings ) {

    			l = _.breakpoints.length-1;

    			if (responsiveSettings.hasOwnProperty(breakpoint)) {
    				currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                    	if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                    		_.breakpoints.splice(l,1);
                    	}
                    	l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
            	return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

    	var _ = this;

    	_.$slides =
    	_.$slideTrack
    	.children(_.options.slide)
    	.addClass('slick-slide');

    	_.slideCount = _.$slides.length;

    	if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
    		_.currentSlide = _.currentSlide - _.options.slidesToScroll;
    	}

    	if (_.slideCount <= _.options.slidesToShow) {
    		_.currentSlide = 0;
    	}

    	_.registerBreakpoints();

    	_.setProps();
    	_.setupInfinite();
    	_.buildArrows();
    	_.updateArrows();
    	_.initArrowEvents();
    	_.buildDots();
    	_.updateDots();
    	_.initDotEvents();
    	_.cleanUpSlideEvents();
    	_.initSlideEvents();

    	_.checkResponsive(false, true);

    	if (_.options.focusOnSelect === true) {
    		$(_.$slideTrack).children().on('click.slick', _.selectHandler);
    	}

    	_.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    	_.setPosition();
    	_.focusHandler();

    	_.paused = !_.options.autoplay;
    	_.autoPlay();

    	_.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

    	var _ = this;

    	if ($(window).width() !== _.windowWidth) {
    		clearTimeout(_.windowDelay);
    		_.windowDelay = window.setTimeout(function() {
    			_.windowWidth = $(window).width();
    			_.checkResponsive();
    			if( !_.unslicked ) { _.setPosition(); }
    			}, 50);
    	}
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

    	var _ = this;

    	if (typeof(index) === 'boolean') {
    		removeBefore = index;
    		index = removeBefore === true ? 0 : _.slideCount - 1;
    	} else {
    		index = removeBefore === true ? --index : index;
    	}

    	if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
    		return false;
    	}

    	_.unload();

    	if (removeAll === true) {
    		_.$slideTrack.children().remove();
    	} else {
    		_.$slideTrack.children(this.options.slide).eq(index).remove();
    	}

    	_.$slides = _.$slideTrack.children(this.options.slide);

    	_.$slideTrack.children(this.options.slide).detach();

    	_.$slideTrack.append(_.$slides);

    	_.$slidesCache = _.$slides;

    	_.reinit();

    };

    Slick.prototype.setCSS = function(position) {

    	var _ = this,
    	positionProps = {},
    	x, y;

    	if (_.options.rtl === true) {
    		position = -position;
    	}
    	x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
    	y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

    	positionProps[_.positionProp] = position;

    	if (_.transformsEnabled === false) {
    		_.$slideTrack.css(positionProps);
    	} else {
    		positionProps = {};
    		if (_.cssTransitions === false) {
    			positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
    			_.$slideTrack.css(positionProps);
    		} else {
    			positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
    			_.$slideTrack.css(positionProps);
    		}
    	}

    };

    Slick.prototype.setDimensions = function() {

    	var _ = this;

    	if (_.options.vertical === false) {
    		if (_.options.centerMode === true) {
    			_.$list.css({
    				padding: ('0px ' + _.options.centerPadding)
    			});
    		}
    	} else {
    		_.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
    		if (_.options.centerMode === true) {
    			_.$list.css({
    				padding: (_.options.centerPadding + ' 0px')
    			});
    		}
    	}

    	_.listWidth = _.$list.width();
    	_.listHeight = _.$list.height();


    	if (_.options.vertical === false && _.options.variableWidth === false) {
    		_.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
    		_.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

    	} else if (_.options.variableWidth === true) {
    		_.$slideTrack.width(5000 * _.slideCount);
    	} else {
    		_.slideWidth = Math.ceil(_.listWidth);
    		_.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
    	}

    	var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
    	if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    	};

    	Slick.prototype.setFade = function() {

    		var _ = this,
    		targetLeft;

    		_.$slides.each(function(index, element) {
    			targetLeft = (_.slideWidth * index) * -1;
    			if (_.options.rtl === true) {
    				$(element).css({
    					position: 'relative',
    					right: targetLeft,
    					top: 0,
    					zIndex: _.options.zIndex - 2,
    					opacity: 0
    				});
    			} else {
    				$(element).css({
    					position: 'relative',
    					left: targetLeft,
    					top: 0,
    					zIndex: _.options.zIndex - 2,
    					opacity: 0
    				});
    			}
    		});

    		_.$slides.eq(_.currentSlide).css({
    			zIndex: _.options.zIndex - 1,
    			opacity: 1
    		});

    	};

    	Slick.prototype.setHeight = function() {

    		var _ = this;

    		if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
    			var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
    			_.$list.css('height', targetHeight);
    		}

    	};

    	Slick.prototype.setOption =
    	Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

         var _ = this, l, item, option, value, refresh = false, type;

         if( $.type( arguments[0] ) === 'object' ) {

         	option =  arguments[0];
         	refresh = arguments[1];
         	type = 'multiple';

         } else if ( $.type( arguments[0] ) === 'string' ) {

         	option =  arguments[0];
         	value = arguments[1];
         	refresh = arguments[2];

         	if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

         		type = 'responsive';

         	} else if ( typeof arguments[1] !== 'undefined' ) {

         		type = 'single';

         	}

         }

         if ( type === 'single' ) {

         	_.options[option] = value;


         } else if ( type === 'multiple' ) {

         	$.each( option , function( opt, val ) {

         		_.options[opt] = val;

         	});


         } else if ( type === 'responsive' ) {

         	for ( item in value ) {

         		if( $.type( _.options.responsive ) !== 'array' ) {

         			_.options.responsive = [ value[item] ];

         		} else {

         			l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                    	if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                    		_.options.responsive.splice(l,1);

                    	}

                    	l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

        	_.unload();
        	_.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

    	var _ = this;

    	_.setDimensions();

    	_.setHeight();

    	if (_.options.fade === false) {
    		_.setCSS(_.getLeft(_.currentSlide));
    	} else {
    		_.setFade();
    	}

    	_.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

    	var _ = this,
    	bodyStyle = document.body.style;

    	_.positionProp = _.options.vertical === true ? 'top' : 'left';

    	if (_.positionProp === 'top') {
    		_.$slider.addClass('slick-vertical');
    	} else {
    		_.$slider.removeClass('slick-vertical');
    	}

    	if (bodyStyle.WebkitTransition !== undefined ||
    		bodyStyle.MozTransition !== undefined ||
    		bodyStyle.msTransition !== undefined) {
    		if (_.options.useCSS === true) {
    			_.cssTransitions = true;
    		}
    	}

    	if ( _.options.fade ) {
    		if ( typeof _.options.zIndex === 'number' ) {
    			if( _.options.zIndex < 3 ) {
    				_.options.zIndex = 3;
    			}
    		} else {
    			_.options.zIndex = _.defaults.zIndex;
    		}
    	}

    	if (bodyStyle.OTransform !== undefined) {
    		_.animType = 'OTransform';
    		_.transformType = '-o-transform';
    		_.transitionType = 'OTransition';
    		if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    		}
    		if (bodyStyle.MozTransform !== undefined) {
    			_.animType = 'MozTransform';
    			_.transformType = '-moz-transform';
    			_.transitionType = 'MozTransition';
    			if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
    			}
    			if (bodyStyle.webkitTransform !== undefined) {
    				_.animType = 'webkitTransform';
    				_.transformType = '-webkit-transform';
    				_.transitionType = 'webkitTransition';
    				if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    				}
    				if (bodyStyle.msTransform !== undefined) {
    					_.animType = 'msTransform';
    					_.transformType = '-ms-transform';
    					_.transitionType = 'msTransition';
    					if (bodyStyle.msTransform === undefined) _.animType = false;
    					}
    					if (bodyStyle.transform !== undefined && _.animType !== false) {
    						_.animType = 'transform';
    						_.transformType = 'transform';
    						_.transitionType = 'transition';
    					}
    					_.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    				};


    				Slick.prototype.setSlideClasses = function(index) {

    					var _ = this,
    					centerOffset, allSlides, indexOffset, remainder;

    					allSlides = _.$slider
    					.find('.slick-slide')
    					.removeClass('slick-active slick-center slick-current')
    					.attr('aria-hidden', 'true');

    					_.$slides
    					.eq(index)
    					.addClass('slick-current');

    					if (_.options.centerMode === true) {

    						centerOffset = Math.floor(_.options.slidesToShow / 2);

    						if (_.options.infinite === true) {

    							if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {

    								_.$slides
    								.slice(index - centerOffset, index + centerOffset + 1)
    								.addClass('slick-active')
    								.attr('aria-hidden', 'false');

    							} else {

    								indexOffset = _.options.slidesToShow + index;
    								allSlides
    								.slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2)
    								.addClass('slick-active')
    								.attr('aria-hidden', 'false');

    							}

    							if (index === 0) {

    								allSlides
    								.eq(allSlides.length - 1 - _.options.slidesToShow)
    								.addClass('slick-center');

    							} else if (index === _.slideCount - 1) {

    								allSlides
    								.eq(_.options.slidesToShow)
    								.addClass('slick-center');

    							}

    						}

    						_.$slides
    						.eq(index)
    						.addClass('slick-center');

    					} else {

    						if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

    							_.$slides
    							.slice(index, index + _.options.slidesToShow)
    							.addClass('slick-active')
    							.attr('aria-hidden', 'false');

    						} else if (allSlides.length <= _.options.slidesToShow) {

    							allSlides
    							.addClass('slick-active')
    							.attr('aria-hidden', 'false');

    						} else {

    							remainder = _.slideCount % _.options.slidesToShow;
    							indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

    							if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

    								allSlides
    								.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
    								.addClass('slick-active')
    								.attr('aria-hidden', 'false');

    							} else {

    								allSlides
    								.slice(indexOffset, indexOffset + _.options.slidesToShow)
    								.addClass('slick-active')
    								.attr('aria-hidden', 'false');

    							}

    						}

    					}

    					if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
    						_.lazyLoad();
    					}
    				};

    				Slick.prototype.setupInfinite = function() {

    					var _ = this,
    					i, slideIndex, infiniteCount;

    					if (_.options.fade === true) {
    						_.options.centerMode = false;
    					}

    					if (_.options.infinite === true && _.options.fade === false) {

    						slideIndex = null;

    						if (_.slideCount > _.options.slidesToShow) {

    							if (_.options.centerMode === true) {
    								infiniteCount = _.options.slidesToShow + 1;
    							} else {
    								infiniteCount = _.options.slidesToShow;
    							}

    							for (i = _.slideCount; i > (_.slideCount -
    								infiniteCount); i -= 1) {
    								slideIndex = i - 1;
    								$(_.$slides[slideIndex]).clone(true).attr('id', '')
    								.attr('data-slick-index', slideIndex - _.slideCount)
    								.prependTo(_.$slideTrack).addClass('slick-cloned');
    							}
    							for (i = 0; i < infiniteCount; i += 1) {
    								slideIndex = i;
    								$(_.$slides[slideIndex]).clone(true).attr('id', '')
    								.attr('data-slick-index', slideIndex + _.slideCount)
    								.appendTo(_.$slideTrack).addClass('slick-cloned');
    							}
    							_.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
    								$(this).attr('id', '');
    							});

    						}

    					}

    				};

    				Slick.prototype.interrupt = function( toggle ) {

    					var _ = this;

    					if( !toggle ) {
    						_.autoPlay();
    					}
    					_.interrupted = toggle;

    				};

    				Slick.prototype.selectHandler = function(event) {

    					var _ = this;

    					var targetElement =
    					$(event.target).is('.slick-slide') ?
    					$(event.target) :
    					$(event.target).parents('.slick-slide');

    					var index = parseInt(targetElement.attr('data-slick-index'));

    					if (!index) index = 0;

    						if (_.slideCount <= _.options.slidesToShow) {

    							_.setSlideClasses(index);
    							_.asNavFor(index);
    							return;

    						}

    						_.slideHandler(index);

    					};

    					Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

    						var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
    						_ = this, navTarget;

    						sync = sync || false;

    						if (_.animating === true && _.options.waitForAnimate === true) {
    							return;
    						}

    						if (_.options.fade === true && _.currentSlide === index) {
    							return;
    						}

    						if (_.slideCount <= _.options.slidesToShow) {
    							return;
    						}

    						if (sync === false) {
    							_.asNavFor(index);
    						}

    						targetSlide = index;
    						targetLeft = _.getLeft(targetSlide);
    						slideLeft = _.getLeft(_.currentSlide);

    						_.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

    						if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
    							if (_.options.fade === false) {
    								targetSlide = _.currentSlide;
    								if (dontAnimate !== true) {
    									_.animateSlide(slideLeft, function() {
    										_.postSlide(targetSlide);
    									});
    								} else {
    									_.postSlide(targetSlide);
    								}
    							}
    							return;
    						} else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
    							if (_.options.fade === false) {
    								targetSlide = _.currentSlide;
    								if (dontAnimate !== true) {
    									_.animateSlide(slideLeft, function() {
    										_.postSlide(targetSlide);
    									});
    								} else {
    									_.postSlide(targetSlide);
    								}
    							}
    							return;
    						}

    						if ( _.options.autoplay ) {
    							clearInterval(_.autoPlayTimer);
    						}

    						if (targetSlide < 0) {
    							if (_.slideCount % _.options.slidesToScroll !== 0) {
    								animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
    							} else {
    								animSlide = _.slideCount + targetSlide;
    							}
    						} else if (targetSlide >= _.slideCount) {
    							if (_.slideCount % _.options.slidesToScroll !== 0) {
    								animSlide = 0;
    							} else {
    								animSlide = targetSlide - _.slideCount;
    							}
    						} else {
    							animSlide = targetSlide;
    						}

    						_.animating = true;

    						_.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

    						oldSlide = _.currentSlide;
    						_.currentSlide = animSlide;

    						_.setSlideClasses(_.currentSlide);

    						if ( _.options.asNavFor ) {

    							navTarget = _.getNavTarget();
    							navTarget = navTarget.slick('getSlick');

    							if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
    								navTarget.setSlideClasses(_.currentSlide);
    							}

    						}

    						_.updateDots();
    						_.updateArrows();

    						if (_.options.fade === true) {
    							if (dontAnimate !== true) {

    								_.fadeSlideOut(oldSlide);

    								_.fadeSlide(animSlide, function() {
    									_.postSlide(animSlide);
    								});

    							} else {
    								_.postSlide(animSlide);
    							}
    							_.animateHeight();
    							return;
    						}

    						if (dontAnimate !== true) {
    							_.animateSlide(targetLeft, function() {
    								_.postSlide(animSlide);
    							});
    						} else {
    							_.postSlide(animSlide);
    						}

    					};

    					Slick.prototype.startLoad = function() {

    						var _ = this;

    						if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

    							_.$prevArrow.hide();
    							_.$nextArrow.hide();

    						}

    						if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

    							_.$dots.hide();

    						}

    						_.$slider.addClass('slick-loading');

    					};

    					Slick.prototype.swipeDirection = function() {

    						var xDist, yDist, r, swipeAngle, _ = this;

    						xDist = _.touchObject.startX - _.touchObject.curX;
    						yDist = _.touchObject.startY - _.touchObject.curY;
    						r = Math.atan2(yDist, xDist);

    						swipeAngle = Math.round(r * 180 / Math.PI);
    						if (swipeAngle < 0) {
    							swipeAngle = 360 - Math.abs(swipeAngle);
    						}

    						if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
    							return (_.options.rtl === false ? 'left' : 'right');
    						}
    						if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
    							return (_.options.rtl === false ? 'left' : 'right');
    						}
    						if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
    							return (_.options.rtl === false ? 'right' : 'left');
    						}
    						if (_.options.verticalSwiping === true) {
    							if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
    								return 'down';
    							} else {
    								return 'up';
    							}
    						}

    						return 'vertical';

    					};

    					Slick.prototype.swipeEnd = function(event) {

    						var _ = this,
    						slideCount,
    						direction;

    						_.dragging = false;
    						_.swiping = false;

    						if (_.scrolling) {
    							_.scrolling = false;
    							return false;
    						}

    						_.interrupted = false;
    						_.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

    						if ( _.touchObject.curX === undefined ) {
    							return false;
    						}

    						if ( _.touchObject.edgeHit === true ) {
    							_.$slider.trigger('edge', [_, _.swipeDirection() ]);
    						}

    						if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

    							direction = _.swipeDirection();

    							switch ( direction ) {

    								case 'left':
    									case 'down':

    										slideCount =
    										_.options.swipeToSlide ?
    										_.checkNavigable( _.currentSlide + _.getSlideCount() ) :
    										_.currentSlide + _.getSlideCount();

    										_.currentDirection = 0;

    										break;

    										case 'right':
    											case 'up':

    												slideCount =
    												_.options.swipeToSlide ?
    												_.checkNavigable( _.currentSlide - _.getSlideCount() ) :
    												_.currentSlide - _.getSlideCount();

    												_.currentDirection = 1;

    												break;

    												default:


    												}

    												if( direction != 'vertical' ) {

    													_.slideHandler( slideCount );
    													_.touchObject = {};
    													_.$slider.trigger('swipe', [_, direction ]);

    												}

    											} else {

    												if ( _.touchObject.startX !== _.touchObject.curX ) {

    													_.slideHandler( _.currentSlide );
    													_.touchObject = {};

    												}

    											}

    										};

    										Slick.prototype.swipeHandler = function(event) {

    											var _ = this;

    											if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
    												return;
    											} else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
    												return;
    											}

    											_.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
    											event.originalEvent.touches.length : 1;

    											_.touchObject.minSwipe = _.listWidth / _.options
    											.touchThreshold;

    											if (_.options.verticalSwiping === true) {
    												_.touchObject.minSwipe = _.listHeight / _.options
    												.touchThreshold;
    											}

    											switch (event.data.action) {

    												case 'start':
    													_.swipeStart(event);
    													break;

    													case 'move':
    														_.swipeMove(event);
    														break;

    														case 'end':
    															_.swipeEnd(event);
    															break;

    														}

    													};

    													Slick.prototype.swipeMove = function(event) {

    														var _ = this,
    														edgeWasHit = false,
    														curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

    														touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

    														if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
    															return false;
    														}

    														curLeft = _.getLeft(_.currentSlide);

    														_.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
    														_.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

    														_.touchObject.swipeLength = Math.round(Math.sqrt(
    															Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

    														verticalSwipeLength = Math.round(Math.sqrt(
    															Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

    														if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
    															_.scrolling = true;
    															return false;
    														}

    														if (_.options.verticalSwiping === true) {
    															_.touchObject.swipeLength = verticalSwipeLength;
    														}

    														swipeDirection = _.swipeDirection();

    														if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
    															_.swiping = true;
    															event.preventDefault();
    														}

    														positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
    														if (_.options.verticalSwiping === true) {
    															positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
    														}


    														swipeLength = _.touchObject.swipeLength;

    														_.touchObject.edgeHit = false;

    														if (_.options.infinite === false) {
    															if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
    																swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
    																_.touchObject.edgeHit = true;
    															}
    														}

    														if (_.options.vertical === false) {
    															_.swipeLeft = curLeft + swipeLength * positionOffset;
    														} else {
    															_.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
    														}
    														if (_.options.verticalSwiping === true) {
    															_.swipeLeft = curLeft + swipeLength * positionOffset;
    														}

    														if (_.options.fade === true || _.options.touchMove === false) {
    															return false;
    														}

    														if (_.animating === true) {
    															_.swipeLeft = null;
    															return false;
    														}

    														_.setCSS(_.swipeLeft);

    													};

    													Slick.prototype.swipeStart = function(event) {

    														var _ = this,
    														touches;

    														_.interrupted = true;

    														if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
    															_.touchObject = {};
    															return false;
    														}

    														if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
    															touches = event.originalEvent.touches[0];
    														}

    														_.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
    														_.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

    														_.dragging = true;

    													};

    													Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

    														var _ = this;

    														if (_.$slidesCache !== null) {

    															_.unload();

    															_.$slideTrack.children(this.options.slide).detach();

    															_.$slidesCache.appendTo(_.$slideTrack);

    															_.reinit();

    														}

    													};

    													Slick.prototype.unload = function() {

    														var _ = this;

    														$('.slick-cloned', _.$slider).remove();

    														if (_.$dots) {
    															_.$dots.remove();
    														}

    														if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
    															_.$prevArrow.remove();
    														}

    														if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
    															_.$nextArrow.remove();
    														}

    														_.$slides
    														.removeClass('slick-slide slick-active slick-visible slick-current')
    														.attr('aria-hidden', 'true')
    														.css('width', '');

    													};

    													Slick.prototype.unslick = function(fromBreakpoint) {

    														var _ = this;
    														_.$slider.trigger('unslick', [_, fromBreakpoint]);
    														_.destroy();

    													};

    													Slick.prototype.updateArrows = function() {

    														var _ = this,
    														centerOffset;

    														centerOffset = Math.floor(_.options.slidesToShow / 2);

    														if ( _.options.arrows === true &&
    															_.slideCount > _.options.slidesToShow &&
    															!_.options.infinite ) {

    															_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
    															_.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

    															if (_.currentSlide === 0) {

    																_.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
    																_.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

    															} else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

    																_.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
    																_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

    															} else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

    																_.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
    																_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

    															}

    														}

    													};

    													Slick.prototype.updateDots = function() {

    														var _ = this;

    														if (_.$dots !== null) {

    															_.$dots
    															.find('li')
    															.removeClass('slick-active')
    															.attr('aria-hidden', 'true');

    															_.$dots
    															.find('li')
    															.eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
    															.addClass('slick-active')
    															.attr('aria-hidden', 'false');

    														}

    													};

    													Slick.prototype.visibility = function() {

    														var _ = this;

    														if ( _.options.autoplay ) {

    															if ( document[_.hidden] ) {

    																_.interrupted = true;

    															} else {

    																_.interrupted = false;

    															}

    														}

    													};

    													$.fn.slick = function() {
    														var _ = this,
    														opt = arguments[0],
    														args = Array.prototype.slice.call(arguments, 1),
    														l = _.length,
    														i,
    														ret;
    														for (i = 0; i < l; i++) {
    															if (typeof opt == 'object' || typeof opt == 'undefined')
    																_[i].slick = new Slick(_[i], opt);
    																else
    																	ret = _[i].slick[opt].apply(_[i].slick, args);
    																	if (typeof ret != 'undefined') return ret;
    																	}
    																	return _;
    																};

    															}));


/*!
* FitVids 1.0.3
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/
;(function(a){a.fn.fitVids=function(b){var c={customSelector:null};if(!document.getElementById("fit-vids-style")){var f=document.createElement("div"),d=document.getElementsByTagName("base")[0]||document.getElementsByTagName("script")[0],e="&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>";f.className="fit-vids-style";f.id="fit-vids-style";f.style.display="none";f.innerHTML=e;d.parentNode.insertBefore(f,d)}if(b){a.extend(c,b)}return this.each(function(){var g=["iframe[src*='player.vimeo.com']","iframe[src*='youtube.com']","iframe[src*='youtube-nocookie.com']","iframe[src*='kickstarter.com'][src*='video.html']","object","embed"];if(c.customSelector){g.push(c.customSelector)}var h=a(this).find(g.join(","));h=h.not("object object");h.each(function(){var m=a(this);if(this.tagName.toLowerCase()==="embed"&&m.parent("object").length||m.parent(".fluid-width-video-wrapper").length){return}var i=(this.tagName.toLowerCase()==="object"||(m.attr("height")&&!isNaN(parseInt(m.attr("height"),10))))?parseInt(m.attr("height"),10):m.height(),j=!isNaN(parseInt(m.attr("width"),10))?parseInt(m.attr("width"),10):m.width(),k=i/j;if(!m.attr("id")){var l="fitvid"+Math.floor(Math.random()*999999);m.attr("id",l)}m.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",(k*100)+"%");m.removeAttr("height").removeAttr("width")})})}})(window.jQuery||window.Zepto);



/*! Picturefill - v3.0.1 - 2015-09-30
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
 !function(a){var b=navigator.userAgent;a.HTMLPictureElement&&/ecko/.test(b)&&b.match(/rv\:(\d+)/)&&RegExp.$1<41&&addEventListener("resize",function(){var b,c=document.createElement("source"),d=function(a){var b,d,e=a.parentNode;"PICTURE"===e.nodeName.toUpperCase()?(b=c.cloneNode(),e.insertBefore(b,e.firstElementChild),setTimeout(function(){e.removeChild(b)})):(!a._pfLastSize||a.offsetWidth>a._pfLastSize)&&(a._pfLastSize=a.offsetWidth,d=a.sizes,a.sizes+=",100vw",setTimeout(function(){a.sizes=d}))},e=function(){var a,b=document.querySelectorAll("picture > img, img[srcset][sizes]");for(a=0;a<b.length;a++)d(b[a])},f=function(){clearTimeout(b),b=setTimeout(e,99)},g=a.matchMedia&&matchMedia("(orientation: landscape)"),h=function(){f(),g&&g.addListener&&g.addListener(f)};return c.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?h():document.addEventListener("DOMContentLoaded",h),f}())}(window),function(a,b,c){"use strict";function d(a){return" "===a||"	"===a||"\n"===a||"\f"===a||"\r"===a}function e(b,c){var d=new a.Image;return d.onerror=function(){z[b]=!1,aa()},d.onload=function(){z[b]=1===d.width,aa()},d.src=c,"pending"}function f(){L=!1,O=a.devicePixelRatio,M={},N={},s.DPR=O||1,P.width=Math.max(a.innerWidth||0,y.clientWidth),P.height=Math.max(a.innerHeight||0,y.clientHeight),P.vw=P.width/100,P.vh=P.height/100,r=[P.height,P.width,O].join("-"),P.em=s.getEmValue(),P.rem=P.em}function g(a,b,c,d){var e,f,g,h;return"saveData"===A.algorithm?a>2.7?h=c+1:(f=b-c,e=Math.pow(a-.6,1.5),g=f*e,d&&(g+=.1*e),h=a+g):h=c>1?Math.sqrt(a*b):a,h>c}function h(a){var b,c=s.getSet(a),d=!1;"pending"!==c&&(d=r,c&&(b=s.setRes(c),s.applySetCandidate(b,a))),a[s.ns].evaled=d}function i(a,b){return a.res-b.res}function j(a,b,c){var d;return!c&&b&&(c=a[s.ns].sets,c=c&&c[c.length-1]),d=k(b,c),d&&(b=s.makeUrl(b),a[s.ns].curSrc=b,a[s.ns].curCan=d,d.res||_(d,d.set.sizes)),d}function k(a,b){var c,d,e;if(a&&b)for(e=s.parseSet(b),a=s.makeUrl(a),c=0;c<e.length;c++)if(a===s.makeUrl(e[c].url)){d=e[c];break}return d}function l(a,b){var c,d,e,f,g=a.getElementsByTagName("source");for(c=0,d=g.length;d>c;c++)e=g[c],e[s.ns]=!0,f=e.getAttribute("srcset"),f&&b.push({srcset:f,media:e.getAttribute("media"),type:e.getAttribute("type"),sizes:e.getAttribute("sizes")})}function m(a,b){function c(b){var c,d=b.exec(a.substring(m));return d?(c=d[0],m+=c.length,c):void 0}function e(){var a,c,d,e,f,i,j,k,l,m=!1,o={};for(e=0;e<h.length;e++)f=h[e],i=f[f.length-1],j=f.substring(0,f.length-1),k=parseInt(j,10),l=parseFloat(j),W.test(j)&&"w"===i?((a||c)&&(m=!0),0===k?m=!0:a=k):X.test(j)&&"x"===i?((a||c||d)&&(m=!0),0>l?m=!0:c=l):W.test(j)&&"h"===i?((d||c)&&(m=!0),0===k?m=!0:d=k):m=!0;m||(o.url=g,a&&(o.w=a),c&&(o.d=c),d&&(o.h=d),d||c||a||(o.d=1),1===o.d&&(b.has1x=!0),o.set=b,n.push(o))}function f(){for(c(S),i="",j="in descriptor";;){if(k=a.charAt(m),"in descriptor"===j)if(d(k))i&&(h.push(i),i="",j="after descriptor");else{if(","===k)return m+=1,i&&h.push(i),void e();if("("===k)i+=k,j="in parens";else{if(""===k)return i&&h.push(i),void e();i+=k}}else if("in parens"===j)if(")"===k)i+=k,j="in descriptor";else{if(""===k)return h.push(i),void e();i+=k}else if("after descriptor"===j)if(d(k));else{if(""===k)return void e();j="in descriptor",m-=1}m+=1}}for(var g,h,i,j,k,l=a.length,m=0,n=[];;){if(c(T),m>=l)return n;g=c(U),h=[],","===g.slice(-1)?(g=g.replace(V,""),e()):f()}}function n(a){function b(a){function b(){f&&(g.push(f),f="")}function c(){g[0]&&(h.push(g),g=[])}for(var e,f="",g=[],h=[],i=0,j=0,k=!1;;){if(e=a.charAt(j),""===e)return b(),c(),h;if(k){if("*"===e&&"/"===a[j+1]){k=!1,j+=2,b();continue}j+=1}else{if(d(e)){if(a.charAt(j-1)&&d(a.charAt(j-1))||!f){j+=1;continue}if(0===i){b(),j+=1;continue}e=" "}else if("("===e)i+=1;else if(")"===e)i-=1;else{if(","===e){b(),c(),j+=1;continue}if("/"===e&&"*"===a.charAt(j+1)){k=!0,j+=2;continue}}f+=e,j+=1}}}function c(a){return k.test(a)&&parseFloat(a)>=0?!0:l.test(a)?!0:"0"===a||"-0"===a||"+0"===a?!0:!1}var e,f,g,h,i,j,k=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,l=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(f=b(a),g=f.length,e=0;g>e;e++)if(h=f[e],i=h[h.length-1],c(i)){if(j=i,h.pop(),0===h.length)return j;if(h=h.join(" "),s.matchesMedia(h))return j}return"100vw"}b.createElement("picture");var o,p,q,r,s={},t=function(){},u=b.createElement("img"),v=u.getAttribute,w=u.setAttribute,x=u.removeAttribute,y=b.documentElement,z={},A={algorithm:""},B="data-pfsrc",C=B+"set",D=navigator.userAgent,E=/rident/.test(D)||/ecko/.test(D)&&D.match(/rv\:(\d+)/)&&RegExp.$1>35,F="currentSrc",G=/\s+\+?\d+(e\d+)?w/,H=/(\([^)]+\))?\s*(.+)/,I=a.picturefillCFG,J="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",K="font-size:100%!important;",L=!0,M={},N={},O=a.devicePixelRatio,P={px:1,"in":96},Q=b.createElement("a"),R=!1,S=/^[ \t\n\r\u000c]+/,T=/^[, \t\n\r\u000c]+/,U=/^[^ \t\n\r\u000c]+/,V=/[,]+$/,W=/^\d+$/,X=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,Y=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)},Z=function(a){var b={};return function(c){return c in b||(b[c]=a(c)),b[c]}},$=function(){var a=/^([\d\.]+)(em|vw|px)$/,b=function(){for(var a=arguments,b=0,c=a[0];++b in a;)c=c.replace(a[b],a[++b]);return c},c=Z(function(a){return"return "+b((a||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(b,d){var e;if(!(b in M))if(M[b]=!1,d&&(e=b.match(a)))M[b]=e[1]*P[e[2]];else try{M[b]=new Function("e",c(b))(P)}catch(f){}return M[b]}}(),_=function(a,b){return a.w?(a.cWidth=s.calcListLength(b||"100vw"),a.res=a.w/a.cWidth):a.res=a.d,a},aa=function(a){var c,d,e,f=a||{};if(f.elements&&1===f.elements.nodeType&&("IMG"===f.elements.nodeName.toUpperCase()?f.elements=[f.elements]:(f.context=f.elements,f.elements=null)),c=f.elements||s.qsa(f.context||b,f.reevaluate||f.reselect?s.sel:s.selShort),e=c.length){for(s.setupRun(f),R=!0,d=0;e>d;d++)s.fillImg(c[d],f);s.teardownRun(f)}};o=a.console&&console.warn?function(a){console.warn(a)}:t,F in u||(F="src"),z["image/jpeg"]=!0,z["image/gif"]=!0,z["image/png"]=!0,z["image/svg+xml"]=b.implementation.hasFeature("http://wwwindow.w3.org/TR/SVG11/feature#Image","1.1"),s.ns=("pf"+(new Date).getTime()).substr(0,9),s.supSrcset="srcset"in u,s.supSizes="sizes"in u,s.supPicture=!!a.HTMLPictureElement,s.supSrcset&&s.supPicture&&!s.supSizes&&!function(a){u.srcset="data:,a",a.src="data:,a",s.supSrcset=u.complete===a.complete,s.supPicture=s.supSrcset&&s.supPicture}(b.createElement("img")),s.selShort="picture>img,img[srcset]",s.sel=s.selShort,s.cfg=A,s.supSrcset&&(s.sel+=",img["+C+"]"),s.DPR=O||1,s.u=P,s.types=z,q=s.supSrcset&&!s.supSizes,s.setSize=t,s.makeUrl=Z(function(a){return Q.href=a,Q.href}),s.qsa=function(a,b){return a.querySelectorAll(b)},s.matchesMedia=function(){return a.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?s.matchesMedia=function(a){return!a||matchMedia(a).matches}:s.matchesMedia=s.mMQ,s.matchesMedia.apply(this,arguments)},s.mMQ=function(a){return a?$(a):!0},s.calcLength=function(a){var b=$(a,!0)||!1;return 0>b&&(b=!1),b},s.supportsType=function(a){return a?z[a]:!0},s.parseSize=Z(function(a){var b=(a||"").match(H);return{media:b&&b[1],length:b&&b[2]}}),s.parseSet=function(a){return a.cands||(a.cands=m(a.srcset,a)),a.cands},s.getEmValue=function(){var a;if(!p&&(a=b.body)){var c=b.createElement("div"),d=y.style.cssText,e=a.style.cssText;c.style.cssText=J,y.style.cssText=K,a.style.cssText=K,a.appendChild(c),p=c.offsetWidth,a.removeChild(c),p=parseFloat(p,10),y.style.cssText=d,a.style.cssText=e}return p||16},s.calcListLength=function(a){if(!(a in N)||A.uT){var b=s.calcLength(n(a));N[a]=b?b:P.width}return N[a]},s.setRes=function(a){var b;if(a){b=s.parseSet(a);for(var c=0,d=b.length;d>c;c++)_(b[c],a.sizes)}return b},s.setRes.res=_,s.applySetCandidate=function(a,b){if(a.length){var c,d,e,f,h,k,l,m,n,o=b[s.ns],p=s.DPR;if(k=o.curSrc||b[F],l=o.curCan||j(b,k,a[0].set),l&&l.set===a[0].set&&(n=E&&!b.complete&&l.res-.1>p,n||(l.cached=!0,l.res>=p&&(h=l))),!h)for(a.sort(i),f=a.length,h=a[f-1],d=0;f>d;d++)if(c=a[d],c.res>=p){e=d-1,h=a[e]&&(n||k!==s.makeUrl(c.url))&&g(a[e].res,c.res,p,a[e].cached)?a[e]:c;break}h&&(m=s.makeUrl(h.url),o.curSrc=m,o.curCan=h,m!==k&&s.setSrc(b,h),s.setSize(b))}},s.setSrc=function(a,b){var c;a.src=b.url,"image/svg+xml"===b.set.type&&(c=a.style.width,a.style.width=a.offsetWidth+1+"px",a.offsetWidth+1&&(a.style.width=c))},s.getSet=function(a){var b,c,d,e=!1,f=a[s.ns].sets;for(b=0;b<f.length&&!e;b++)if(c=f[b],c.srcset&&s.matchesMedia(c.media)&&(d=s.supportsType(c.type))){"pending"===d&&(c=d),e=c;break}return e},s.parseSets=function(a,b,d){var e,f,g,h,i=b&&"PICTURE"===b.nodeName.toUpperCase(),j=a[s.ns];(j.src===c||d.src)&&(j.src=v.call(a,"src"),j.src?w.call(a,B,j.src):x.call(a,B)),(j.srcset===c||d.srcset||!s.supSrcset||a.srcset)&&(e=v.call(a,"srcset"),j.srcset=e,h=!0),j.sets=[],i&&(j.pic=!0,l(b,j.sets)),j.srcset?(f={srcset:j.srcset,sizes:v.call(a,"sizes")},j.sets.push(f),g=(q||j.src)&&G.test(j.srcset||""),g||!j.src||k(j.src,f)||f.has1x||(f.srcset+=", "+j.src,f.cands.push({url:j.src,d:1,set:f}))):j.src&&j.sets.push({srcset:j.src,sizes:null}),j.curCan=null,j.curSrc=c,j.supported=!(i||f&&!s.supSrcset||g),h&&s.supSrcset&&!j.supported&&(e?(w.call(a,C,e),a.srcset=""):x.call(a,C)),j.supported&&!j.srcset&&(!j.src&&a.src||a.src!==s.makeUrl(j.src))&&(null===j.src?a.removeAttribute("src"):a.src=j.src),j.parsed=!0},s.fillImg=function(a,b){var c,d=b.reselect||b.reevaluate;a[s.ns]||(a[s.ns]={}),c=a[s.ns],(d||c.evaled!==r)&&((!c.parsed||b.reevaluate)&&s.parseSets(a,a.parentNode,b),c.supported?c.evaled=r:h(a))},s.setupRun=function(){(!R||L||O!==a.devicePixelRatio)&&f()},s.supPicture?(aa=t,s.fillImg=t):!function(){var c,d=a.attachEvent?/d$|^c/:/d$|^c|^i/,e=function(){var a=b.readyState||"";f=setTimeout(e,"loading"===a?200:999),b.body&&(s.fillImgs(),c=c||d.test(a),c&&clearTimeout(f))},f=setTimeout(e,b.body?9:99),g=function(a,b){var c,d,e=function(){var f=new Date-d;b>f?c=setTimeout(e,b-f):(c=null,a())};return function(){d=new Date,c||(c=setTimeout(e,b))}},h=y.clientHeight,i=function(){L=Math.max(a.innerWidth||0,y.clientWidth)!==P.width||y.clientHeight!==h,h=y.clientHeight,L&&s.fillImgs()};Y(a,"resize",g(i,99)),Y(b,"readystatechange",e)}(),s.picturefill=aa,s.fillImgs=aa,s.teardownRun=t,aa._=s,a.picturefillCFG={pf:s,push:function(a){var b=a.shift();"function"==typeof s[b]?s[b].apply(s,a):(A[b]=a[0],R&&s.fillImgs({reselect:!0}))}};for(;I&&I.length;)a.picturefillCFG.push(I.shift());a.picturefill=aa,"object"==typeof module&&"object"==typeof module.exports?module.exports=aa:"function"==typeof define&&define.amd&&define("picturefill",function(){return aa}),s.supPicture||(z["image/webp"]=e("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document);
