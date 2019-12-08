$(document).ready(function() {
    let games = $('.game');
    let btns = $('.btn');

    $('.btn').on('click', function() {
        for(let j = 0; j < btns.length; j++) {
            $(btns[j]).removeClass('selected');
        }
        let btnGenre = $(this).text().toLowerCase();

        for (let i = 0; i < games.length; i++) {
            let classesList = $(games[i]).attr('class').split(' ');
            if (classesList[classesList.length - 1] == btnGenre) {
                $(games[i]).show();
                $(this).addClass('selected');
            } else {
                $(games[i]).hide();
            }
        }
    });
})