$(document).ready(function(){

    //Creating hamburger object
    $("#submitBtn").on("click", function(e){
        e.preventDefault()
        
        var burgerObj = {
            burger:$("#burger-form").val().trim(),
            img_link: $("#burger-pic").val()
            
        };

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
            e.preventDefault();
            var id = $(this).val();
            var customer = $("#customer_input"+id).val().trim()

            var burgerObj = {
                burgerID: id,
                devoured: 1,
                customer: customer
            }

           $.ajax({
                url: "/api/burgers/"+id,
                data: burgerObj,
                method: "PUT"

           }).then(function(res){
                console.log("assigned customer to burger")
                location.reload();

           })

    })

})




