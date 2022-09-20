import 'dotenv/config'
import app from './app'
import { AppDataSource } from './data-source'

AppDataSource.initialize()
    .then(() => {
        app.listen(parseInt(process.env.APP_PORT as string) || 3000, () => console.log(`listen on port ${process.env.APP_PORT}`))
    })
    .catch((error) => {
        console.log('data source init failed: ', error)
    })


