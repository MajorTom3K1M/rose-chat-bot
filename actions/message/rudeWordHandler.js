module.exports = rudeWordHandler = event => {
  return msg = [
    {
      type: 'text',
      text: 'หนูดุนะ พี่ไหวหรอ'
    },
    {
      type: 'sticker',
      packageId: '11537',
      stickerId: '52002767'
    }
  ]
}