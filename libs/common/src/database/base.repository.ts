import { Logger, NotFoundException } from '@nestjs/common';
import {
  Connection,
  FilterQuery,
  Model,
  SaveOptions,
  Types,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';
import { BaseSchema } from './base.schema';

export abstract class BaseRepository<TDocument extends BaseSchema> {
  protected abstract readonly logger: Logger;

  protected constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return await createdDocument.save(options);
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    const documents = await this.model.find(filterQuery, {}).exec();
    return documents.map((doc) => doc.toObject() as TDocument);
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document as TDocument;
  }

  async findOneOrNull(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    return document as TDocument;
  }

  async updateOne(
    id: Types.ObjectId,
    update: UpdateQuery<TDocument>,
  ): Promise<UpdateWriteOpResult> {
    const updateResult = await this.model.updateOne({ _id: id }, update, {
      lean: true,
    });

    return updateResult;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document as TDocument;
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>,
  ) {
    const documentResult = await this.model.findOneAndUpdate(
      filterQuery,
      document,
      {
        lean: true,
        upsert: true,
        new: true,
      },
    );
    return documentResult as TDocument;
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
