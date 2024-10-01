import { Request, Response, Router } from "express";
import ConfirmMeasurement from "../modules/consumption/useCases/ConfirmMeasurement/index.ts";
import GetMeasurement from "../modules/consumption/useCases/GetMeasurement/index.ts";
import GetUserMeasurementList from "../modules/consumption/useCases/GetUserMeasurementList/index.ts";

const routes = Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a measurement
 *     parameters:
 *       - in: body
 *         name: measurement
 *         required: true
 *         description: The measurement to upload
 *         schema:
 *           type: object
 *           required:
 *             - image
 *             - measure_datetime
 *             - measure_type
 *           properties:
 *             image:
 *               type: base64
 *               description: The base64 encoded image of the measurement
 *             customer_code:
 *               type: string
 *               description: The customer's unique ID, if you don`t send one, it will generate a new one on the response
 *             measure_datetime:
 *               type: Date
 *               description: The date and time of the measurement
 *             measure_type:
 *               type: MeasurementType
 *               description: The type of measurement (WATER || GAS)
 *     responses:
 *       200:
 *         description: Measurement uploaded successfully
 *       400:
 *         description: Invalid data
 *       409:
 *         description: Measurement already exists
 */
routes.post("/upload", async (request: Request, response: Response) => {
  const { getMeasurementController } = await GetMeasurement();

  return getMeasurementController.handle(request, response);
})

/**
 * @swagger
 * /confirm:
 *   patch:
 *     summary: Confirm a measurement
 *     parameters:
 *       - in: body
 *         name: measurement
 *         required: true
 *         description: The measurement to confirm
 *         schema:
 *           type: object
 *           required:
 *             - measure_uuid
 *             - confirmed_value
 *           properties:
 *             measure_uuid:
 *               type: string
 *               description: The measurement's unique ID
 *             confirmed_value:
 *               type: number
 *               description: The confirmed value of the measurement
 *     responses:
 *       200:
 *         description: Measurement confirmed
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Measurement not found
 */
routes.patch("/confirm", async (request: Request, response: Response) => {
  const { confirmMeasurementController } = await ConfirmMeasurement();

  return confirmMeasurementController.handle(request, response);
})

/**
 * @swagger
 * /{customer_id}/list:
 *   get:
 *     summary: Get a list of measurements for a customer
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         description: The customer's unique ID
 *         schema:
 *           type: string
 *       - in: query
 *         name: measure_type
 *         required: false
 *         description: The type of measurement to filter by, if not informed, all measurements will be returned
 *         schema:
 *           type: string
 *           enum:
 *             - WATER
 *             - GAS
 *     responses:
 *       200:
 *         description: A list of measurements
 *       400:
 *         description: Invalid parameters
 *       404:
 *         description: No measurements found
 */
routes.get("/:customer_id/list/", async (request: Request, response: Response) => {
  const { getUserMeasurementListController } = await GetUserMeasurementList();

  return getUserMeasurementListController.handle(request, response);
})

export default routes;