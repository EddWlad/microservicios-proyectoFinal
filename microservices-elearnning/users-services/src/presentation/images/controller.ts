import { Response, Request } from "express";
import path from "path";
import fs from "fs";
import { FileService } from "../services/file.service";
import { CustomError } from "../../domain";

export class FilesController {
  //DI
  constructor(private readonly fileService: FileService) {}
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  };
  getFile = (req: Request, res: Response) => {
    const { type = "", file = "" } = req.params;
    this.fileService
      .getFile(type, file)
      .then((imagePath) => res.sendFile(imagePath))
      .catch((error) => this.handleError(error, res));
  };
}
