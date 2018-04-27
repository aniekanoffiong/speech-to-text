var file = '';

$('.form-input').change((e) => {
    file = e.target.files;
});

$('.form-button').click((e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file[0]);
    $.ajax({
        method: 'post',
        url: '/api/convert',
        data: formData,
        processData: false,
        contentType: false,
        success: ((data) => {
            $('.file-content').html(data.replace(new RegExp('\r?\n', 'g'), '<br >'));
        }),
        error: ((error) => {
            $('.file-content').html(error);
        })
    });
});