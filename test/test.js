var test = require('tape'),
	mongoscape = require('../');

// http://stackoverflow.com/questions/13279992/complex-mongodb-query-with-multiple-or
var sampleQuery = {
    resource_owner_id: '666',
    revoked_at: undefined,
    $and: [
        { $or: [{ scopes: /resources/i }, { scopes: new RegExp('[a-z]*','i') }] },
        { $or: [{ device_ids: { $size: 0 } }, { device_ids: '123' }] }
    ]
};

test(function (t) {
	t.plan(1);

	var esc = mongoscape.escape(sampleQuery);
	var unesc = mongoscape.unescape(esc);

//	console.log(JSON.stringify(sampleQuery, null, '  '));
//	console.log(JSON.stringify(esc, null, '  '));

	t.deepEqual(unesc, sampleQuery);

});
