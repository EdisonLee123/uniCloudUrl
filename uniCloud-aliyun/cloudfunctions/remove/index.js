
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	var cent = JSON.parse(event.body)
	const collection = db.collection(cent.CDb)
	delete cent.CDb
	const res = await collection.doc(cent._id).remove()
	// const docList = await collection.limit(1).get()
	return {
		msg: '成功删除一条数据'
	}
};
