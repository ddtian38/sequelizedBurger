$(document).ready(function(){

    $("#submitBtn").on("click", function(e){
        e.preventDefault()
        
        var burgerObj = {
            burger:$("#burger-form").val().trim(),
            img_link: $("#burger-pic").val()
            
        };

        console.log(burgerObj)

        $.ajax({
            url: "/api/burgers/",
            method: "POST",
            data: burgerObj,

        }).then(function(res){
            console.log("burger has been logged")
            location.reload()
        })
    })

    $(".uneaten button").on("click", function(e){

            var id = $(this).val()
            var burgerObj = {
                burgerID: id,
                devoured: 1
            }

           $.ajax({
                url: "/api/burgers/"+id,
                data: burgerObj,
                method: "PUT"

           }).then(function(res){
                console.log(res)
                location.reload()

           })

    })

})




