$(document).ready(function(){
    $('form').on('submit',()=>{
        const item = $('#inputVal').val();
        const task = {item:item};
        console.log('hi');

        $.ajax({
            type:'POST',
            url: '/todo',
            data:task,

            success: (data)=>{
                
                location.reload();
            },
        });
        return false;
    });


    $('ul').on('click', '.toItem', function () {
        const item = $(this).text().replace(/ /g,'-');
        $.ajax({
            type: 'DELETE',
            url: '/todo/'+item,

            success: (data)=>{
                location.reload();
            },
        });
    });

});