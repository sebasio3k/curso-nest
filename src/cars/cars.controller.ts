import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CreateCarDto } from "./dtos/create-car.dto";
import { UpdateCarDto } from "./dtos/update-car-dto";

@Controller("cars") // ruta
// @UsePipes(ValidationPipe)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get("get-all") // ruta
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(":id") // ruta
  getCarById(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    console.log({ id: id });

    // throw new Error('Aiudaaa!')
    return {
      car: this.carsService.findOneById(id),
      //   car: this.carsService.findOneById(Number(id)),
    };
  }

  @Post()
  //   @UsePipes(ValidationPipe)
  createCar(@Body() createCarDto: CreateCarDto) {
    const newCar = this.carsService.create(createCarDto);
    return newCar;
  }

  @Patch(":id")
  updateCar(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto
  ) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(":id")
  deleteCar(@Param("id", ParseUUIDPipe) id: string) {
    return this.carsService.delete(id);
  }
}
