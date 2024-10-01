import { Request, Response, Router } from "express";
import ConfirmMeasurement from "../modules/consumption/useCases/ConfirmMeasurement/index.ts";
import GetMeasurement from "../modules/consumption/useCases/GetMeasurement/index.ts";
import GetUserMeasurementList from "../modules/consumption/useCases/GetUserMeasurementList/index.ts";

const routes = Router();

routes.post("/upload", async (request: Request, response: Response) => {
  const { getMeasurementController } = await GetMeasurement();

  return getMeasurementController.handle(request, response);
})

routes.patch("/confirm", async (request: Request, response: Response) => {
  const { confirmMeasurementController } = await ConfirmMeasurement();

  return confirmMeasurementController.handle(request, response);
})

routes.get("/:customer_id/list/", async (request: Request, response: Response) => {
  const { getUserMeasurementListController } = await GetUserMeasurementList();

  return getUserMeasurementListController.handle(request, response);
})

export default routes;