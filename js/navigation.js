/* global starterpackScreenReaderText */
/**
 * Theme functions file.
 *
 * Contains handlers for navigation and widget area.
 */

(function( $ ) {
    var masthead, menuToggle, siteNavContain, siteNavigation;

    function initMainNavigation( container ) {

        // Add dropdown toggle that displays child menu items.
       var dropdownToggle = $( '<span />', { 'class': 'dropdown-symbol', text: '▼' , 'aria-expanded': false })
            .append( $( '<span />', { 'class': 'screen-reader-text', text: starterpackScreenReaderText.expand }) );

        container.find( '.menu-item-has-children > a, .page_item_has_children > a' ).after( dropdownToggle );

        // Listen for clicks outside of menu
        $('body').on('click', function (e) {
            if (!$('li.menu-item-has-children').is(e.target) && $('li.menu-item-has-children').has(e.target).length === 0 && $('.toggled-on').has(e.target).length === 0) {
                $('li.menu-item-has-children, .dropdown-symbol + .sub-menu').removeClass('toggled-on');
            }
        });

        if ( $(window).width() < 1025 ) {
        
            container.find( '.menu-item-has-children > a, .menu-item-has-children > span' ).click( function( e ) {
                var _this = $(this).parent( '.menu-item-has-children' ),
                    screenReaderSpan = _this.find( '.screen-reader-text' );
                    dropdownSymbol = _this.find( '.dropdown-symbol' );
                    dropdownSymbol.text( dropdownSymbol.text() === '►' ? '▼' : '►' );

                e.preventDefault();

                //$('li.menu-item-has-children, .dropdown-symbol + .sub-menu').removeClass('toggled-on');
                
                _this.toggleClass( 'toggled-on' );
                _this.find( '.dropdown-symbol + .sub-menu' ).toggleClass( 'toggled-on' );

                _this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );

                screenReaderSpan.text( screenReaderSpan.text() === starterpackScreenReaderText.expand ? starterpackScreenReaderText.collapse : starterpackScreenReaderText.expand );
            });
        } else {
            
            container.find( '.menu-item-has-children' ).hover( function( e ) {
                var _this = $(this),
                    screenReaderSpan = _this.find( '.screen-reader-text' );
                    dropdownSymbol = _this.find( '.dropdown-symbol' );
                    dropdownSymbol.text( dropdownSymbol.text() === '►' ? '▼' : '►' );

                e.preventDefault();

                //$('li.menu-item-has-children, .dropdown-symbol + .sub-menu').removeClass('toggled-on');
                
                _this.toggleClass( 'toggled-on' );
                _this.find( '.dropdown-symbol + .sub-menu' ).toggleClass( 'toggled-on' );

                _this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );

                screenReaderSpan.text( screenReaderSpan.text() === starterpackScreenReaderText.expand ? starterpackScreenReaderText.collapse : starterpackScreenReaderText.expand );
            });
        }
    }

  // parallax snowing  
  var snowStorm = (function(window, document) {

    // --- common properties ---

    this.autoStart = true;          // Whether the snow should start automatically or not.
    this.flakesMax = 60;           // Limit total amount of snow made (falling + sticking)
    this.flakesMaxActive = 60;      // Limit amount of snow falling at once (less = lower CPU use)
    this.animationInterval = 40;    // Theoretical "miliseconds per frame" measurement. 20 = fast + smooth, but high CPU use. 50 = more conservative, but slower
    this.excludeMobile = true;      // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) By default, be nice.
    this.flakeBottom = null;        // Integer for Y axis snow limit, 0 or null for "full-screen" snow effect
    this.followMouse = true;        // Snow movement can respond to the user's mouse
    this.snowColor = '#fff';        // Don't eat (or use?) yellow snow.
    this.snowCharacter = '&bull;';  // &bull; = bullet, &middot; is square on some systems etc.
    this.snowStick = false;          // Whether or not snow should "stick" at the bottom. When off, will never collect.
    this.targetElement = null;      // element which snow will be appended to (null = document.body) - can be an element ID eg. 'myDiv', or a DOM node reference
    this.useMeltEffect = true;      // When recycling fallen snow (or rarely, when falling), have it "melt" and fade out if browser supports it
    this.useTwinkleEffect = false;  // Allow snow to randomly "flicker" in and out of view while falling
    this.usePositionFixed = false;  // true = snow does not shift vertically when scrolling. May increase CPU load, disabled by default - if enabled, used only where supported

    // --- less-used bits ---

    this.freezeOnBlur = true;       // Only snow when the window is in focus (foreground.) Saves CPU.
    this.flakeLeftOffset = 0;       // Left margin/gutter space on edge of container (eg. browser window.) Bump up these values if seeing horizontal scrollbars.
    this.flakeRightOffset = 0;      // Right margin/gutter space on edge of container
    this.flakeWidth = 5;            // Max pixel width reserved for snow element
    this.flakeHeight = 5;           // Max pixel height reserved for snow element
    this.vMaxX = 2.5;                 // Maximum X velocity range for snow
    this.vMaxY = 2.5;                 // Maximum Y velocity range for snow
    this.zIndex = 100000;                // CSS stacking order applied to each snowflake

    // --- End of user section ---

    var s = this, storm = this, i,
    // UA sniffing and backCompat rendering mode checks for fixed position, etc.
    isIE = navigator.userAgent.match(/msie/i),
    isIE6 = navigator.userAgent.match(/msie 6/i),
    isWin98 = navigator.appVersion.match(/windows 98/i),
    isMobile = navigator.userAgent.match(/mobile|opera m(ob|in)/i),
    isBackCompatIE = (isIE && document.compatMode === 'BackCompat'),
    noFixed = (isMobile || isBackCompatIE || isIE6),
    screenX = null, screenX2 = null, screenY = null, scrollY = null, vRndX = null, vRndY = null,
    windOffset = 1,
    windMultiplier = 2,
    flakeTypes = 6,
    fixedForEverything = false,
    opacitySupported = (function(){
      try {
        document.createElement('div').style.opacity = '0.5';
      } catch(e) {
        return false;
      }
      return true;
    }()),
    didInit = false,
    docFrag = document.createDocumentFragment();

    this.timers = [];
    this.flakes = [];
    this.disabled = false;
    this.active = false;
    this.meltFrameCount = 20;
    this.meltFrames = [];

    this.events = (function() {

      var old = (!window.addEventListener && window.attachEvent), slice = Array.prototype.slice,
      evt = {
        add: (old?'attachEvent':'addEventListener'),
        remove: (old?'detachEvent':'removeEventListener')
      };

      function getArgs(oArgs) {
        var args = slice.call(oArgs), len = args.length;
        if (old) {
          args[1] = 'on' + args[1]; // prefix
          if (len > 3) {
            args.pop(); // no capture
          }
        } else if (len === 3) {
          args.push(false);
        }
        return args;
      }

      function apply(args, sType) {
        var element = args.shift(),
            method = [evt[sType]];
        if (old) {
          element[method](args[0], args[1]);
        } else {
          element[method].apply(element, args);
        }
      }

      function addEvent() {
        apply(getArgs(arguments), 'add');
      }

      function removeEvent() {
        apply(getArgs(arguments), 'remove');
      }

      return {
        add: addEvent,
        remove: removeEvent
      };

    }());

    function rnd(n,min) {
      if (isNaN(min)) {
        min = 0;
      }
      return (Math.random()*n)+min;
    }

    function plusMinus(n) {
      return (parseInt(rnd(2),10)===1?n*-1:n);
    }

    this.randomizeWind = function() {
      var i;
      vRndX = plusMinus(rnd(s.vMaxX,0.2));
      vRndY = rnd(s.vMaxY,0.2);
      if (this.flakes) {
        for (i=0; i<this.flakes.length; i++) {
          if (this.flakes[i].active) {
            this.flakes[i].setVelocities();
          }
        }
      }
    };

    this.scrollHandler = function() {
      var i;
      // "attach" snowflakes to bottom of window if no absolute bottom value was given
      scrollY = (s.flakeBottom?0:parseInt(window.scrollY||document.documentElement.scrollTop||document.body.scrollTop,10));
      if (isNaN(scrollY)) {
        scrollY = 0; // Netscape 6 scroll fix
      }
      if (!fixedForEverything && !s.flakeBottom && s.flakes) {
        for (i=s.flakes.length; i--;) {
          if (s.flakes[i].active === 0) {
            s.flakes[i].stick();
          }
        }
      }
    };

    this.resizeHandler = function() {
      if (window.innerWidth || window.innerHeight) {
        screenX = window.innerWidth-16-s.flakeRightOffset;
        screenY = (s.flakeBottom?s.flakeBottom:window.innerHeight);
      } else {
        screenX = (document.documentElement.clientWidth||document.body.clientWidth||document.body.scrollWidth)-(!isIE?8:0)-s.flakeRightOffset;
        screenY = s.flakeBottom?s.flakeBottom:(document.documentElement.clientHeight||document.body.clientHeight||document.body.scrollHeight);
      }
      screenX2 = parseInt(screenX/2,10);
    };

    this.resizeHandlerAlt = function() {
      screenX = s.targetElement.offsetLeft+s.targetElement.offsetWidth-s.flakeRightOffset;
      screenY = s.flakeBottom?s.flakeBottom:s.targetElement.offsetTop+s.targetElement.offsetHeight;
      screenX2 = parseInt(screenX/2,10);
    };

    this.freeze = function() {
      // pause animation
      var i;
      if (!s.disabled) {
        s.disabled = 1;
      } else {
        return false;
      }
      for (i=s.timers.length; i--;) {
        clearInterval(s.timers[i]);
      }
    };

    this.resume = function() {
      if (s.disabled) {
        s.disabled = 0;
      } else {
        return false;
      }
      s.timerInit();
    };

    this.toggleSnow = function() {
      if (!s.flakes.length) {
        // first run
        s.start();
      } else {
        s.active = !s.active;
        if (s.active) {
          s.show();
          s.resume();
        } else {
          s.stop();
          s.freeze();
        }
      }
    };

    this.stop = function() {
      var i;
      this.freeze();
      for (i=this.flakes.length; i--;) {
        this.flakes[i].o.style.display = 'none';
      }
      s.events.remove(window,'scroll',s.scrollHandler);
      s.events.remove(window,'resize',s.resizeHandler);
      if (s.freezeOnBlur) {
        if (isIE) {
          s.events.remove(document,'focusout',s.freeze);
          s.events.remove(document,'focusin',s.resume);
        } else {
          s.events.remove(window,'blur',s.freeze);
          s.events.remove(window,'focus',s.resume);
        }
      }
    };

    this.show = function() {
      var i;
      for (i=this.flakes.length; i--;) {
        this.flakes[i].o.style.display = 'block';
      }
    };

    this.SnowFlake = function(parent,type,x,y) {
      var s = this, storm = parent;
      this.type = type;
      this.x = x||parseInt(rnd(screenX-20),10);
      this.y = (!isNaN(y)?y:-rnd(screenY)-12);
      this.vX = null;
      this.vY = null;
      this.vAmpTypes = [1,1.2,1.4,1.6,1.8]; // "amplification" for vX/vY (based on flake size/type)
      this.vAmp = this.vAmpTypes[this.type];
      this.melting = false;
      this.meltFrameCount = storm.meltFrameCount;
      this.meltFrames = storm.meltFrames;
      this.meltFrame = 0;
      this.twinkleFrame = 0;
      this.active = 1;
      this.fontSize = (10+(this.type/5)*10);
      this.o = document.createElement('div');
      this.o.innerHTML = storm.snowCharacter;
      this.o.style.color = storm.snowColor;
      this.o.style.position = (fixedForEverything?'fixed':'absolute');
      this.o.style.width = storm.flakeWidth+'px';
      this.o.style.height = storm.flakeHeight+'px';
      this.o.style.fontFamily = 'arial,verdana';
      this.o.style.cursor = 'default';
      this.o.style.overflow = 'hidden';
      this.o.style.fontWeight = 'normal';
      this.o.style.zIndex = storm.zIndex;
      docFrag.appendChild(this.o);

      this.refresh = function() {
        if (isNaN(s.x) || isNaN(s.y)) {
          // safety check
          return false;
        }
        s.o.style.left = s.x+'px';
        s.o.style.top = s.y+'px';
      };

      this.stick = function() {
        if (noFixed || (storm.targetElement !== document.documentElement && storm.targetElement !== document.body)) {
          s.o.style.top = (screenY+scrollY-storm.flakeHeight)+'px';
        } else if (storm.flakeBottom) {
          s.o.style.top = storm.flakeBottom+'px';
        } else {
          s.o.style.display = 'none';
          s.o.style.top = 'auto';
          s.o.style.bottom = '0px';
          s.o.style.position = 'fixed';
          s.o.style.display = 'block';
        }
      };

      this.vCheck = function() {
        if (s.vX>=0 && s.vX<0.2) {
          s.vX = 0.2;
        } else if (s.vX<0 && s.vX>-0.2) {
          s.vX = -0.2;
        }
        if (s.vY>=0 && s.vY<0.2) {
          s.vY = 0.2;
        }
      };

      this.move = function() {
        var vX = s.vX*windOffset, yDiff;
        s.x += vX;
        s.y += (s.vY*s.vAmp);
        if (s.x >= screenX || screenX-s.x < storm.flakeWidth) { // X-axis scroll check
          s.x = 0;
        } else if (vX < 0 && s.x-storm.flakeLeftOffset < -storm.flakeWidth) {
          s.x = screenX-storm.flakeWidth-1; // flakeWidth;
        }
        s.refresh();
        yDiff = screenY+scrollY-s.y;
        if (yDiff<storm.flakeHeight) {
          s.active = 0;
          if (storm.snowStick) {
            s.stick();
          } else {
            s.recycle();
          }
        } else {
          if (storm.useMeltEffect && s.active && s.type < 3 && !s.melting && Math.random()>0.998) {
            // ~1/1000 chance of melting mid-air, with each frame
            s.melting = true;
            s.melt();
            // only incrementally melt one frame
            // s.melting = false;
          }
          if (storm.useTwinkleEffect) {
            if (!s.twinkleFrame) {
              if (Math.random()>0.9) {
                s.twinkleFrame = parseInt(Math.random()*20,10);
              }
            } else {
              s.twinkleFrame--;
              s.o.style.visibility = (s.twinkleFrame && s.twinkleFrame%2===0?'hidden':'visible');
            }
          }
        }
      };

      this.animate = function() {
        // main animation loop
        // move, check status, die etc.
        s.move();
      };

      this.setVelocities = function() {
        s.vX = vRndX+rnd(storm.vMaxX*0.12,0.1);
        s.vY = vRndY+rnd(storm.vMaxY*0.12,0.1);
      };

      this.setOpacity = function(o,opacity) {
        if (!opacitySupported) {
          return false;
        }
        o.style.opacity = opacity;
      };

      this.melt = function() {
        if (!storm.useMeltEffect || !s.melting) {
          s.recycle();
        } else {
          if (s.meltFrame < s.meltFrameCount) {
            s.setOpacity(s.o,s.meltFrames[s.meltFrame]);
            s.o.style.fontSize = s.fontSize-(s.fontSize*(s.meltFrame/s.meltFrameCount))+'px';
            s.o.style.lineHeight = storm.flakeHeight+2+(storm.flakeHeight*0.75*(s.meltFrame/s.meltFrameCount))+'px';
            s.meltFrame++;
          } else {
            s.recycle();
          }
        }
      };

      this.recycle = function() {
        s.o.style.display = 'none';
        s.o.style.position = (fixedForEverything?'fixed':'absolute');
        s.o.style.bottom = 'auto';
        s.setVelocities();
        s.vCheck();
        s.meltFrame = 0;
        s.melting = false;
        s.setOpacity(s.o,1);
        s.o.style.padding = '0px';
        s.o.style.margin = '0px';
        s.o.style.fontSize = s.fontSize+'px';
        s.o.style.lineHeight = (storm.flakeHeight+2)+'px';
        s.o.style.textAlign = 'center';
        s.o.style.verticalAlign = 'baseline';
        s.x = parseInt(rnd(screenX-storm.flakeWidth-20),10);
        s.y = parseInt(rnd(screenY)*-1,10)-storm.flakeHeight;
        s.refresh();
        s.o.style.display = 'block';
        s.active = 1;
      };

      this.recycle(); // set up x/y coords etc.
      this.refresh();

    };

    this.snow = function() {
      var active = 0, used = 0, waiting = 0, flake = null, i;
      for (i=s.flakes.length; i--;) {
        if (s.flakes[i].active === 1) {
          s.flakes[i].move();
          active++;
        } else if (s.flakes[i].active === 0) {
          used++;
        } else {
          waiting++;
        }
        if (s.flakes[i].melting) {
          s.flakes[i].melt();
        }
      }
      if (active<s.flakesMaxActive) {
        flake = s.flakes[parseInt(rnd(s.flakes.length),10)];
        if (flake.active === 0) {
          flake.melting = true;
        }
      }
    };

    this.mouseMove = function(e) {
      if (!s.followMouse) {
        return true;
      }
      var x = parseInt(e.clientX,10);
      if (x<screenX2) {
        windOffset = -windMultiplier+(x/screenX2*windMultiplier);
      } else {
        x -= screenX2;
        windOffset = (x/screenX2)*windMultiplier;
      }
    };

    this.createSnow = function(limit,allowInactive) {
      var i;
      for (i=0; i<limit; i++) {
        s.flakes[s.flakes.length] = new s.SnowFlake(s,parseInt(rnd(flakeTypes),10));
        if (allowInactive || i>s.flakesMaxActive) {
          s.flakes[s.flakes.length-1].active = -1;
        }
      }
      storm.targetElement.appendChild(docFrag);
    };

    this.timerInit = function() {
      s.timers = (!isWin98?[setInterval(s.snow,s.animationInterval)]:[setInterval(s.snow,s.animationInterval*3),setInterval(s.snow,s.animationInterval)]);
    };

    this.init = function() {
      var i;
      for (i=0; i<s.meltFrameCount; i++) {
        s.meltFrames.push(1-(i/s.meltFrameCount));
      }
      s.randomizeWind();
      s.createSnow(s.flakesMax); // create initial batch
      s.events.add(window,'resize',s.resizeHandler);
      s.events.add(window,'scroll',s.scrollHandler);
      if (s.freezeOnBlur) {
        if (isIE) {
          s.events.add(document,'focusout',s.freeze);
          s.events.add(document,'focusin',s.resume);
        } else {
          s.events.add(window,'blur',s.freeze);
          s.events.add(window,'focus',s.resume);
        }
      }
      s.resizeHandler();
      s.scrollHandler();
      if (s.followMouse) {
        s.events.add(isIE?document:window,'mousemove',s.mouseMove);
      }
      s.animationInterval = Math.max(20,s.animationInterval);
      s.timerInit();
    };

    this.start = function(bFromOnLoad) {
      if (!didInit) {
        didInit = true;
      } else if (bFromOnLoad) {
        // already loaded and running
        return true;
      }
      if (typeof s.targetElement === 'string') {
        var targetID = s.targetElement;
        s.targetElement = document.getElementById(targetID);
        if (!s.targetElement) {
          throw new Error('Snowstorm: Unable to get targetElement "'+targetID+'"');
        }
      }
      if (!s.targetElement) {
        s.targetElement = (!isIE?(document.documentElement?document.documentElement:document.body):document.body);
      }
      if (s.targetElement !== document.documentElement && s.targetElement !== document.body) {
        s.resizeHandler = s.resizeHandlerAlt; // re-map handler to get element instead of screen dimensions
      }
      s.resizeHandler(); // get bounding box elements
      s.usePositionFixed = (s.usePositionFixed && !noFixed); // whether or not position:fixed is supported
      fixedForEverything = s.usePositionFixed;
      if (screenX && screenY && !s.disabled) {
        s.init();
        s.active = true;
      }
    };

    function doDelayedStart() {
      window.setTimeout(function() {
        s.start(true);
      }, 20);
      // event cleanup
      s.events.remove(isIE?document:window,'mousemove',doDelayedStart);
    }

    function doStart() {
      if (!s.excludeMobile || !isMobile) {
        if (s.freezeOnBlur) {
          s.events.add(isIE?document:window,'mousemove',doDelayedStart);
        } else {
          doDelayedStart();
        }
      }
      // event cleanup
      s.events.remove(window, 'load', doStart);
    }

    // hooks for starting the snow
    if (s.autoStart) {
      s.events.add(window, 'load', doStart, false);
    }

    return this;

  }(window, document));

    initMainNavigation( $( '.main-navigation' ) );

    masthead       = $( '.main-navigation' );
    menuToggle     = masthead.find( '.menu-toggle' );
    siteNavContain = masthead;
    siteNavigation = masthead.find( '.menu-header-menu-container > ul' );

    // Enable menuToggle.
    (function() {

        // Return early if menuToggle is missing.
        if ( ! menuToggle.length ) {
            return;
        }

        // Add an initial value for the attribute.
        menuToggle.attr( 'aria-expanded', 'false' );

        menuToggle.on( 'click.starterpack', function() {
            siteNavContain.toggleClass( 'toggled-on' );

            $( this ).attr( 'aria-expanded', siteNavContain.hasClass( 'toggled-on' ) );
        });
    })();

    //Toggle Search Functionality in Menu
    (function() {
        var searchToggle = $( '.show-search' );

        searchToggle.hide();

        $( '.fa-search' ).on( 'click', function() {

            if ( searchToggle.css('display') === 'none' ) {
                searchToggle.show( 'slow' );
            } else {
                searchToggle.hide( 'slow' );
            }
            
        });
    })();

    // Dynamically change navigation placeholder height
    (function() {
        var checkHeight = $( '.main-navigation' ).css( 'height' );

        $( '.main-navigation-wrapper' ).css( 'min-height', checkHeight );

        $( window ).resize( function() {
            if ( $( '.main-navigation' ).css( 'height' ) !== checkHeight   ) {
                var navHeight = $( '.main-navigation' ).outerHeight();
                $( '.main-navigation-wrapper' ).css( 'min-height', navHeight + 'px' );
            }
        });
    })();


    // Ajax delete product in cart
    (function() {
        $(document).on('click', '.mini_cart_item a.remove', function (e)
        {
            e.preventDefault();

            var product_id = $(this).attr("data-product_id"),
                cart_item_key = $(this).attr("data-cart_item_key"),
                product_container = $(this).parents('.dropdown-cart-wrap');

            // Add loader
            product_container.block({
                message: null,
                overlayCSS: {
                    cursor: 'none'
                }
            });

            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: wc_add_to_cart_params.ajax_url,
                data: {
                    action: "product_remove",
                    product_id: product_id,
                    cart_item_key: cart_item_key
                },
                success: function(response) {
                    if ( ! response || response.error )
                        return;

                    var fragments = response.fragments;

                    // Replace fragments
                    if ( fragments ) {
                        $.each( fragments, function( key, value ) {
                            $( key ).replaceWith( value );
                        });
                    }
                    setTimeout(function () { 
                        $('.cart-dropdown').removeClass('show-dropdown');
                    }, 2000);
                    setTimeout(function () { 
                        $('.secondary-cart').removeClass('show-arrow');
                    }, 2000);
                }
            });
        });

        $(document).on('click', '.dropdown-cart-wrap a.remove', function (e)
        {
            e.preventDefault();

            var product_id = $(this).attr("data-product_id"),
                cart_item_key = $(this).attr("data-cart_item_key"),
                product_container = $(this).parents('.dropdown-cart-wrap');

            // Add loader
            product_container.block({
                message: null,
                overlayCSS: {
                    cursor: 'none'
                }
            });

            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: wc_add_to_cart_params.ajax_url,
                data: {
                    action: "product_remove",
                    product_id: product_id,
                    cart_item_key: cart_item_key
                },
                success: function(response) {
                    if ( ! response || response.error )
                        return;

                    var fragments = response.fragments;

                    // Replace fragments
                    if ( fragments ) {
                        $.each( fragments, function( key, value ) {
                            $( key ).replaceWith( value );
                        });
                    }
                    $('.secondary-cart').removeClass('show-arrow');
                }
            });
        });
    })();


    // Fix sub-menus for touch devices and better focus for hidden submenu items for accessibility.
    (function() {
        if ( ! siteNavigation.length || ! siteNavigation.children().length ) {
            return;
        }

        // Toggle `focus` class to allow submenu access on tablets.
        function toggleFocusClassTouchScreen() {
            if ( 'none' === $( '.menu-toggle' ).css( 'display' ) ) {

                $( document.body ).on( 'touchstart.starterpack', function( e ) {
                    if ( ! $( e.target ).closest( '.main-navigation li' ).length ) {
                        $( '.main-navigation li' ).removeClass( 'focus' );
                    }
                });

                siteNavigation.find( '.menu-item-has-children > a, .page_item_has_children > a' )
                    .on( 'touchstart.starterpack', function( e ) {
                        var el = $( this ).parent( 'li' );

                        if ( ! el.hasClass( 'focus' ) ) {
                            e.preventDefault();
                            el.toggleClass( 'focus' );
                            el.siblings( '.focus' ).removeClass( 'focus' );
                        }
                    });

            } else {
                siteNavigation.find( '.menu-item-has-children > a, .page_item_has_children > a' ).unbind( 'touchstart.starterpack' );
            }
        }

        if ( 'ontouchstart' in window ) {
            $( window ).on( 'resize.starterpack', toggleFocusClassTouchScreen );
            toggleFocusClassTouchScreen();
        }

        siteNavigation.find( 'a' ).on( 'focus.starterpack blur.starterpack', function() {
            $( this ).parents( '.menu-item, .page_item' ).toggleClass( 'focus' );
        });
    })();
})( jQuery );
