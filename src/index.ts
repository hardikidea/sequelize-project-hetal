// src/index.ts
import 'reflect-metadata'
import { ServerApplication } from './server'

const PORT = process.env.PORT || 3000
const application = new ServerApplication().expressApp

application.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
