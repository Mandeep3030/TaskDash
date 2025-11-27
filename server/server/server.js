import app from './express.js'
import config from './config/config.js'

app.listen(config.port, (err) => {
  if (err) {
    console.error(err)
  }
  console.log(`Task Dash backend listening on port ${config.port}`)
})