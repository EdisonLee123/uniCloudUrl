'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	console.log(event, context)
	let cent = event.queryStringParameters
	// var limit =parseInt(cent.limit)
	const collection = db.collection(cent.CDb)
	let res;
	if (cent.id) {
		// res = collection.where(id==cent.id).get()
		let num= parseInt(cent.id)
		res = await collection.where({
			id: dbCmd.eq(num)
		}).get()
	} else {
		res = await collection.get()
	}

	return {
		msg: "获取数据成功",
		data:res.data
	}
};
