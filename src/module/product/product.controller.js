import { Router } from "express";
import {
  addCategoryColumn,
  addSupplier,
  changeContactNumber,
  createProductTable,
  createSalesTable,
  createSupplierTable,
  deleteCategoryColumn,
  deletEggProduct,
  insertProduct,
  notNullPName,
  saleProduct,
  updateBreadPrice,
  getProductsTotalQuantity,
  getMaxStockProduct,
  getSuppliersByNameF,
  getProductsLeftJoinSales,
  getProductsWithNoSales,
  getProductsRightJoinSales,
  grantStoreManagerPrivileges,
  revokeStoreManagerUpdate,
  grantStoreManagerDelete,
} from "./product.service.js";

const router = Router();

router.post("/create-product-table", createProductTable);
router.post("/create-supplier-table", createSupplierTable);
router.post("/create-sales-table", createSalesTable);
router.post("/add-category-column", addCategoryColumn);
router.post("/delete-category-column", deleteCategoryColumn);
router.post("/change-contact-number", changeContactNumber);
router.post("/not-null-pname", notNullPName);
router.post("/add-supplier", addSupplier);
router.post("/insert-product", insertProduct);
router.post("/sale-product", saleProduct);
router.post("/update-bread_price", updateBreadPrice);
router.post("/delete-Egg_price", deletEggProduct);
router.get("/products-total-quantity", getProductsTotalQuantity);
router.get("/max-stock-product", getMaxStockProduct);
router.get("/suppliers-by-name-f", getSuppliersByNameF);
router.get("/products-left-join-sales", getProductsLeftJoinSales);
router.get("/products-with-no-sales", getProductsWithNoSales);
router.get("/products-right-join-sales", getProductsRightJoinSales);
router.post("/grant-store-manager-privileges", grantStoreManagerPrivileges);
router.post("/revoke-store-manager-update", revokeStoreManagerUpdate);
router.post("/grant-store-manager-delete", grantStoreManagerDelete);

export default router;
