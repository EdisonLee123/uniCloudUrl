'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log(event, context)
	let cent = event.queryStringParameters
	var limit =parseInt(cent.limit)
	const collection = db.collection('unicloud-test')
	const res = await collection.limit(limit).get()
	return res
};
