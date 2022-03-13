const schema = require("./options.json")

function loader(content, map, meta) {
  const logger = this.getLogger()
  const options = this.getOptions(schema)

  logger.info('[custom-loader] running...')
  logger.info('options:', options)
  logger.info('input content:', content)
  
  content = `
    .home {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        width: 360px;
        padding: 5px 0;
        text-align: center;
        color: #ffffff;
        background-color: #1e90ff;
      }
      .button {
        width: 60px;
      }
    }
  `
  
  this.callback(null, content, map, meta)
  
  logger.info('[custom-loader] done.')
  
  return
}

module.exports = loader