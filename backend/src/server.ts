import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import coursesRoutes from './routes/courses.routes'
import enquiriesRoutes from './routes/enquiries.routes'
import franchiseRoutes from './routes/franchise.routes'
import usersRoutes from './routes/users.routes'
import cmsRoutes from './routes/cms.routes'
import testimonialsRoutes from './routes/testimonials.routes'
import mediaRoutes from './routes/media.routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Handle multiple origins
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000')
            .split(',')
            .map(o => o.trim().replace(/\/$/, ''));

        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.error(`CORS Blocked: Origin '${origin}' not found in`, allowedOrigins);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}))
app.use(express.json({ limit: '10mb' })) // Increase payload limit for Base64

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/auth', authRoutes)
app.use('/api/courses', coursesRoutes)
app.use('/api/enquiries', enquiriesRoutes)
app.use('/api/franchise', franchiseRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/cms', cmsRoutes)
app.use('/api/testimonials', testimonialsRoutes)
app.use('/api/media', mediaRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export default app
