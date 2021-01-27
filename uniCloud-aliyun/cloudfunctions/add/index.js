'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let cent ={}
 cent = JSON.parse(event.body)
	// cent._id = event._id
	const collection = db.collection(cent.CDb)
	const listArr = db.collection(cent.CDb)
	const list = await listArr.get(event)
	cent.id=list.data[parseInt(list.affectedDocs)-1].id+1
	delete cent.CDb
	const res = await collection.add(cent)
	return {
		msg: "添加成功",
		res
	}
};
