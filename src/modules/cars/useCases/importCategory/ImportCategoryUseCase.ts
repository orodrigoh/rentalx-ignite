/* eslint-disable no-restricted-syntax */
import fs from "fs";
import { parse } from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    const categories: IImportCategory[] = [];

    const stream = fs.createReadStream(file.path);
    const parseFile = parse();

    stream.pipe(parseFile);

    for await (const chunk of parseFile) {
      const [name, description] = chunk;

      categories.push({ name, description });
    }

    fs.promises.unlink(file.path);

    return categories;
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;
      const existsCategory = this.categoriesRepository.findByName(name);

      if (!existsCategory) {
        this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}
export { ImportCategoryUseCase };
