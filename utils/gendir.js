var dirToJson = require('dir-to-json', {options: {sortType: true}});

dirToJson( ".", function( err, dirTree ){
    if( err ){
        throw err;
    }else{
        //console.log( dirTree );
        console.log(JSON.stringify( dirTree, null, 2));
    }
});
