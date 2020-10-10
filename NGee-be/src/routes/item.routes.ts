import express from 'express'
import { ItemsController } from '../controllers/item.controller'

const router = express.Router()

router
  .route('/')
  .get(ItemsController.getAllItems)
  .post(ItemsController.addNewItem)

router
  .route('/:name')
  .get(ItemsController.getItemByName)
  .delete(ItemsController.deleteItemByName)
  .patch(ItemsController.updateItemByName)

export default router
