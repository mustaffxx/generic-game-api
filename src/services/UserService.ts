
class UserService {
    async create(username: string, role: string) {
        return { username, role }
    }
}

export default new UserService()