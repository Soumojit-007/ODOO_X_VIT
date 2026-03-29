import prisma from "../config/db.js";

export class BaseRepository {
  constructor(model) {
    this.model = prisma[model];
  }

  findById(id) {
    return this.model.findUnique({ where: { id } });
  }

  findAll(where = {}) {
    return this.model.findMany({ where });
  }

  create(data) {
    return this.model.create({ data });
  }

  update(id, data) {
    return this.model.update({
      where: { id },
      data,
    });
  }

  delete(id) {
    return this.model.delete({
      where: { id },
    });
  }
}