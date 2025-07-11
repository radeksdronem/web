/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Fix: Flexbox min-height bug on IE.
		if (browser.name == 'ie') {

			var flexboxFixTimeoutId;

			$window.on('resize.flexbox-fix', function() {

				clearTimeout(flexboxFixTimeoutId);

				flexboxFixTimeoutId = setTimeout(function() {

					if ($wrapper.prop('scrollHeight') > $window.height())
						$wrapper.css('height', 'auto');
					else
						$wrapper.css('height', '100vh');

				}, 250);

			}).triggerHandler('resize.flexbox-fix');

		}

	// Nav.
		var $nav = $header.children('nav'),
			$nav_li = $nav.find('li');

		// Add "middle" alignment classes if we're dealing with an even number of items.
		// 	if ($nav_li.length % 2 == 0) {
		//
		// 		$nav.addClass('use-middle');
		// 		$nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');
		//
		// 	}

	// Main.
		var	delay = 325,
			locked = false;

		// Methods.
			$main._show = function(id, initial) {

				var $article = $main_articles.filter('#' + id);

				// No such article? Bail.
					if ($article.length == 0)
						return;

				// Handle lock.

					// Already locked? Speed through "show" steps w/o delays.
						if (locked || (typeof initial != 'undefined' && initial === true)) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Mark as visible.
								$body.addClass('is-article-visible');

							// Deactivate all articles (just in case one's already active).
								$main_articles.removeClass('active');

							// Hide header, footer.
								$header.hide();
								$footer.hide();

							// Show main, article.
								$main.show();
								$article.show();

							// Activate article.
								$article.addClass('active');

							// Unlock.
								locked = false;

							// Unmark as switching.
								setTimeout(function() {
									$body.removeClass('is-switching');
								}, (initial ? 1000 : 0));

							return;

						}

					// Lock.
						locked = true;

				// Article already visible? Just swap articles.
					if ($body.hasClass('is-article-visible')) {

						// Deactivate current article.
							var $currentArticle = $main_articles.filter('.active');

							$currentArticle.removeClass('active');

						// Show article.
							setTimeout(function() {

								// Hide current article.
									$currentArticle.hide();

								// Show article.
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

				// Otherwise, handle as normal.
					else {

						// Mark as visible.
							$body
								.addClass('is-article-visible');

						// Show article.
							setTimeout(function() {

								// Hide header, footer.
									$header.hide();
									$footer.hide();

								// Show main, article.
									$main.show();
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

			};

			$main._hide = function(addState) {

				var $article = $main_articles.filter('.active');

				// Article not visible? Bail.
					if (!$body.hasClass('is-article-visible'))
						return;

				// Add state?
					if (typeof addState != 'undefined'
					&&	addState === true)
						history.pushState(null, null, '#');

				// Handle lock.

					// Already locked? Speed through "hide" steps w/o delays.
						if (locked) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Deactivate article.
								$article.removeClass('active');

							// Hide article, main.
								$article.hide();
								$main.hide();

							// Show footer, header.
								$footer.show();
								$header.show();

							// Unmark as visible.
								$body.removeClass('is-article-visible');

							// Unlock.
								locked = false;

							// Unmark as switching.
								$body.removeClass('is-switching');

							// Window stuff.
								$window
									.scrollTop(0)
									.triggerHandler('resize.flexbox-fix');

							return;

						}

					// Lock.
						locked = true;

				// Deactivate article.
					$article.removeClass('active');

				// Hide article.
					setTimeout(function() {

						// Hide article, main.
							$article.hide();
							$main.hide();

						// Show footer, header.
							$footer.show();
							$header.show();

						// Unmark as visible.
							setTimeout(function() {

								$body.removeClass('is-article-visible');

								// Window stuff.
									$window
										.scrollTop(0)
										.triggerHandler('resize.flexbox-fix');

								// Unlock.
									setTimeout(function() {
										locked = false;
									}, delay);

							}, 25);

					}, delay);


			};

		// Articles.
			$main_articles.each(function() {

				var $this = $(this);

				// Close.
					$('<div class="close">Close</div>')
						.appendTo($this)
						.on('click', function() {
							location.hash = '';
						});

				// Prevent clicks from inside article from bubbling.
					$this.on('click', function(event) {
						event.stopPropagation();
					});

			});

		// Events.
			$body.on('click', function(event) {

				// Article visible? Hide.
					if ($body.hasClass('is-article-visible'))
						$main._hide(true);

			});

			$window.on('keyup', function(event) {

				switch (event.keyCode) {

					case 27:

						// Article visible? Hide.
							if ($body.hasClass('is-article-visible'))
								$main._hide(true);

						break;

					default:
						break;

				}

			});

			$window.on('hashchange', function(event) {

				// Empty hash?
					if (location.hash == ''
					||	location.hash == '#') {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Hide.
							$main._hide();

					}

				// Otherwise, check for a matching article.
					else if ($main_articles.filter(location.hash).length > 0) {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Show article.
							$main._show(location.hash.substr(1));

					}

			});

		// Scroll restoration.
		// This prevents the page from scrolling back to the top on a hashchange.
			if ('scrollRestoration' in history)
				history.scrollRestoration = 'manual';
			else {

				var	oldScrollPos = 0,
					scrollPos = 0,
					$htmlbody = $('html,body');

				$window
					.on('scroll', function() {

						oldScrollPos = scrollPos;
						scrollPos = $htmlbody.scrollTop();

					})
					.on('hashchange', function() {
						$window.scrollTop(oldScrollPos);
					});

			}

		// Initialize.

			// Hide main, articles.
				$main.hide();
				$main_articles.hide();

			// Initial article.
				if (location.hash != ''
				&&	location.hash != '#')
					$window.on('load', function() {
						$main._show(location.hash.substr(1), true);
					});

		// Contact form handling.
			$('#contact form').on('submit', function(e) {
				var $form = $(this);
				var $submitBtn = $form.find('input[type="submit"]');
				var originalBtnText = $submitBtn.val();
				var formAction = $form.attr('action');

				// Security checks
				// 1. Honeypot field check - if filled, it's likely a bot
				var honeypotValue = $form.find('input[name="honeypot"]').val();
				if (honeypotValue && honeypotValue.trim() !== '') {
					// Silent fail for bots - don't show error message
					console.log('Bot detected via honeypot');
					e.preventDefault();
					return false;
				}

				// 2. Rate limiting - prevent rapid submissions
				var lastSubmission = localStorage.getItem('lastFormSubmission');
				var currentTime = new Date().getTime();
				var minInterval = 30000; // 30 seconds minimum between submissions

				if (lastSubmission && (currentTime - parseInt(lastSubmission)) < minInterval) {
					$form.find('.form-status').remove();
					$form.prepend('<div class="form-status error" style="background: #f44336; color: white; padding: 10px; margin-bottom: 20px; border-radius: 4px;">Počkejte prosím alespoň 30 sekund před dalším odesláním.</div>');
					e.preventDefault();
					return false;
				}

				// 3. Basic validation enhancement
				var name = $form.find('input[name="name"]').val().trim();
				var email = $form.find('input[name="email"]').val().trim();
				var message = $form.find('textarea[name="message"]').val().trim();

				if (name.length < 2) {
					$form.find('.form-status').remove();
					$form.prepend('<div class="form-status error" style="background: #f44336; color: white; padding: 10px; margin-bottom: 20px; border-radius: 4px;">Jméno musí mít alespoň 2 znaky.</div>');
					e.preventDefault();
					return false;
				}

				if (message.length < 10) {
					$form.find('.form-status').remove();
					$form.prepend('<div class="form-status error" style="background: #f44336; color: white; padding: 10px; margin-bottom: 20px; border-radius: 4px;">Zpráva musí mít alespoň 10 znaků.</div>');
					e.preventDefault();
					return false;
				}

				// Store submission time for rate limiting
				localStorage.setItem('lastFormSubmission', currentTime.toString());

				// Check if this is a mailto: URL
				if (formAction && formAction.toLowerCase().startsWith('mailto:')) {
					// For mailto URLs, use native form submission
					// Show brief loading state
					$submitBtn.val('Otevírám email...').prop('disabled', true);

					// Restore button after a short delay
					setTimeout(function() {
						$submitBtn.val(originalBtnText).prop('disabled', false);
					}, 2000);

					// Allow native form submission for mailto
					return true;
				}

				// For non-mailto URLs (like Web3Forms, Formspree), use AJAX
				// Show loading state
				$submitBtn.val('Odesílám...').prop('disabled', true);

				// Remove any existing status messages
				$form.find('.form-status').remove();

				// Create FormData object
				var formData = new FormData(this);

				// Submit form via AJAX
				$.ajax({
					url: formAction,
					method: 'POST',
					data: formData,
					processData: false,
					contentType: false,
					// Remove dataType: 'json' to avoid CORS issues
					crossDomain: true,
					success: function(response) {
						// Try to parse response as JSON, but don't require it
						var result;
						try {
							result = typeof response === 'string' ? JSON.parse(response) : response;
						} catch (e) {
							// If parsing fails, assume success for Web3Forms
							result = { success: true };
						}

						// Check if this is a Web3Forms response
						if (result && typeof result.success !== 'undefined') {
							if (result.success) {
								// Web3Forms success
								$form.prepend('<div class="form-status success" style="background: #4CAF50; color: white; padding: 10px; margin-bottom: 20px; border-radius: 4px;">Zpráva byla úspěšně odeslána! Děkuji za kontakt.</div>');
								// Reset form
								$form[0].reset();
							} else {
								// Web3Forms error
								var errorMsg = result.message || 'Nastala chyba při odesílání zprávy.';
								$form.prepend('<div class="form-status error" style="background: #f44336; color: white; padding: 10px; margin-bottom: 20px; border-radius: 4px;">' + errorMsg + '</div>');
							}
						} else {
							// Formspree or other service success, or unparseable response (assume success)
							$form.prepend('<div class="form-status success" style="background: #4CAF50; color: white; padding: 10px; margin-bottom: 20px; border-radius: 4px;">Zpráva byla úspěšně odeslána! Děkuji za kontakt.</div>');
							// Reset form
							$form[0].reset();
						}
					},
					error: function(xhr, status, error) {
						var errorMessage = 'Nastala chyba při odesílání zprávy. Zkuste to prosím znovu.';

						// Handle specific error cases
						if (xhr.status === 0) {
							errorMessage = 'Problém s připojením k serveru. Zkontrolujte internetové připojení a zkuste to znovu.';
						} else if (xhr.status === 301) {
							errorMessage = 'Server přesměroval požadavek. Zkuste obnovit stránku a odeslat znovu.';
						} else if (xhr.status === 422) {
							errorMessage = 'Neplatný Access Key nebo chybná data formuláře. Zkontrolujte konfiguraci.';
						} else if (xhr.status === 429) {
							errorMessage = 'Příliš mnoho požadavků. Počkejte chvíli a zkuste to znovu.';
						} else {
							// Try to parse error response for better error messages
							if (xhr.responseJSON && xhr.responseJSON.message) {
								errorMessage = xhr.responseJSON.message;
							} else if (xhr.responseText) {
								try {
									var errorData = JSON.parse(xhr.responseText);
									if (errorData.message) {
										errorMessage = errorData.message;
									}
								} catch (e) {
									// Keep default error message with status code
									if (xhr.status > 0) {
										errorMessage = 'Chyba ' + xhr.status + ': ' + (xhr.statusText || 'Neznámá chyba');
									}
								}
							}
						}

						$form.prepend('<div class="form-status error" style="background: #f44336; color: white; padding: 10px; margin-bottom: 20px; border-radius: 4px;">' + errorMessage + '</div>');
					},
					complete: function() {
						// Restore button state
						$submitBtn.val(originalBtnText).prop('disabled', false);
					}
				});

				// Prevent default form submission for AJAX
				e.preventDefault();
				return false;
			});

})(jQuery);
