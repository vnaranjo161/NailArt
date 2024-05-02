import express from "express";
const router = express.Router();
import chagePasswordController from '../controllers/changePasswordController'


router.put('/', chagePasswordController);


export default router;
