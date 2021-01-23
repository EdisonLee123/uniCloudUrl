'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	var cent = JSON.parse(event.body)
	const collection = db.collection(cent.CDb)
	const res = await collection.doc(cent._id).update({
		name: cent.name,
		subType: cent.subType,
		createTime: cent.createTime
	})
	return {
		msg: "修改成功",
		data: res.data
	}
};
