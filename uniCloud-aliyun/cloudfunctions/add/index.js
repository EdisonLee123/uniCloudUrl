'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	var cent = JSON.parse(event.body)
	cent._id = event._id
	const collection = db.collection(cent.CDb)
	delete cent.CDb
	const res = await collection.add(cent)
	return {
		msg: "添加成功",
		data: res.data
	}
};
