import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { CarsService } from "./cars.service";

@Controller("cars") // ruta
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get("get-all") // ruta
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(":id") // ruta
  getCarById(@Param("id", ParseIntPipe) id: number) {
    console.log({ id: +id });

    // throw new Error('Aiudaaa!')
    return {
      car: this.carsService.findOneById(id),
      //   car: this.carsService.findOneById(Number(id)),
    };
  }

  @Post()
  createCar(@Body() body: any) {
    return body;
  }

  @Patch(":id")
  updateCar(@Param("id", ParseIntPipe) id: number, @Body() body: any) {
    return body;
  }

  @Delete(":id")
  deleteCar(@Param("id", ParseIntPipe) id: number) {
    return {
      msg: "Deleted",
      id: id,
    };
  }
}
