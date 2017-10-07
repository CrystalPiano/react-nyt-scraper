import axios from "axios";

const APIKEY = '9b3adf57854f4a19b7bs782cdd6e427a';

const helpers = {
    runQuery: function(term, start, end) {

        let formattedTerm = term.trim();
        let formattedStart = start.trim() + '0101';
        let formattedEnd  =start.trim() + '1231';

        return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
            params: {
                'api-key' : APIKEY,
                'q' : formmattedTerm,
                'begin-date' : formattedStart,
                'end_date' : formattedEnd

            }

        })
        .then(function(results) {
            console.log('axios', results.data.response);
            return results.data.response; 
        })
    },
    //getSaved:
    //postSaved:
    //deleteSaved:

    // can delete API file as they will be no longer needed.

};

export default helpers;