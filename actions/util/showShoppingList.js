const DB = require('../../config/firebase.config')

module.exports = showShoppingList = async event => {
	let productsCollection = await DB.collection('Products').get()
	let contentList = []
	productsCollection.forEach(doc => {
		contentList.push({
			type: 'bubble',
			hero: {
				type: 'image',
				url: doc.data().picture,
				size: 'full',
				aspectMode: 'cover',
				aspectRatio: '20:13'
			},
			body: {
				type: 'box',
				layout: 'vertical',
				contents: [
					{
						type: 'text',
						text: doc.data().title,
						wrap: true,
						weight: 'bold',
						size: 'lg'
					},
					{
						type: 'text',
						text: '$' + doc.data().price,
						size: 'xl'
					},
					{
						type: 'text',
						text: 'เหลือ ' + doc.data().quantity + ' ชิ้น'
					},
					{
						type: 'text',
						text:
							parseInt(doc.data().quantity) > 0
								? ''
								: 'สินค้าชิ้นนี้หมดชั่วคราวนะคะ',
						color: '#ff5551',
						size: 'xs'
					}
				]
			},
			footer: {
				type: 'box',
				layout: 'vertical',
				spacing: 'md',
				contents: [
					{
						type: 'button',
						style: parseInt(doc.data().quantity) > 0 ? 'primary' : 'secondary',
						action: {
							type: 'postback',
							label:
								parseInt(doc.data().quantity) > 0 ? 'ใส่ตะกร้า' : 'สินค้าหมด',
							data:
								parseInt(doc.data().quantity) > 0
									? '?action=manageorder&items=' +
									  doc.id +
									  '&clientId=' +
									  event.source.userId
									: ''
						}
					}
				]
			}
		});
	});

	return contentList;
};
