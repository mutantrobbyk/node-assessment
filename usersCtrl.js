let userData = require('./userData.json')

module.exports = {
    getAllUsers: (req, res) => {
        if (req.query.age) {
           const newAge = userData.filter(val => val.age <= parseInt(req.query.age))
           return res.status(200).send(newAge)
        } else if (req.query.email) {
            const newEmail = userData.filter(val => val.email === req.query.email)
            return res.status(200).send(newEmail)
        } else if (req.query.favorites) {
                const favorite = userData.filter((val, i) => val.favorites[i] === req.query.favorites)
                return res.status(200).send(favorite)
        }
        res.status(200).send(userData)
    },
    getUserById: (req, res) => {
        const userId = userData.find(val => val.id === parseInt(req.params.id))
        if (!userId) {
            return res.status(404).send('user not found')
        } 
        res.status(200).send(userId)
    },
    getUserAdmin: (req, res) => {
        const isAdmin = userData.filter(val => val.type === 'admin')
        res.status(200).send(isAdmin)
    },
    nonAdmin: (req, res) => {
        const noAdmin = userData.filter(val => val.type !== 'admin')
        res.status(200).send(noAdmin)
    },
    userByType: (req, res) => {
        if (req.params.type) {
            const byType = userData.filter(val => val.type === req.params.type )
            res.status(200).send(byType)
        }
    },
    updateUser: (req, res) => {
        const {first_name, last_name, email, gender, language, age, city, state, type, favorites} = req.body
        const updateID = req.params.id
        const userIndex = userData.findIndex(val => val.id == updateID)
        let newId = userData[userIndex]

        userData[userIndex] = {
            id: newId.id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            gender: gender,
            language: language,
            age: age,
            city: city,
            state: state,
            type: type,
            favorites: favorites
        }
        res.status(200).send(userData)
    },
    addUser: (req, res) => {
        const newId = Math.max.apply(Math, userData.map(el => el.id))
        const {first_name, last_name, email, gender, language, age, city, state, type, favorites} = req.body
        userData.push({
            id: newId + 1,
            first_name: first_name,
            last_name: last_name,
            email: email,
            gender: gender,
            language: language,
            age: age,
            city: city,
            state: state,
            type: type,
            favorites: favorites
        })
        res.status(200).send(userData)
    },
    deleteUser: (req, res) => {
        const index = userData.findIndex(user => (user.id === +req.params.id))
        userData.splice(index, 1)
        res.status(200).send(userData)
    }
}