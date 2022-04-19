import { Router } from "express";
import { specificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (request, response) => {
  return createSpecificationController.handle(request, response);
});

specificationsRoutes.get("/", (request, response) => {
  const specifications = specificationsRepository.list();

  return response.status(200).send(specifications);
});

export default specificationsRoutes;
