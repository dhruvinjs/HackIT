import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { asyncHandler } from '../utils/Asynchandler';



passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
   asyncHandler( async (accessToken, refreshToken, profile, done) => {
        let user = await UserModel.findOne({ googleId: profile.id });

        if (!user) {
          user =UserModel.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
          });
          await user.save();
        }

        // Generate JWT Token
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '2h' }
        );

        return done(null, { user, token });
      
    }
  )
));

export default passport;
