$(document).ready(function() {
    var text;
    $("#submit-button").click(function() {
        text = $('#textbox').val();
        console.log('hello');
        $.post("http://localhost:3000", {
            text: text
        }, function(data) {
            if (data !== 'failure') {
                window.location.href = window.location.href + data;
            }
        });
    });
});

function goHome() {
    window.location.href = 'localhost:3000';
}

function randomPaste() {
    $.post("http://localhost:3000/randomPaste", {}, function(data) {
        if (data !== 'failure') {
            window.location.href = window.location.href + data;
        }
    });
}

function getIndex(n) {
    $.post("http://localhost:3000/index", {
        num: n
    }, function(data) {
        if (data !== 'failure') {
            $('#index').empty();
            data = data.split(',');
            for (var i = 0; i < data.length; i++) {
                $('#index').append('<p class="index-link"><a href="/pastes/' + data[i] + '" class="nona">' + data[i] + '</a></p>');
            }
        }
    })
}
getIndex(10);
