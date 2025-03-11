import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { accesInviteLinkRoute } from './routes/access-invite-link.routes'
import { getRankingRoute } from './routes/get-ranking.routes'
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks.routes'
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites-count.routes'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position.routes'
import { subscribeToEventRoute } from './routes/subscribe-to-event.routes'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: env.BASEURL_WEB_ORIGIN,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'DevStage-api',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(subscribeToEventRoute)
app.register(accesInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInvitesCountRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server is running!')
})
