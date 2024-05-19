import express,{ Router } from "express";
import { addSenario, deleteScenario, updateSenario, getSenarios ,addVehicleToScenario,deleteAllScenarios} from "../controllers/scenarioControllers";

const router : Router = express.Router();

router.get('/', getSenarios);
router.post('/', addSenario);
router.put('/:id', updateSenario);
router.post('/:scenarioName/vehicles', addVehicleToScenario);
router.delete('/',deleteAllScenarios);
router.delete('/:id', deleteScenario);

export default router;

