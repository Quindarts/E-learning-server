const API_VERSION = '/api/v1'
const ROUTE = {
    AUTH: `${API_VERSION}/auth`,
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    CHANGE_PASSWORD: '/change',
    FORGOT_PASSWORD: '/forgot-password',
    GENERATE_ACCESSTOKEN: '/accessToken-generate',

    INDEX: '/',
    BY_ID: '/:id',
    COURSE: `${API_VERSION}/courses`,
    LESSONS: '/lessons',
    REVIEW: '/reviews',
}
export default ROUTE