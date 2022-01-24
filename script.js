var globalData;

function bringData (){
    $.ajax({
        url:"produits.json",
        success: function (data){
            // console.log(data);
            globalData = data;
            fillTable()
        }
    })
}

// bringData();

// //add data to table 

// function fillTable(){
//     globalData.forEach(element => {
                
//     });
// }

// function bringData(){
//     $.get("produits.json", function(data){
//         console.log(data);
//         globalData = data;
//         fillTable()
//     });
// }

bringData();

// fill html table from json file 

function fillTable(){
    globalData.forEach(element => {
        var provider_info = element.fournisseur["RS"] +'<br>'+ element.fournisseur["Adresse"];
        // console.log(element);
        $('#Tb').append($('<tr>')
        .append($('<td>').append(element.id_produit))
        .append($('<td>').append(element.désignation))
        .append($('<td>').append(element.prix))
        .append($('<td>').append(element.Catégorie))
        .append($('<td>').append(element.disponibilité))
        .append($('<td>').append(provider_info))
    )});
}

$(document).ready(function(){
    $("#search").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#Tb tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

  

  $('th').each(function(col) {

    $(this).click(function() {
      if ($(this).is('.asc')) {
        $(this).removeClass('asc');
        $(this).addClass('desc selected');
        sortOrder = -1;
      }
      else {
        $(this).addClass('asc selected');
        $(this).removeClass('desc');
        sortOrder = 1;
      }
      $(this).siblings().removeClass('asc selected');
      $(this).siblings().removeClass('desc selected');

      $('tbody > tr').sort(function(a, b) {
        var val1 = $(a).children('td').eq(col).text().toUpperCase();
        var val2 = $(b).children('td').eq(col).text().toUpperCase();
        if($.isNumeric(val1) && $.isNumeric(val2))
        return sortOrder == 1 ? val1-val2 : val2-val1;
        else
           return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
      }).appendTo('.table tbody');

    });
  });

