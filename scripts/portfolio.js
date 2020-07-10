/* eslint-disable no-undef */
$(document).ready(() => {
	const games = $('.game');
	const btns = $('.btn');

	let pages = [];
	const pageCount = 4;
	let currentCount = 0;

	for (let i = 4; i < $('.games > .row').children().length; i++) {
		$('.games > .row').children().eq(i).hide();
	}

	$('.btn-group > .btn').on('click', () => {
		for (let j = 0; j < btns.length; j++) {
			$(btns[j]).removeClass('selected');
		}
		const btnGenre = $(this).text().toLowerCase();

		const filteredGames = [];

		for (let i = 0; i < games.length; i++) {
			const classesList = $(games[i]).attr('class').split(' ');
			if (classesList.includes(btnGenre)) {
				filteredGames.push(games[i]);
				$(games[i]).show();
				$(this).addClass('selected');
			} else {
				$(games[i]).hide();
			}
		}

		$('.pagination').remove();
		if (filteredGames.length > 1) {

			pages = [
				[]
			];
			currentPage = 0;
			currentCount = 0;
			for (let i = 0; i < filteredGames.length; i++) {
				if (currentCount == pageCount) {
					pages.push([]);
					currentCount = 0;
					currentPage++;
				}

				currentCount++;
				pages[currentPage].push(filteredGames[i]);
			}

			let newHtml = '<nav aria-label="Page navigation example"><ul class="pagination justify-content-center">';
			for (let i = 0; i < pages.length; i++) {
				if (i == 0) {
					newHtml += '<li class="page-item"><button class="pageNumber selectedPageNumber">' + (i + 1) + '</button></li>';
				} else {
					newHtml += '<li class="page-item"><button class="pageNumber">' + (i + 1) + '</button></li>';
				}
			}
			newHtml += '</ul></nav>';
			$('.games').append(newHtml);

			loadPage(0);

			$('.pageNumber').on('click', () => {
				const newPageNumber = $(this).text() - 1;
				for (let i = 0; i < $('.page-item>button').length; i++) {
					$($('.page-item>button')[i]).removeClass('selectedPageNumber');
				}
				$(this).addClass('selectedPageNumber');
				loadPage(newPageNumber);
			});
		}
	});

	for (let i = 0; i < $('.btn').length; i++) {
		if ($($('.btn')[i]).text() == 'all') {
			$($('.btn')[i]).trigger('click');
		}
	}

	function loadPage(number) {
		for (let i = 0; i < games.length; i++) {
			$(games[i]).hide();
		}

		for (let i = 0; i < pages[number].length; i++) {
			$(pages[number][i]).show();
		}
	}
});