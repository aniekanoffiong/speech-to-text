var file = '';

$('.form-input').change((e) => {
    file = e.target.files;
});

$('.form-button').click((e) => {
    e.preventDefault();
    $('.loading').css('display', 'block');
    $('.file-content').css('display', 'none');
    const formData = new FormData();
    formData.append('image', file[0]);
    $.ajax({
        method: 'post',
        url: '/api/convert',
        data: formData,
        processData: false,
        contentType: false,
        success: ((data) => {
            $('.loading').css('display', 'none');
            $('.file-content').html(data.replace(new RegExp('\r?\n', 'g'), '<br >'))
            .css('display', 'block');
        }),
        error: ((error) => {
            $('.loading').css('display', 'none');
            $('.file-content').html(error);
        })
    });
});