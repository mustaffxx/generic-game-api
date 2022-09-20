import createHttpError from 'http-errors'
import app from './app'
import { AppDataSource } from './data-source'

AppDataSource.initialize()
    .then(() => {
        app.listen(3000, () => console.log('listen on 3000'))
    })
    .catch((error) => {
        console.log('data source init failed: ', error)
    })


