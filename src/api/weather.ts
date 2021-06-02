import { Router } from 'express';
import {
  currentWeatherByCity,
  currentWeatherByCoords,
} from '../controllers/currentWeather';

const router = Router();

router.get('/current/city/:city?', currentWeatherByCity);
router.get('/current/coords/:lat?:lon?', currentWeatherByCoords);

export default router;
