import { mockFetchHelper } from './mock_api.js';

// Function we'll use to sort values
function sortByKey(key) {
  return function (a, b) {
    if (a[key] > b[key]) {
      return -1;
    } else if (a[key] < b[key]) {
      return 1;
    }
    return 0;
  };
}

$(document).ready(function () {
  // On button click
  $('#album_button').click(function () {
    // Disable the button
    $('#album_button').prop('disabled', true);
    // Read the json file and parse the data
    $.getJSON('./albums.json', function (result) {
      var parsed_data = result;

      // Here's our fake API call - we're just gonna pass in the parsed data since the mock api just returns the input
      const data = mockFetchHelper(true, parsed_data);

      // data returns the Promise object from the mock API call
      data.then((data) => {
        data = data['albums'];

        data.sort(sortByKey('last_listened'));
        console.log(data);

        $.each(data, function (i, item) {
          // Make the header row
          var header = $('<tr>');
          // Start a table row
          var row = $('<tr>');
          $.each(item, function (key, value) {
            console.log(key + ': ' + value);

            // Handle null values
            if (value === null) {
              value = '--';
            } // handle other values
            else {
              // convert the date to a more readable format
              if (key === 'release_date') {
                value = new Date(value).toLocaleString('en-US', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                });
              }
              if (key === 'last_listened') {
                value = new Date(value).toLocaleString('en-US', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                });
              }
            }
            // We don't display user ratings
            if (key !== 'avg_user_rating') {
              // Add the table header
              if (i == 0) {
                header.append($('<td>').text(key));
                $('#albums').append(header);
              }
              // Add a table data element for each key/value pair
              row.append($('<td>').text(value));
            }
          });
          $('#albums').append(row);
          // Append the row to the table
          // $('#albums').append(row);
        });

        // Show the table
        $('#albums').show();
      });
    });
  });
});
