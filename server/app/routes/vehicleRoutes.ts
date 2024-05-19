import express, {Router} from 'express'
import { addVehicle, updateVehicle, deleteVehicle, getVehicles } from '../controllers/vehicleControllers'

const router: Router = express.Router();

router.get('/', getVehicles);
router.post('/:scenarioName', addVehicle);
router.put('/:id',updateVehicle);
router.delete('/:id', deleteVehicle);

export default router;