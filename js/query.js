$(document).ready(function() {
    $.ajax({
        url: "https://opendata.bristol.gov.uk/api/records/1.0/search/?dataset=wireless-hotspots"
    }).then(function(data) {
       $('.greeting-id').append(data.id);
       $('.greeting-content').append(data.content);
    });
});