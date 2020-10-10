import { ItemModel } from '../models/item.model'

export abstract class ItemsController {
  public static async getAllItems(req: any, res: any, next: any) {
    try {
      const data = await ItemModel.find()
      res.status(200).json({ data })
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: 'Error' })
    }
    next()
  }
  public static async getItemByName(req: any, res: any, next: any) {
    try {
      const data = await ItemModel.find({ name: req.params.name })
      res.status(200).json({ data })
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: 'Error' })
    }
    next()
  }
  public static async addNewItem(req: any, res: any, next: any) {
    try {
      const newItem = await (await ItemModel.create(req.body)).save()
      res.status(201).json({ newItem })
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: 'Error' })
    }
    next()
  }
  public static async deleteItemByName(req: any, res: any, next: any) {
    try {
      const deleteOne = await ItemModel.deleteOne({ name: req.params.name })
      res.status(200).json({ deleteOne })
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: 'Error' })
    }
    next()
  }
  public static async updateItemByName(req: any, res: any, next: any) {
    try {
      const updateOne = await ItemModel.updateOne(
        { name: req.params.name },
        req.body
      )
      res.status(201).json({ updateOne })
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: 'Error' })
    }
  }
}
