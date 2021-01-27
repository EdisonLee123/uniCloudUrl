'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	var cent = JSON.parse(event.body)
	let res;
	if(cent.CDb=="get_data"){
		const collection = db.collection(cent.CDb)
		var id = parseInt(cent.id)
		delete cent.CDb
		res = await collection.where({
			id: id
		}).update({
			sortable:cent.sortable,
			page_background_color:cent.page_background_color,
			page_name:cent.page_name
		})
	}
	if(cent.CDb=="get_theme"){
		const collection = db.collection(cent.CDb)
		// var id = parseInt(cent.id)
		delete cent.CDb
		res = await collection.where({
			id: 1
		}).update({
			page_theme:cent.color
		})
	}
	return {
		msg: "修改成功",
		data:res
	}
};
