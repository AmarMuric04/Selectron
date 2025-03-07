import bcrypt from 'bcryptjs'
import User from '../../database/models/user'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res, next) => {
  try {
    let { password, email, username } = req.body

    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)

    const newUser = new User({
      password,
      email,
      username
    })

    jwt.sign(
      {
        _id: newUser._id,
        email: newUser.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    await newUser.save()

    res.status(200).json({ message: 'Successfully signed up!', data: newUser })
  } catch (err) {
    next(err)
  }
}
