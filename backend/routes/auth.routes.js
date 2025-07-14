import express from 'express';
import { signUp, signIn, signOut, sendOtp, verifyOtp, resetPassword } from '../controllers/auth.controllers.js';

const authRouter =express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.post('/signout', signOut);
authRouter.post('/sendOtp', sendOtp);
authRouter.post('/verifyOtp', verifyOtp);
authRouter.post('/resetPassword', resetPassword);
export default authRouter;
